// Define the days of the week we support
export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

// Define the structure of a Course object
export interface Course {
  id: string;
  name: string;
  professor: string;
  room: string;
  credits: number;
  day: DayOfWeek;
  startTime: number; // 24h format, e.g., 8 for 8:00 AM
  endTime: number;   // 24h format, e.g., 10 for 10:00 AM
  colorTheme: 'pink' | 'blue' | 'purple' | 'green' | 'orange';
}

// Helper interface for rendering the grid
export interface TimeSlot {
  hour: number;
  label: string;
}