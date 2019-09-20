import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-delete-program',
  templateUrl: './modal-delete-program.component.html',
  styles: []
})
export class ModalDeleteProgramComponent implements OnInit {
  modalEl = null;
  showClose = true;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modalEl.modal('show');
}

close() {
    this.modalEl.modal('hide');
}

}
