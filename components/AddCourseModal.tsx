import React, { useState } from 'react';
import { Course, DayOfWeek } from '../types';
import { DAYS, START_HOUR, END_HOUR, COLOR_THEMES } from '../constants';
import { X, Save } from 'lucide-react';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: Course) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    professor: '',
    room: '',
    credits: 3,
    day: 'Lunes' as DayOfWeek,
    startTime: 8,
    endTime: 10,
    colorTheme: 'pink' as keyof typeof COLOR_THEMES
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.endTime <= formData.startTime) {
      alert("La hora de fin debe ser después de la hora de inicio");
      return;
    }
    
    const newCourse: Course = {
      id: Date.now().toString(),
      ...formData
    };

    onAdd(newCourse);
    onClose();
    // Reset form for next time (optional)
    setFormData({
        name: '',
        professor: '',
        room: '',
        credits: 3,
        day: 'Lunes',
        startTime: 8,
        endTime: 10,
        colorTheme: 'pink'
    });
  };

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-white p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-black">Agregar Nueva Materia</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-black mb-1">Nombre de la Materia</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none transition-all text-black placeholder-gray-500"
                placeholder="Ej. Diseño Gráfico"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Profesor</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none text-black placeholder-gray-500"
                placeholder="Ej. Ana Pérez"
                value={formData.professor}
                onChange={e => setFormData({...formData, professor: e.target.value})}
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-black mb-1">Salón / Aula</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none text-black placeholder-gray-500"
                placeholder="Ej. C-201"
                value={formData.room}
                onChange={e => setFormData({...formData, room: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
               <label className="block text-sm font-medium text-black mb-1">Día</label>
               <select 
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none"
                value={formData.day}
                onChange={e => setFormData({...formData, day: e.target.value as DayOfWeek})}
               >
                 {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-black mb-1">Inicio</label>
               <select 
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none"
                value={formData.startTime}
                onChange={e => setFormData({...formData, startTime: Number(e.target.value)})}
               >
                 {hours.map(h => (
                    <option key={h} value={h}>{h}:00</option>
                 ))}
               </select>
            </div>
             <div>
               <label className="block text-sm font-medium text-black mb-1">Fin</label>
               <select 
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none"
                value={formData.endTime}
                onChange={e => setFormData({...formData, endTime: Number(e.target.value)})}
               >
                 {hours.map(h => (
                    <option key={h} value={h + 1}>{h + 1}:00</option>
                 ))}
               </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-black mb-1">Créditos</label>
               <input 
                type="number"
                min="1"
                max="10"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none text-black"
                value={formData.credits}
                onChange={e => setFormData({...formData, credits: Number(e.target.value)})}
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-black mb-1">Color</label>
               <div className="flex gap-2 mt-1">
                 {Object.keys(COLOR_THEMES).map((colorKey) => {
                     const isSelected = formData.colorTheme === colorKey;
                     let bgClass = '';
                     switch(colorKey) {
                        case 'pink': bgClass = 'bg-pink-400'; break;
                        case 'blue': bgClass = 'bg-sky-400'; break;
                        case 'purple': bgClass = 'bg-violet-400'; break;
                        case 'green': bgClass = 'bg-emerald-400'; break;
                        case 'orange': bgClass = 'bg-orange-400'; break;
                     }

                     return (
                        <button
                            key={colorKey}
                            type="button"
                            onClick={() => setFormData({...formData, colorTheme: colorKey as any})}
                            className={`w-8 h-8 rounded-full ${bgClass} ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'opacity-70 hover:opacity-100'} transition-all`}
                        />
                     );
                 })}
               </div>
             </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-black font-medium hover:bg-gray-100 transition-colors border border-transparent"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-gray-50 border border-gray-300 shadow-sm transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;