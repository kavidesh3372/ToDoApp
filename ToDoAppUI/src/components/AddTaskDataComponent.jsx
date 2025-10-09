import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, getTask, updateTask } from "../service/TaskService";
import Calender from "./CalenderComponent";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const AddTaskData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");

  // Store dates as Date objects internally, but display formatted strings
  const [startDateObj, setStartDateObj] = useState(null);
  const [endDateObj, setEndDateObj] = useState(null);

  // Format date for display (readable format)
  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  // Format date for backend (ISO string)
  const formatDateForBackend = (date) => {
    if (!date) return "";
    return new Date(date).toISOString();
  };

  useEffect(() => {
    if (id) {
      getTask(id).then((response) => {
        const todoData = response.data.data || response.data;
        setTask(todoData.task);
        setDescription(todoData.description || "");
        
        // Store as Date objects and formatted strings
        const start = new Date(todoData.startDate);
        const end = new Date(todoData.endDate);
        
        setStartDateObj(start);
        setEndDateObj(end);
        setStartDate(formatDateForDisplay(start));
        setEndDate(formatDateForDisplay(end));
      }).catch(error => {
        console.error(error);
        alert("Failed to fetch task");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task || task.trim() === "") {
      alert("Please enter a task name.");
      return;
    }

    if (!startDateObj || !endDateObj) {
      alert("Please select both start and end dates.");
      return;
    }

    if (endDateObj <= startDateObj) {
      alert("End date must be after start date.");
      return;
    }

    // Prepare data for backend using Date objects
    const taskData = {
      task: task.trim(),
      description: description.trim(),
      startDate: formatDateForBackend(startDateObj),
      endDate: formatDateForBackend(endDateObj),
    };


    try {
      if (id) {
        const response = await updateTask(id, taskData);
        console.log(response)
        if (response.data.success) {
          alert("Task updated successfully!");
          navigate("/");
        } else {
          alert("Failed to update task.");
        }
      } else {
        const response = await addTask(taskData);
        if (response.data.success) {
          alert("Task added successfully!");
          setTask("");
          setStartDate("");
          setEndDate("");
          setDescription("");
          setStartDateObj(null);
          setEndDateObj(null);
          navigate("/");
        } else {
          alert("Failed to add task.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong"}`);
      } else if (error.request) {
        alert("No response received from the server. Check if backend is running.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Handle calendar date selection
  const handleStartDateSelect = (date) => {
    const dateObj = new Date(date);
    setStartDateObj(dateObj);
    setStartDate(formatDateForDisplay(dateObj));
  };

  const handleEndDateSelect = (date) => {
    const dateObj = new Date(date);
    setEndDateObj(dateObj);
    setEndDate(formatDateForDisplay(dateObj));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... rest of your JSX remains the same ... */}
      <motion.div 
        variants={fadeIn("", "spring", 2, 1)}  
        initial="hidden" 
        animate="show" 
        className="ml-10"
      >
        <button 
          type="submit" 
          className="border-2 rounded-md bg-transparent py-5 px-10 text-white hover:bg-white hover:text-black transition-colors"
        >
          {id ? "Update Task" : "Add Task"}
        </button>
      </motion.div>

      <motion.div 
        variants={fadeIn("up", "spring", 3, 1)}  
        initial="hidden" 
        animate="show" 
        className="ml-5"
      >
        <div className="flex flex-row mt-5">
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Enter a task" 
            className="border-2 hover:border-white-3 focus:outline-none focus:border-white-500 rounded-lg bg-transparent text-white w-1/3 m-5 p-5"
            required
          />
          <div className="text-white">
            <input 
              type="text" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}  
              className="border-2 readonly rounded-md hover:border-white-3 focus:outline-none focus:border-white-500 bg-transparent p-5 w-80 m-5" 
              placeholder="Start Date"
              readOnly
            />
            <input 
              type="text" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}  
              className="border-2 rounded-md hover:border-white-3 focus:outline-none focus:border-white-500 bg-transparent p-5 w-80 m-5" 
              placeholder="End Date"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-row gap-10 mt-10 mb-10">
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description..." 
            className="border-2 focus:outline-none focus:border-white-500 rounded-lg bg-transparent text-white w-1/3 ml-5 p-5" 
            rows="7" 
            style={{ resize: "none" }}
          />
          <div>
            <h3 className="text-white mb-2">Select Start Date</h3>
            <Calender 
              selectedDate={startDateObj} 
              setSelectedDate={handleStartDateSelect} 
            />
          </div>
          <div>
            <h3 className="text-white mb-2">Select End Date</h3>
            <Calender 
              selectedDate={endDateObj} 
              setSelectedDate={handleEndDateSelect} 
            />
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default AddTaskData;