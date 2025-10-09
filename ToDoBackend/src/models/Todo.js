import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxlength: [100, 'Task name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Todo', todoSchema);