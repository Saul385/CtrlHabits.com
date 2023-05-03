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
	GetUserByTagRequest,
	GetUserByTagResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
	CTRLHabitsServiceInterface,
	AddHabitRequest,
	AddHabitResponse
} from './ctrlhabits_service_interface';
import { makeNewHabit } from './new_habit';
import { makeNewUser } from './new_user';

export class FirestoreCTRLHabitsService implements CTRLHabitsServiceInterface {
	public readonly firestoreUserCollection: CollectionReference<DocumentData>;
	public readonly firestoreHabitCollection: CollectionReference<DocumentData>;

	constructor(
		public readonly firestoreClient: Firestore,
		public readonly firestoreUserCollectionName: string,
		public readonly firestoreHabitCollectionName: string
	) {
		this.firestoreUserCollection = firestoreClient.collection(firestoreUserCollectionName);
		this.firestoreHabitCollection = firestoreClient.collection(firestoreHabitCollectionName);
	}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const timestamp = new Date().toISOString();
		const ref = await this.firestoreUserCollection.add({});
		const newUser = makeNewUser(r, { id: ref.id, timestamp, tag: null });
		await ref.set(newUser);
		return newUser;
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const doc = await this.firestoreUserCollection.doc(r.id).get();
		if (!doc.exists) {
			throw new Error(`User with id ${r.id} not found.`);
		}

		const timestamp = new Date().toISOString();
		const user = doc.data() as User;
		const updatedUser = { ...user, ...r, timestamp };

		// Check if tag is already in use. Tag must be unique.
		const query = this.firestoreUserCollection.where('tag', '==', updatedUser.tag);
		const snapshot = await query.get();
		if (snapshot.size > 0) {
			throw new Error(`Tag ${updatedUser.tag} is already in use.`);
		}

		await doc.ref.set(updatedUser);
		return updatedUser;
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		const doc = await this.firestoreUserCollection.doc(r.id).get();
		if (!doc.exists) {
			throw new Error(`User with id ${r.id} not found.`);
		}

		const user = doc.data() as User;
		console.log({ user }); // TODO: Remove once tested!
		return user;
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		const query = this.firestoreUserCollection.where('github_id', '==', r.github_id);
		const snapshot = await query.get();
		if (snapshot.size === 0) {
			throw new Error(`User with GitHub ID ${r.github_id} not found.`);
		}

		return snapshot.docs[0].data() as User;
	}

	public async getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse> {
		const query = this.firestoreUserCollection.where('tag', '==', r.tag);
		const snapshot = await query.get();
		if (snapshot.size === 0) {
			throw new Error(`User with tag ${r.tag} not found.`);
		}

		return snapshot.docs[0].data() as User;
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		const query = this.firestoreUserCollection.where('google_id', '==', r.google_id);
		const snapshot = await query.get();
		if (snapshot.size === 0) {
			throw new Error(`User with Google ID ${r.google_id} not found.`);
		}

		return snapshot.docs[0].data() as User;
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		const query = this.firestoreUserCollection.limit(r.limit).offset(r.offset);
		const snapshot = await query.get();
		const users = snapshot.docs.map((doc) => doc.data() as User);
		const total = await this.firestoreUserCollection.get().then(({ size }) => size);
		return { users, total };
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		const ref = this.firestoreUserCollection.doc(r.id);
		await ref.delete();
	}

	public async addHabit(r: AddHabitRequest): Promise<AddHabitResponse> {
		const timestamp = new Date().toISOString();
		const ref = await this.firestoreHabitCollection.add({});
		const newHabit = makeNewHabit(r, { id: ref.id, timestamp });
		await ref.set(newHabit);
		return newHabit;
	}
}
