import { SignJWT, jwtVerify } from 'jose';

type JwtPayload = Record<string, unknown>;

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  return new TextEncoder().encode(secret);
};

export const signAccess = async (
  payload: JwtPayload,
  expiresIn = process.env.JWT_EXPIRES_IN || '15m',
) => {
  const secretKey = getSecretKey();

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
};

export const verifyAccess = async <T>(token: string) => {
  const secretKey = getSecretKey();
  const { payload } = await jwtVerify(token, secretKey, {
    algorithms: ['HS256'],
  });

  return payload as T;
};
