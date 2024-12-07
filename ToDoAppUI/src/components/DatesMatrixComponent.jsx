const DatesMatrix = ({ dates, onDateClick }) => {
    return (
      <div className="mt-4">
        {dates.map((week, weekIndex) => (
          <div className="flex mb-2" key={`week-${weekIndex}`}>
            {week.map((day, dayIndex) => (
              <div key={`day-${weekIndex}-${dayIndex}`} className={`w-12 text-center cursor-pointer ${ day ? "text-white hover:bg-white hover:text-black hover:rounded-lg" : "text-transparent" }`} onClick={() => onDateClick(day)}>
                {day || ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default DatesMatrix;
  