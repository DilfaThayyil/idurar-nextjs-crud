import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {

    const refreshToken = (await cookies()).get('refreshToken')?.value;
    if (!refreshToken) {
        return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
        const accessToken = jwt.sign({ id: (payload as any).id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: '15m',
        });

        const res = NextResponse.json({ accessToken });
        res.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 15 * 60,
        });

        return res;
    } catch {
        return NextResponse.json({ message: 'Invalid refresh token' }, { status: 403 });
    }
}
