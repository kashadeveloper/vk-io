import { Stream } from 'stream';
import { UploadNormalizedSourceOptions, UploadAllowedSource } from './types';

/**
 * Check object is stream
 */
export const isStream = (source: NodeJS.ReadableStream | Buffer | string): boolean => (
	typeof source === 'object' && source instanceof Stream
);

/**
 * Copies object params to new object
 */
export const pickExistingProperties = <
	T,
	K extends keyof T
>(params: T, properties: K[]): Pick<T, K> => {
	const copies: Pick<T, K> = {} as Pick<T, K>;

	for (const property of properties) {
		if (params[property] !== undefined) {
			copies[property] = params[property];
		}
	}

	return copies;
};

export const normalizeSource = (rawSource: UploadAllowedSource): UploadNormalizedSourceOptions => {
	if ('value' in rawSource) {
		return {
			values: [rawSource]
		};
	}

	return {
		...rawSource,

		values: Array.isArray(rawSource.values)
			? rawSource.values
			: [rawSource.values]
	};
};
