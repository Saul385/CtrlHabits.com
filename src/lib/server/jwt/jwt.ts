import { sign, verify } from 'jsonwebtoken';

/**
 * makeJWT creates a JWT string from a user ID.
 *
 * By default, the JWT expires in 1 week.
 *
 * See:
 * https://github.com/auth0/node-jsonwebtoken#readme
 */
export function makeJWT(id: string, secret: string): string {
	return sign({ id }, secret, { expiresIn: '7d' });
}

/**
 * verifyJWT verifies a JWT string and returns the user ID. If the JWT is invalid, it returns null.
 */
export function verifyJWT(token: string, secret: string): string | null {
	try {
		const decoded = verify(token, secret);
		const id = decoded.id;
		if (typeof id !== 'string') {
			return null;
		}

		return id;
	} catch (error) {
		console.error(error);
		return null;
	}
}
