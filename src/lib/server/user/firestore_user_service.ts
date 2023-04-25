import type { Firestore, CollectionReference, DocumentData } from '@google-cloud/firestore';
import type {
	AddUserRequest,
	AddUserResponse,
	GetUserByGitHubIDRequest,
	GetUserByGitHubIDResponse,
	GetUserByGoogleIDRequest,
	GetUserByGoogleIDResponse,
	GetUserByIDRequest,
	GetUserByIDResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
	UserServiceInterface
} from './user_service_interface';
import { makeNewUser } from './new_user';

export class FirestoreUserService implements UserServiceInterface {
	public readonly firestoreCollection: CollectionReference<DocumentData>;

	constructor(
		public readonly firestoreClient: Firestore,
		public readonly firestoreCollectionName: string
	) {
		this.firestoreCollection = firestoreClient.collection(firestoreCollectionName);
	}

	// TODO: Look into best practices for creating a new user versus updating an existing user.
	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const timestamp = new Date().toISOString();
		const ref = await this.firestoreCollection.add({});
		const newUser = makeNewUser(r, { id: ref.id, timestamp, tag: null });

		try {
			// Check if tag is already in use. Tag must be unique.
			const query = this.firestoreCollection.where('tag', '==', newUser.tag);
			const snapshot = await query.get();
			if (snapshot.size > 0) {
				throw new Error(`Tag ${newUser.tag} is already in use.`);
			}

			// Add user to Firestore.
			await ref.set(newUser);
			return newUser;
		} catch {
			// If there is an error, delete the user from Firestore.
			await ref.delete();
			throw new Error('Failed to add user.');
		}
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const doc = await this.firestoreCollection.doc(r.id).get();
		if (!doc.exists) {
			throw new Error(`User with id ${r.id} not found.`);
		}

		const timestamp = new Date().toISOString();
		const user = doc.data() as User;
		const updatedUser = { ...user, ...r, timestamp };

		// Check if tag is already in use. Tag must be unique.
		const query = this.firestoreCollection.where('tag', '==', updatedUser.tag);
		const snapshot = await query.get();
		if (snapshot.size > 0) {
			throw new Error(`Tag ${updatedUser.tag} is already in use.`);
		}

		await doc.ref.set(updatedUser);
		return updatedUser;
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		const doc = await this.firestoreCollection.doc(r.id).get();
		if (!doc.exists) {
			throw new Error(`User with id ${r.id} not found.`);
		}

		const user = doc.data() as User;
		console.log({ user }); // TODO: Remove once tested!
		return user;
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		const query = this.firestoreCollection.where('github_id', '==', r.github_id);
		const snapshot = await query.get();
		if (snapshot.size === 0) {
			throw new Error(`User with GitHub ID ${r.github_id} not found.`);
		}

		return snapshot.docs[0].data() as User;
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		const query = this.firestoreCollection.where('google_id', '==', r.google_id);
		const snapshot = await query.get();
		if (snapshot.size === 0) {
			throw new Error(`User with Google ID ${r.google_id} not found.`);
		}

		return snapshot.docs[0].data() as User;
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		const query = this.firestoreCollection.limit(r.limit).offset(r.offset);
		const snapshot = await query.get();
		const users = snapshot.docs.map((doc) => doc.data() as User);
		const total = await this.firestoreCollection.get().then(({ size }) => size);
		return { users, total };
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		const ref = this.firestoreCollection.doc(r.id);
		await ref.delete();
	}
}
