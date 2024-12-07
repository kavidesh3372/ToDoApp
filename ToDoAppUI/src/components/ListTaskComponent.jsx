import { useState,useEffect } from "react";
import { deleteTask, listTask } from "../service/TaskService";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";
import { useNavigate} from "react-router-dom";
const Table = () => {
    const [task,setTask] = useState([]);
    const navigate = useNavigate();
    const check = [{id:1,taskName:"kavi",description:"check",startTime:"24 November 2023",endTime:"24 November 2023"}];
    const formatDate = (date) => {
        const options = {year:'numeric',month:'long',day:'numeric'};
        return new Date(date).toLocaleDateString('en-GB', options);
    };
    useEffect(()=>{
        getAllTask();
    },[])
    function getAllTask(){
        listTask().then((response) => {
            setTask(response.data);
        }).catch(error =>{console.error(error);setTask(check)})
    }
    function handleUpdate (id){
        navigate(`/editTask/${id}`);
    }
    function handleDelete(id){
        console.log(id);
        deleteTask(id).then((response)=>{
            console.log("Task is removed");
            getAllTask();
        }).catch((error)=>{
            console.error(error);
        })
    }
    return (
        <div className="text-white p-5 mb-10 border-2 rounded-lg w-11/12 transition transform duration-700 hover:backdrop-blur-2xl hover:scale-105">
            <table className="border-separate w-full table-auto text-center ">
                <thead>
                    <tr className="">
                        <th className="px-4 py-2 w-1/6 border-y-4 border-x-4 rounded-l-lg">Task</th>
                        <th className="px-4 py-2 w-1/6 border-4">Description</th>
                        <th className="px-4 py-2 w-1/6 border-4">Due Date</th>
                        <th className="px-4 py-2 w-1/6 border-4 rounded-r-lg">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map((taskValue) => (
                        <tr
                            key={task.id}>
                            <td className="px-4 py-2 ">{taskValue.taskName}</td>
                            <td className="px-4 py-2 ">{taskValue.description}</td>
                            <td className="px-4 py-2 ">{formatDate(taskValue.endTime)}</td>
                            <td>
                                <div className="flex flex-row gap-x-5 place-content-center">
                                    <button onClick={() =>handleUpdate(taskValue.id)}><FaPen/></button>
                                    <button><ImCheckmark/></button>
                                    <button onClick={() =>handleDelete(taskValue.id)}><MdDelete/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
