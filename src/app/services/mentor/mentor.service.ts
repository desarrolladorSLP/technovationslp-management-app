import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { TeckerBatch } from "src/app/model/tecker-batch";
import { TeckerMentor } from "src/app/model/tecker-mentor";

@Injectable({
  providedIn: "root"
})
export class MentorService {
  protected urlEndpoint = `${environment.backendUrl}/api/mentor`;

  constructor(private httpClient: HttpClient) {}

  getTeckersByMentor(mentorId: string): Observable<TeckerBatch[]> {
    return this.httpClient.get<TeckerBatch[]>(
      `${this.urlEndpoint}/${mentorId}/teckers`
    );
  }

  updateTeckersToMentor(mentorId: string, teckers: TeckerMentor) {
    return this.httpClient.put<TeckerMentor>(
      `${this.urlEndpoint}/${mentorId}`,
      teckers
    );
  }
}
