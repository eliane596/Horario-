import React, { useState } from 'react';
import { Calendar, BookOpen, Search, Plus, Heart } from 'lucide-react';
import TimetableGrid from './components/TimetableGrid';
import CourseModal from './components/CourseModal';
import AddCourseModal from './components/AddCourseModal';
import { INITIAL_COURSES } from './constants';
import { Course } from './types';

function App() {
  // State management
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [semester, setSemester] = useState('Semestre 2024-1');
  
  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- Handlers ---

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 200); 
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
    closeDetailsModal();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 p-4 md:p-8 font-poppins">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          
          {/* Left: Title & Semester */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-rose-100 rounded-2xl text-rose-500 shadow-sm">
                <Calendar size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                  Horario-Eli <Heart className="text-rose-500 fill-rose-500" size={24} />
                </h1>
                <input 
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="bg-transparent text-gray-500 text-sm font-medium hover:bg-white hover:shadow-sm focus:bg-white focus:shadow-sm px-2 py-0.5 rounded-lg -ml-2 outline-none transition-all w-full max-w-[250px]"
                />
              </div>
            </div>
          </div>

          {/* Right: University & Actions */}
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
             
            <div className="text-right mr-2 hidden md:block">
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Universidad</span>
                <span className="text-lg font-bold text-indigo-900 leading-none">Universidad del Magdalena</span>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* Stats Card */}
                 <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-400" />
                    <div>
                        <span className="block text-[10px] text-gray-400 font-bold uppercase">Materias</span>
                        <span className="text-base font-bold text-indigo-900 leading-none">{courses.length}</span>
                    </div>
                 </div>

                 {/* Add Button */}
                 <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all"
                 >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Nueva Materia</span>
                 </button>
            </div>
          </div>
        </header>

        {/* Main Content - Grid */}
        <main className="flex-1 min-h-0 relative">
          <TimetableGrid 
            courses={courses} 
            onCourseClick={handleCourseClick} 
          />
        </main>

      </div>

      {/* Modals */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={isDetailsModalOpen} 
        onClose={closeDetailsModal} 
        onDelete={handleDeleteCourse}
      />

      <AddCourseModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourse}
      />

    </div>
  );
}

export default App;