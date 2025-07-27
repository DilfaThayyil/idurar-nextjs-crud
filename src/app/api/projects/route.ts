import { connectDb } from '@/lib/mongoDB';
import Project from '@/models/project';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connectDb();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;
        const [projects, total] = await Promise.all([
            Project.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
            Project.countDocuments(),
        ]);
        return NextResponse.json({ projects, total });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await connectDb();
        const body = await req.json();
        const project = await Project.create(body);
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to create project' }, { status: 400 });
    }
}
