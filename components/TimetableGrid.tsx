import React from 'react';
import { Course, DayOfWeek } from '../types';
import { START_HOUR, DAYS, TIME_SLOTS, COLOR_THEMES } from '../constants';
import { Clock } from 'lucide-react';

interface TimetableGridProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ courses, onCourseClick }) => {
  
  // Calculate grid position for a course
  const getGridPosition = (course: Course) => {
    // Column: Map day string to index (1-based because Time col is 1)
    const dayIndex = DAYS.indexOf(course.day);
    const colStart = dayIndex + 2; // +1 for 0-index, +1 for Time column

    // Row: (StartHour - ConfigStartHour) + 2 (Header row is 1)
    const rowStart = (course.startTime - START_HOUR) + 2;
    const rowSpan = course.endTime - course.startTime;

    return {
      gridColumnStart: colStart,
      gridRowStart: rowStart,
      gridRowEnd: `span ${rowSpan}`
    };
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col bg-white rounded-3xl shadow-xl border border-gray-100">
      
      {/* Mobile/Tablet Note */}
      <div className="lg:hidden p-4 bg-yellow-50 text-yellow-800 text-xs text-center font-medium border-b border-yellow-100">
        ↔ Desliza horizontalmente para ver toda la semana
      </div>

      {/* Scrollable Container */}
      <div className="overflow-auto relative flex-1 custom-scrollbar">
        <div className="min-w-[800px] grid grid-cols-[80px_repeat(6,1fr)] grid-rows-[50px_repeat(16,minmax(60px,1fr))] bg-white">
          
          {/* --- HEADER ROW (Days) --- */}
          {/* Top Left Empty Cell */}
          <div className="sticky top-0 left-0 z-30 bg-white border-b border-gray-100 border-r p-2 flex items-center justify-center">
             <Clock size={18} className="text-gray-400" />
          </div>

          {/* Day Headers */}
          {DAYS.map((day) => (
            <div 
              key={day} 
              className="sticky top-0 z-20 bg-white border-b border-gray-100 p-2 flex items-center justify-center font-semibold text-gray-600 text-sm tracking-wide uppercase"
            >
              {day}
            </div>
          ))}

          {/* --- TIME COLUMN (Rows) --- */}
          {TIME_SLOTS.map((slot, index) => (
             /* Row index is index + 2 (1 for header, 1 for 1-based CSS grid) */
            <div 
              key={slot.hour} 
              className="sticky left-0 z-10 bg-white border-r border-gray-100 text-xs text-gray-400 font-medium flex items-start justify-center pt-2 -mt-2.5"
              style={{ gridRowStart: index + 2 }}
            >
              {slot.label.split(' ')[0]} <span className="text-[10px] ml-1 mt-[1px]">{slot.label.split(' ')[1]}</span>
            </div>
          ))}

          {/* --- GRID LINES --- */}
          {/* Create empty cells for grid lines */}
          {TIME_SLOTS.map((_, rowIndex) => (
            DAYS.map((_, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className="border-b border-r border-gray-50"
                style={{ 
                  gridRowStart: rowIndex + 2,
                  gridColumnStart: colIndex + 2
                }}
              />
            ))
          ))}

          {/* --- COURSE BLOCKS --- */}
          {courses.map((course) => {
            const pos = getGridPosition(course);
            const theme = COLOR_THEMES[course.colorTheme];

            return (
              <button
                key={course.id}
                onClick={() => onCourseClick(course)}
                className={`m-1 p-2 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md z-10 flex flex-col justify-center border-l-4 ${theme.bg} ${theme.text} ${theme.border} group`}
                style={{
                  gridColumnStart: pos.gridColumnStart,
                  gridRowStart: pos.gridRowStart,
                  gridRowEnd: pos.gridRowEnd
                }}
              >
                <div className="font-bold text-xs md:text-sm leading-tight mb-1 truncate w-full">
                  {course.name}
                </div>
                <div className="text-[10px] md:text-xs opacity-80 truncate w-full">
                  {course.room}
                </div>
                <div className="mt-auto pt-1 hidden md:block">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-white/40 font-semibold group-hover:bg-white/60`}>
                        {course.startTime}:00 - {course.endTime}:00
                    </span>
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default TimetableGrid;