
import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeamSchema = new Schema({
    id: { type: Number },
    status: { type: Number, enum: [0, 1], default: 0 },
    name: { type: String, required: true },
    email: { type: String },
    role: { type: String },
    created_at: { type: String }
})

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
