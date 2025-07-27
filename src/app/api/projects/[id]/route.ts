import { connectDb } from '@/lib/mongoDB'
import Project from '@/models/project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb();
        const project = await Project.findById(params.id);

        if (!project)
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: project });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()
        const body = await req.json()
        const updated = await Project.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        })
        if (!updated) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
        return NextResponse.json({ success: true, updated })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb();
        const deleted = await Project.findByIdAndDelete(params.id);
        if (!deleted) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

