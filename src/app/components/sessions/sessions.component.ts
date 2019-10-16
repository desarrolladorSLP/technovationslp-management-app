import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/model/program';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Batch } from 'src/app/model/batch';
import { Session } from 'src/app/model/session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})

export class SessionsComponent {

  protected listPrograms: Program[];
  protected listBatch: Batch[];
  protected listSessions: Session[];
  addButton = false;
  addSession = false;
  searchSession = false;
  programId: string;
  public filterSession = '';
  session: Session = new Session();

  constructor(private programService: ProgramsService, private sessionsService: SessionsService ) {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
   }

   onProgramChange(programId: string) {
      this.sessionsService.getBatchByPrograms(programId).subscribe(data => {
        this.listBatch = data;
        this.searchSession = false;
      });
  }

  addingSession() {
    this.sessionsService.addSession(this.session).subscribe( data => {
      this.addSession = false;
    });
  }

  onBatchChange(batchId: string) {
    this.addButton = true;
    this.refreshSessions(batchId);
  }

  refreshSessions(batchId: string) {
    this.sessionsService.getSessionsByBatch(batchId).subscribe( data => {
        this.listSessions = data;
        this.searchSession = true;
    });
  }
}
