import React from 'react';
import { Course } from '../types';
import { COLOR_THEMES } from '../constants';
import { X, MapPin, User, Clock, GraduationCap, Trash2 } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose, onDelete }) => {
  if (!isOpen || !course) return null;

  const theme = COLOR_THEMES[course.colorTheme];

  // Prevent click inside modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = () => {
    // Eliminamos la confirmación para que la acción sea directa y no falle
    onDelete(course.id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 ${theme.border} border-t-4`}
        onClick={handleContentClick}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`p-6 pb-4 flex justify-between items-start ${theme.bg} bg-opacity-30`}>
          <div>
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 tracking-wide uppercase ${theme.badge} bg-opacity-60`}>
              {course.credits} Créditos
            </span>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              {course.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/50 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${theme.bg}`}>
              <User className={theme.text} size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Profesor</p>
              <p className="text-gray-700 font-medium">{course.professor}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${theme.bg}`}>
              <MapPin className={theme.text} size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Ubicación</p>
              <p className="text-gray-700 font-medium">{course.room}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${theme.bg}`}>
              <Clock className={theme.text} size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Horario</p>
              <p className="text-gray-700 font-medium">
                {course.day}, {course.startTime}:00 - {course.endTime}:00
              </p>
            </div>
          </div>
          
           <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${theme.bg}`}>
              <GraduationCap className={theme.text} size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Estado</p>
              <p className="text-gray-700 font-medium">Activa</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
            <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
                <Trash2 size={16} />
                Eliminar
            </button>
            <button 
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;