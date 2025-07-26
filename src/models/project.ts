import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    projectId: string;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
    {
        projectId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
