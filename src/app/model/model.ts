import { TaskTracker } from './tasktracker';

export class DisplayModel {
  empId: string;
  name: string;
  totalDuration: number = 0;
  tasks: TaskTracker[] = new Array();
}
