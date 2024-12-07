import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

function getDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    return `${formattedDate}`;
  }
  
  function getTime() {
    const today = new Date();
    const hour = today.getHours().toString().padStart(2, '0');
    const min = today.getMinutes().toString().padStart(2, '0');
    const sec = today.getSeconds().toString().padStart(2, '0');
    return `${hour}:${min}`;
  }
  
  function getYear() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  }
  
  function getDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const day = daysOfWeek[today.getDay()];
    return `${day}`;
  }

const DateDisplay = () =>{
    
    const [currentDate] = useState(getDate());
    const [currentTime, setCurrentTime] = useState(getTime());
    const [currentDay] = useState(getDay());
    const [currentYear] = useState(getYear());

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(getTime());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    return(
      <div  className="flex flex-row gap-x-10">
        <motion.div variants={fadeIn("","spring",0.5,1)}  initial="hidden" animate="show" className="font-bold text-white border-2 rounded-lg transition duration-1000 hover:backdrop-blur-md hover:!scale-110" style={{ fontFamily: 'Crimson Text, serif' }}>
          <span className="p-3 sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">Today Date:</span>
          <div className="flex justify-center pt-10 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{currentDate}</div>
          <div className="flex justify-center pr-3 pt-10 pl-60 sm:pl-20 md:pl-40 lg:pl-60 xl:pl-80 sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">{currentYear}</div>
        </motion.div>
        <motion.div variants={fadeIn("","spring",1,1)} initial="hidden" animate="show" className="font-bold text-white border-2 rounded-lg transition duration-1000 hover:backdrop-blur-md hover:!scale-110" style={{ fontFamily: 'Crimson Text, serif' }}>
          <span className="p-3 sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">Today Day:</span>
          <div className="flex justify-center pt-10 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{currentDay}</div>
          <div className="flex justify-center pr-3 pt-10 pl-60 sm:pl-20 md:pl-40 lg:pl-60 xl:pl-80 sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">{currentTime}</div>
        </motion.div>
      </div>
    )
}
export default DateDisplay;