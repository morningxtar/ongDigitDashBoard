import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {MachineService} from "../services/machine.service";
import {UserModel} from "../models/user.model";
import {MachineModel} from "../models/machine.model";

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  machines: Array<MachineModel>;
  currentPage = 0;
  totalPages: number;
  pages: Array<number>;

  constructor(private machineService: MachineService, private router: Router) {
  }

  ngOnInit(): void {
    this.onGetMachines();
  }

  onGetMachines() {
    this.machineService.getMachinePage(this.currentPage, 10)
      .subscribe(value => {
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.machines = value._embedded.machines;
      }, error => {
        console.log(error);
      });
  }

  onLoadMachine(i: number) {
    this.currentPage = i;
    this.onGetMachines();
  }

  onEdit(machine: MachineModel) {
// @ts-ignore
    const url = machine._links.self.href;
    this.router.navigateByUrl('machines/edit-machine/' + btoa(url));
  }

  onAdd() {
    this.router.navigateByUrl('machines/new-machine');
  }

  onDelete(machine: MachineModel) {

    const confirm1 = confirm('Etes vous sûre ?');
    if (confirm1) {
      // @ts-ignore
      this.machineService.deleteMachine(machine._links.self.href).subscribe(
        value => {
          this.onGetMachines();
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
