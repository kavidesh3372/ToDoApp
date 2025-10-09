import Todo from '../models/Todo.js';

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ startDate: 1 });
    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new todo
const createTodo = async (req, res) => {
  try {
    const { task, description, startDate, endDate } = req.body;
    
    // Validation
    if (!task || task.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task name is required'
      });
    }
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Both start date and end date are required'
      });
    }
    
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }
    
    const todo = new Todo({
      task: task.trim(),
      description: description ? description.trim() : '',
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
    
    const savedTodo = await todo.save();
    res.status(201).json({
      success: true,
      data: savedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { task, description, startDate, endDate } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single todo
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};