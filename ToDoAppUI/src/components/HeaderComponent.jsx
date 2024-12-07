import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSunMedium } from "react-icons/lu";
import { RxMoon } from "react-icons/rx";
import sunImage from "/src/assets/sun.jpeg";
import moonImage from "/src/assets/Moon.jpeg";
import DateDisplay from "./TodayDateComponent";
const CurrentDay = ({ children }) =>{
	const [buttonState, setButtonState] = useState(false);
	const toggleBackground = () => {
    		setButtonState(!buttonState);
  	};
	return (
		<div className="relative min-h-screen overflow-hidden">
      			<AnimatePresence>
       				<motion.div key={buttonState ? "moon" : "sun"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover"style={{backgroundImage: `url(${buttonState ? moonImage : sunImage})`,}}></motion.div>
      			</AnimatePresence>
      		<div className="relative z-20">
       			<div className="flex flex-row mt-5 ml-10 mb-10 gap-x-10">
          			<DateDisplay />
         			<div className="absolute transition duration-700 hover:scale-105 hover:backdrop-blur-lg border-2 rounded-lg top-0 right-0 m-7">
            				<button className="p-4" onClick={toggleBackground}>
              					{buttonState ? (
                						<LuSunMedium style={{ fontSize: "2em", color: "white" }} />
              						) : (
                						<RxMoon style={{ fontSize: "2em", color: "white" }} />
             					)}
            				</button>
          			</div>
        		</div>
		    </div>
            <div className="relative z-20">{children}</div>
    	</div>
	)
}
export default CurrentDay;