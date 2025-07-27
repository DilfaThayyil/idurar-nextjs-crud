import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const createAccessToken = (user: { id: string }) =>
    jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: '15m' });

export const createRefreshToken = (user: { id: string }) =>
    jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
