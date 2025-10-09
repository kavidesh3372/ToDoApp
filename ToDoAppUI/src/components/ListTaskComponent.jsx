import { useState, useEffect } from "react";
import { deleteTask, listTask } from "../service/TaskService";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Table = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Sample data for testing
    const check = [{
        _id: "1",
        task: "Sample Task",
        description: "This is a sample task",
        startDate: "2024-01-15",
        endDate: "2024-01-20",
        completed: false
    }];

    const formatDate = (date) => {
        if (!date) return "No date";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        getAllTask();
    }, []);

    function getAllTask() {
        setLoading(true);
        listTask().then((response) => {
            // Node.js backend returns data in response.data.data
            console.log("API Response:", response.data);

            // FIXED: Use tasksData (correct variable name)
            const tasksData = response.data.data || response.data;
            console.log("Tasks data:", tasksData);

            // Ensure it's always an array
            if (Array.isArray(tasksData)) {
                setTasks(tasksData);
            } else {
                console.error("Expected array but got:", typeof tasksData);
                setTasks(check); // Fallback to sample data
            }
        }).catch(error => {
            console.error("API Error:", error);
            setTasks(check); // Fallback to sample data
        }).finally(() => {
            setLoading(false);
        });
    }

    function handleUpdate(id) {
        navigate(`/editTask/${id}`);
    }

    function handleDelete(id, e) {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(id).then((response) => {
                console.log("Task deleted successfully");
                getAllTask(); // Refresh the list
            }).catch((error) => {
                console.error("Error deleting task:", error);
                alert("Failed to delete task");
            });
        }
    }

    function handleComplete(id) {
        // Optional: Add complete functionality
        console.log("Mark task as complete:", id);
        // You can implement this by calling updateTask with completed: true
    }

    if (loading) {
        return (
            <div className="text-white p-5 mb-10 border-2 rounded-lg w-11/12 text-center">
                Loading tasks...
            </div>
        );
    }

    return (
        <div className="text-white p-5 mb-10 border-2 rounded-lg w-11/12 transition transform duration-700 hover:backdrop-blur-2xl hover:scale-105">
            {tasks.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-xl">No tasks found</p>
                    <p className="text-gray-400 mt-2">Create your first task to get started!</p>
                </div>
            ) : (
                <table className="border-separate w-full table-auto text-center">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 w-1/6 border-y-4 border-x-4 rounded-l-lg">Task</th>
                            <th className="px-4 py-2 w-1/6 border-4">Description</th>
                            <th className="px-4 py-2 w-1/6 border-4">Start Date</th>
                            <th className="px-4 py-2 w-1/6 border-4">Due Date</th>
                            <th className="px-4 py-2 w-1/6 border-4 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id || task.id} className="">
                                <td className="px-4 py-2">{task.task}</td>
                                <td className="px-4 py-2 max-w-xs truncate" title={task.description}>
                                    {task.description || "No description"}
                                </td>
                                <td className="px-4 py-2">{formatDate(task.startDate)}</td>
                                <td className="px-4 py-2">{formatDate(task.endDate)}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-row gap-x-4 place-content-center">
                                        <button
                                            onClick={() => handleUpdate(task._id || task.id)}
                                            className="p-1 transition-colors"
                                            title="Edit"
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            onClick={() => handleComplete(task._id || task.id)}
                                            className={`p-1 transition-colors ${task.completed
                                                    ? ''
                                                    : ''
                                                }`}
                                            title={task.completed ? "Completed" : "Mark Complete"}
                                        >
                                            <ImCheckmark />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(task._id, e)}
                                            className="p-1 transition-colors"
                                            title="Delete"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;