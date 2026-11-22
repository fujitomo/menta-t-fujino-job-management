import { ApiClientUtils } from './client';
import { ApiErrorUtils } from './error';
import { ApiReactQueryUtils } from './reactQuery';

export { FetchError } from './error';

export const ApiUtils = {
  ...ApiClientUtils,
  ...ApiErrorUtils,
  ...ApiReactQueryUtils,
};
