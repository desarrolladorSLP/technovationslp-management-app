import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/model/program';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Batch } from 'src/app/model/batch';
import { Session } from 'src/app/model/session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['sessions.component.css']
})

export class SessionsComponent {

  protected listPrograms: Program[];
  protected listBatch: Batch[];
  protected listSessions: Session[];
  public filterSession = '';
  session: Session;
  programId: string;
  addSession = false;
  searchSession = false;
  currentDate = new Date(2020, 4, 25);



  constructor(private programService: ProgramsService, private sessionsService: SessionsService ) {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
   }

  onProgramChange(programId: string) {
      this.sessionsService.getBatchByPrograms(programId).subscribe(data => {
        this.listBatch = data;
        this.searchSession = true;
        this.session = new Session();
        this.session.batchId = this.listBatch[0].id;
        this.refreshSessions(this.listBatch[0].id);
      });
  }

  addingSession() {
    this.sessionsService.addSession(this.session).subscribe( data => {
      this.addSession = false;
      this.refreshSessions(this.session.batchId);
    });
  }

  onBatchChange(batchId: string) {
    this.session = new Session();
    this.session.batchId = batchId;
    this.refreshSessions(this.session.batchId);
  }

  refreshSessions(batchId: string) {
    this.sessionsService.getSessionsByBatch(batchId).subscribe( data => {
        this.listSessions = data;

        this.searchSession = true;
    });
  }

  onAppointmentFormOpening(data) {
    const that = this;
    const form = data.form;
    var dateS = data.appointmentData.Date;

    form.option("items", [{
        label: {
            text: "Title"
        },
        editorType: "dxTextBox",},

        {
            label: {
            text: "Notes"
        },
        name: "notes",
        editorType: "dxTextArea",
        },
        {
        label: {
            text: "startTime"
        },
          name: "startTime",
          editorType: "dxDateBox",
          editorOptions: {
              width: "100%",
              type: "time",
          }
       },
       {
        label: {
            text: "endTime"
        },
          name: "endTime",
          editorType: "dxDateBox",
          editorOptions: {
              width: "100%",
              type: "time",
          }
       },
       {
        label: {
            text: "Date"
        },
          name: "dateS",
          editorType: "dxDateBox",
          editorOptions: {
              width: "100%",
              type: "date",
              onValueChanged: function(args) {
                dateS = args.value;
            }
          }
       },
        {
            dataField: "location",
            editorType: "dxTextBox",
        },
    ]);
}
}
