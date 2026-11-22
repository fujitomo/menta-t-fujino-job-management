import { NextResponse } from 'next/server';

import { requireAuth } from '@/server/auth';

export const PUBLIC_USER_ID = null;

type AuthPayload = {
  sub?: string;
};

type AuthResult =
  | { ok: true; userId: number }
  | { ok: false; response: NextResponse };

const buildUnauthorizedResponse = (message: string) =>
  NextResponse.json(
    { message },
    {
      status: 401,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );

export const getPublicScopeFilter = () => ({ userId: PUBLIC_USER_ID });

export const applyPublicScope = <T extends { is: (...args: any[]) => any }>(
  query: T,
) => query.is('userId', PUBLIC_USER_ID);

export const applyPrivateScope = <T extends { eq: (...args: any[]) => any }>(
  query: T,
  userId: number,
) => query.eq('userId', userId);

export const applyRelationScope = <T extends { eq: (...args: any[]) => any }>(
  query: T,
  userId: number | null,
) => query.eq('jobCategoryRelations.userId', userId);

export const getPrivateScopeUserIdFromRequest = async (
  request: Request,
): Promise<AuthResult> => {
  const auth = await requireAuth<AuthPayload>(request);

  if (!auth.success) {
    return { ok: false, response: auth.response };
  }

  const rawSub = auth.payload?.sub ?? '';
  const userId = Number.parseInt(String(rawSub), 10);

  if (!Number.isInteger(userId) || userId <= 0) {
    return {
      ok: false,
      response: buildUnauthorizedResponse('invalid access token'),
    };
  }

  return { ok: true, userId };
};
