import { Course, TimeSlot } from './types';

// Configuration for the grid
export const START_HOUR = 6; // 6 AM
export const END_HOUR = 22;  // 10 PM
export const DAYS: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Generate time slots for the sidebar
export const TIME_SLOTS: TimeSlot[] = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
  const hour = START_HOUR + i;
  return {
    hour,
    label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
  };
});

// Color themes map for Tailwind classes
export const COLOR_THEMES = {
  pink: {
    bg: 'bg-pink-100',
    border: 'border-pink-200',
    text: 'text-pink-800',
    hover: 'hover:bg-pink-200',
    badge: 'bg-pink-200 text-pink-700'
  },
  blue: {
    bg: 'bg-sky-100',
    border: 'border-sky-200',
    text: 'text-sky-800',
    hover: 'hover:bg-sky-200',
    badge: 'bg-sky-200 text-sky-700'
  },
  purple: {
    bg: 'bg-violet-100',
    border: 'border-violet-200',
    text: 'text-violet-800',
    hover: 'hover:bg-violet-200',
    badge: 'bg-violet-200 text-violet-700'
  },
  green: {
    bg: 'bg-emerald-100',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    hover: 'hover:bg-emerald-200',
    badge: 'bg-emerald-200 text-emerald-700'
  },
  orange: {
    bg: 'bg-orange-100',
    border: 'border-orange-200',
    text: 'text-orange-800',
    hover: 'hover:bg-orange-200',
    badge: 'bg-orange-200 text-orange-700'
  },
};

// Course Data provided in the prompt - renamed to INITIAL_COURSES
export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    name: 'Matemáticas I',
    professor: 'Dr. Alberto Rivera',
    room: 'Salón B203',
    credits: 4,
    day: 'Lunes',
    startTime: 8,
    endTime: 10,
    colorTheme: 'blue'
  },
  {
    id: '1-b',
    name: 'Matemáticas I',
    professor: 'Dr. Alberto Rivera',
    room: 'Salón B203',
    credits: 4,
    day: 'Miércoles',
    startTime: 8,
    endTime: 10,
    colorTheme: 'blue'
  },
  {
    id: '2',
    name: 'Intro. a los Negocios',
    professor: 'Lic. Mariana López',
    room: 'Salón A105',
    credits: 3,
    day: 'Martes',
    startTime: 10,
    endTime: 12,
    colorTheme: 'pink'
  },
  {
    id: '3',
    name: 'Contabilidad',
    professor: 'Mtra. Sofia Gonzalez',
    room: 'Salón C110',
    credits: 4,
    day: 'Jueves',
    startTime: 14,
    endTime: 16,
    colorTheme: 'purple'
  },
  {
    id: '4',
    name: 'Inglés II',
    professor: 'Prof. John Smith',
    room: 'Salón B101',
    credits: 2,
    day: 'Viernes',
    startTime: 8,
    endTime: 10,
    colorTheme: 'green'
  },
  {
    id: '5',
    name: 'Economía',
    professor: 'Dr. Carlos Méndez',
    room: 'Salón D004',
    credits: 5,
    day: 'Sábado',
    startTime: 9,
    endTime: 12,
    colorTheme: 'orange'
  }
];