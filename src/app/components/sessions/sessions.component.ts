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
  currentDate = new Date(2020, 1, 27);

  constructor(private programService: ProgramsService, private sessionsService: SessionsService ) {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
   }

  onProgramChange(programId: string) {
      this.sessionsService.getBatchByPrograms(programId).subscribe(data => {
        this.listBatch = data;
        this.searchSession = true;
        console.log(this.listBatch);
        this.session = new Session();
        this.session.batchId = this.listBatch[0].id;
        this.refreshSessions(this.listBatch[0].id);
      });
  }

  addingSession(data) {
    console.log(data.appointmentData.startTime.getTime());
    this.sessionsService.addSession(this.session).subscribe( session => {
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
        this.listSessions.forEach(element => {
          const arrayDate = element.date.split('-');
          const arrayStartTime = element.startTime.split(':');
          const arrayEndTime = element.endTime.split(':');

          const year = Number(arrayDate[0]);
          const month = Number(arrayDate[1]) - 1;
          const day = Number(arrayDate[2]);

          const startHour = Number(arrayStartTime[0]);
          const startMinutes = Number(arrayStartTime[1]);
          const endHour = Number(arrayEndTime[0]);
          const endMinutes = Number(arrayEndTime[1]);

          element.startDate = new Date(year, month, day , startHour, startMinutes);
          element.endDate = new Date(year, month, day , endHour, endMinutes);
          });
      console.log(this.listSessions);
        this.searchSession = true;
    });
  }

  onAppointmentFormOpening(data) {
    const that = this;
    const form = data.form;

    let startDate = data.appointmentData.startDate;

    form.option('items', [
      {
        label: {
            text: 'Title'
        },
        editorType: 'dxTextBox',
        dataField: 'title',
        onValueChanged: function(args) {
          console.log(args.value);
       }
      },

      {
      label: {
          text: 'Notes'
      },
      name: 'notes',
      editorType: 'dxTextArea',
      dataField: 'notes'
      },

      {
        label: {
            text: 'startTime'
        },
          name: 'startTime',
          dataField: 'startTime',
          editorType: 'dxDateBox',
          editorOptions: {
              width: '100%',
              type: 'time',
          }
      },

      {
      label: {
          text: 'endTime'
      },
        name: 'endTime',
        editorType: 'dxDateBox',
        dataField: 'endTime',
        editorOptions: {
            width: '100%',
            type: 'time',
        }
      },

      {
      label: {
          text: 'Date'
      },
        name: 'startDate',
        dataField: 'startDate',
        editorType: 'dxDateBox',
        editorOptions: {
            width: '100%',
            type: 'date',
            onValueChanged: function(args) {
              startDate = args.value;
          }
        }
      },

      {
          dataField: 'location',
          editorType: 'dxTextBox',
      },
    ]);
}

}
