export class Session {
    id: string;
    batchId: string;
    date: string;
    location: string;
    startTime:  string;
    endTime: string;
    title: string;
    notes: string;
    startDate: Date = new Date();
    endDate:Date = new Date();
}
