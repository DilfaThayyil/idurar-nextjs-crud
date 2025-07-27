import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    projectId: string;
    name: string;
    description: string;
    status: 'pending'| 'active'| 'in_progress'| 'on_hold'| 'completed'| 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
    {
        projectId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ['pending', 'active', 'in_progress', 'on_hold', 'completed', 'cancelled'], default: 'pending' },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
