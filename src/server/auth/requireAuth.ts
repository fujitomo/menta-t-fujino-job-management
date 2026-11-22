import { NextResponse } from 'next/server';

import { verifyAccess } from './jwt';

type RequireAuthSuccess<T> = {
  success: true;
  payload: T;
};

type RequireAuthFailure = {
  success: false;
  response: NextResponse;
};

type RequireAuthResult<T> = RequireAuthSuccess<T> | RequireAuthFailure;

export const getBearer = (request: Request) => {
  const header = request.headers.get('authorization');

  if (!header) {
    return null;
  }

  const [scheme, token] = header.split(' ');

  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token.trim();
};

export const unauthorized = () =>
  NextResponse.json(
    { message: 'unauthorized' },
    {
      status: 401,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );

export const requireAuth = async <T>(
  request: Request,
): Promise<RequireAuthResult<T>> => {
  const token = getBearer(request);

  if (!token) {
    return {
      success: false,
      response: unauthorized(),
    };
  }

  try {
    const payload = await verifyAccess<T>(token);

    return {
      success: true,
      payload,
    };
  } catch (error) {
    console.error('failed to verify access token', error);

    return {
      success: false,
      response: unauthorized(),
    };
  }
};
