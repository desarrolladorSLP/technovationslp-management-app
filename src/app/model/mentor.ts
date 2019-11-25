import { TeckerBatch } from "./tecker-batch";

export class Mentor {
    mentorId: string;
    pictureUrl: string;
    name: string;
    listTeckers: TeckerBatch[] = [];
}
