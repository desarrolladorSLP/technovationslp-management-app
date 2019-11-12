import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import { Batch } from "src/app/model/batch";
import swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { Deliverable } from "src/app/model/deliverables";
import { DeliverablesService } from "src/app/services/deliverables/deliverables.service";
import Swal from "sweetalert2";
import { Tecker } from "src/app/model/tecker";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { DxListComponent } from "devextreme-angular";

@Component({
  selector: "app-deliverable-card",
  templateUrl: "./deliverable-card.component.html",
  styleUrls: ["./deliverable-card.component.css"]
})
export class DeliverableCardComponent {
  @Input() deliverable: Deliverable;
  @Output() public batchDeleted = new EventEmitter();
  @Input() listBatch: Batch[];
  @ViewChild(DxListComponent) list: DxListComponent;
  public updatingBatch = false;
  public deletingBatch = false;
  yesdelete: string;
  batch: string;
  messageSucess: string;
  messageDeleted: string;
  listTeckers: Tecker[];
  tasks: DataSource;
  popupVisible = false;

  constructor(
    private deliverableService: DeliverablesService,
    private translate: TranslateService
  ) {
    this.deliverableService.getTeckersforBatch().subscribe(data => {
      this.listTeckers = data;
      this.tasks = new DataSource({
        store: new ArrayStore({
          key: "teckerId",
          data: this.listTeckers
        })
      });
    });
  }

  updateDeliverable() {
    this.translate.get("MESSAGE_SUCCESS").subscribe((text: string) => {
      this.messageSucess = text;
    });
    this.updatingBatch = !this.updatingBatch;
    this.deliverableService
      .updateDeliverable(this.deliverable, this.deliverable.id)
      .subscribe(data => {
        this.updatingBatch = false;
        this.batchDeleted.emit();
        Swal.fire({
          position: "top",
          type: "success",
          title: this.messageSucess,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  deleteDeliverable() {
    this.translate.get("MESSAGE_SUCCESS").subscribe((text: string) => {
      this.messageSucess = text;
    });
    this.deliverableService
      .deleteDeliverable(this.deliverable.id)
      .subscribe(data => {
        this.deletingBatch = false;
        this.batchDeleted.emit();
        Swal.fire({
          position: "top",
          type: "success",
          title: this.messageSucess,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  showAlertDelete() {
    this.translate.get("DELETED_DELIVERABLE").subscribe((text: string) => {
      this.messageDeleted = text;
    });
    this.translate.get("YES").subscribe((text: string) => {
      this.yesdelete = text;
    });
    swal
      .fire({
        title: this.messageDeleted,
        text: this.deliverable.title,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.yesdelete
      })
      .then(result => {
        if (result.value) {
          this.deleteDeliverable();
        }
      });
  }

  displayListTeckerByBatch() {
    this.popupVisible = true;
  }

  assingDeliverabletoTecker() {
    console.log(this.list.selectedItems);
    this.list.instance.unselectAll();
    this.list.instance.reload();
  }
}
