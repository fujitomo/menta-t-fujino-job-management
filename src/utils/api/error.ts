export class FetchError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, errors: string[]) {
    super(errors[0]);

    this.status = status;
    this.errors = errors;
  }
}

export const ApiErrorUtils = {};
