import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTask, getTask, updateTask } from "../service/TaskService";
import Calender from "./CalenderComponent";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const AddTaskData = () => {
  const { id } = useParams();
  const [taskName, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(""); 
  const [endTime, setEndTime] = useState("");
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  const normalFormatDate = (date) => {
    const options = {year:'numeric',month:'long',day:'numeric'};
    return new Date(date).toLocaleDateString('en-GB', options);
};
  useEffect(()=>{
    if(id){
      getTask(id).then((response)=>{
        setTask(response.data.taskName);
        setDescription(response.data.description);
        setStartTime(normalFormatDate(response.data.startTime));
        setEndTime(normalFormatDate(response.data.endTime));
      }).catch(error=>{
        console.error(error);
      })
    }
  },[id])
  const taskData = {
    taskName,
    startTime: formatDate(startTime), 
    endTime: formatDate(endTime),     
    description,
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!startTime || !endTime) {
        alert("Please select both start and end dates.");
        return;
    }
    try {
      if(id){
        const response = await updateTask(id,taskData);
        if (response.status === 200) {
          alert("Task updated successfully!");
          setTask("");
          setStartTime(""); 
          setEndTime("");
          setDescription("");
        } else {
          alert("Failed to update task.");
        }
      }else{
        const response = await addTask(taskData);
        if (response.status === 200) {
          alert("Task added successfully!");
          setTask("");
          setStartTime(""); 
          setEndTime("");
          setDescription("");
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
        alert("No response received from the server.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div variants={fadeIn("","spring",2,1)}  initial="hidden" animate="show" className="ml-10">
        <button type="submit" className="border-2 rounded-md bg-transparent py-5 px-10 text-white">
          Submit
        </button>
      </motion.div>
      <motion.div variants={fadeIn("up","spring",3,1)}  initial="hidden" animate="show" className="ml-5">
        <div className="flex flex-row mt-5">
          <input type="text" value={taskName} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" className="border-2 hover:border-white-3 focus:outline-none focus:border-white-500 rounded-lg bg-transparent text-white w-1/3 m-5 p-5"/>
          <div className="text-white">
            <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}  className="border-2 readonly rounded-md hover:border-white-3 focus:outline-none focus:border-white-500 bg-transparent p-5 w-80 m-5" placeholder="Start Date"/>
            <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}  className="border-2 rounded-md hover:border-white-3 focus:outline-none focus:border-white-500 bg-transparent p-5 w-80 m-5" placeholder="End Date"/>
          </div>
        </div>
        <div className="flex flex-row gap-10 mt-10 mb-10">
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description..." className="border-2 focus:outline-none focus:border-white-500 rounded-lg bg-transparent text-white w-1/3 ml-5 p-5" rows="7" style={{ resize: "none" }}         />
          <Calender selectedDate={startTime} setSelectedDate={setStartTime} />
          <Calender selectedDate={endTime} setSelectedDate={setEndTime} />
        </div>
      </motion.div>
    </form>
  );
};

export default AddTaskData;
