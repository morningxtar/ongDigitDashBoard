import { Component, OnInit } from '@angular/core';
import {MachineService} from "../services/machine.service";
import {Router} from "@angular/router";
import {PrestationService} from "../services/prestation.service";
import {MachineModel} from "../models/machine.model";
import {ServiceModel} from "../models/service.model";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {

  services: Array<ServiceModel>;
  currentPage = 0;
  totalPages: number;
  pages: Array<number>;

  constructor(private prestationService: PrestationService, private router: Router) { }

  ngOnInit(): void {
    this.onGetServices();
  }

  onGetServices() {
    this.prestationService.getServicePage(this.currentPage, 10)
      .subscribe(value => {
        // @ts-ignore
        this.totalPages = value.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        // @ts-ignore
        this.services = value._embedded.services;
      }, error => {
        console.log(error);
      });
  }

  onLoadService(i: number) {
    this.currentPage = i;
    this.onGetServices();
  }

  onEdit(machine: MachineModel) {
// @ts-ignore
    const url = machine._links.self.href;
    this.router.navigateByUrl('services/edit-service/' + btoa(url));
  }

  onAdd() {
    this.router.navigateByUrl('services/new-service');
  }

  onDelete(sevice: ServiceModel) {

    const confirm1 = confirm('Etes vous sûre ?');
    if (confirm1) {
      // @ts-ignore
      this.prestationService.deleteService(sevice._links.self.href).subscribe(
        value => {
          this.onGetServices();
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
