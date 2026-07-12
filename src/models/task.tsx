
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, 
  status: { type: Number, enum: [0, 1, 2], default: 0 },
  priority: { type: Number, enum: [3, 2, 1], default: 3 },
  start_date: { type: String },
  due_date: { type: String },
  assignee: { type: Number },
  updated_at: { type: Date },
}, { timestamps: true }); 

export default mongoose.models.tasks || mongoose.model('tasks', TaskSchema);