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
    this.session.title = data.appointmentData.title;
    this.session.date ='2020-02-02';/* data.appointmentData.startDate.getFullYear() + '-' + data.appointmentData.startDate.getMonth() + 1
    + '-' + data.appointmentData.startDate.getDay(); */
    this.session.startTime ='12:00';/*  data.appointmentData.startTime.getHours() + ':' + data.appointmentData.startTime.getMinutes()  */;
    this.session.endTime ='1:00';/* data.appointmentData.endTime.getHours() + ':' + data.appointmentData.endTime.getMinutes() ; */
    this.session.notes = data.appointmentData.notes;
    this.session.location = data.appointmentData.location;
    console.log(this.session);

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
    console.log(data);
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
