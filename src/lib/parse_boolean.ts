/**
 * File contents copied from:
 * https://acmcsuf.com/code/blob/f82ff90ef670f66653250e108ce8979ece6049a7/src/lib/server/parse-bool/parse-bool.ts
 */

/**
 * Non-exhaustive list of JavaScript expressions that evaluate to falsy.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy/
 */
const FALSY_PRIMITIVES = ['0', '0.0', '0x0', 'null', 'undefined', 'false', 'NaN', "''", '""', '``'];

/** RegExp pattern compiled from falsy primitives above. */
const FALSY_PATTERN = new RegExp(`^(${FALSY_PRIMITIVES.join('|')})$`, 'i');

/** parseBoolean checks the boolean representation of a given string. */
export function parseBoolean(payload?: string | null): boolean {
	const isFalsy = !payload || FALSY_PATTERN.test(payload);
	return !isFalsy;
}
