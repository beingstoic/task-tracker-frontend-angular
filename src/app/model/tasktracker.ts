import { employee } from "./employee";

export class tasktracker{
    taskId:number;
    empId:employee;
    taskDate:Date;
    taskName:string;
    additionalDetails:string;
    startTime:Date;
    endTime:Date;
}