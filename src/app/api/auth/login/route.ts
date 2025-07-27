import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoDB';
import User from '@/models/user';
import { createAccessToken, createRefreshToken } from '@/lib/jwtUtils';
import { setAuthCookies } from '@/lib/setCookies';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await connectDb();
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const userPayload = { id: user._id.toString(), email: user.email };
        const accessToken = createAccessToken(userPayload);
        const refreshToken = createRefreshToken(userPayload);

        const res = NextResponse.json({ message: 'Login successful!', user });
        setAuthCookies(res, accessToken, refreshToken);
        return res;
    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
