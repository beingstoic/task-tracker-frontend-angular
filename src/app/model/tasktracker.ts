import { Employee } from './employee';

export class TaskTracker {
  taskId: number;
  empId: Employee;
  taskDate: Date;
  taskName: string;
  additionalDetails: string;
  startTime: Date;
  endTime: Date;
  duration: number;
}
