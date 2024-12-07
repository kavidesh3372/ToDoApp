import Table from "./ListTaskComponent";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Hello=()=> {
  const navigate = useNavigate();
  function addTask(){
    navigate('/addTask');
  }
  return (
    <div className="relative">
      <motion.div variants={fadeIn("","spring",2,1)}  initial="hidden" animate="show" className="ml-10">
        <button className="border-2 rounded-md bg-transparent py-5 px-10 text-white" onClick={addTask}>
          Create Todo
        </button>
      </motion.div>
      {/* <AddTaskData /> */}
      <motion.div variants={fadeIn("down","spring",3,1)}  initial="hidden" animate="show" className="flex flex-row mt-10 ml-10">
        <Table />
      </motion.div>
    </div>  
  );
}

export default Hello;
