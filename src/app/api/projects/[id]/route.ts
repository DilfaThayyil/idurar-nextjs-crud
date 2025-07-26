import { connectDb } from '@/lib/mongoDB'
import Project from '@/models/project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const project = await Project.findById(params.id)
    if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const body = await req.json()
    const updated = await Project.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    })
    if (!updated) return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    await connectDb();
    const id = context.params.id;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted)
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });

    return new NextResponse(null, { status: 204 });
}
