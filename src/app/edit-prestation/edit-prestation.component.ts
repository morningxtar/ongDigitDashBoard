import {Component, OnInit} from '@angular/core';
import {MachineModel} from "../models/machine.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceModel} from "../models/service.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MachineService} from "../services/machine.service";
import {PrestationService} from "../services/prestation.service";

@Component({
  selector: 'app-edit-prestation',
  templateUrl: './edit-prestation.component.html',
  styleUrls: ['./edit-prestation.component.css']
})
export class EditPrestationComponent implements OnInit {

  currentService: ServiceModel;
  url: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private activedRoute: ActivatedRoute,
              private prestationService: PrestationService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.url = atob(this.activedRoute.snapshot.params.id);

    this.registerForm = this.formBuilder.group({
      libelle: ['', Validators.required],
    });

    this.prestationService.getService(this.url)
      .subscribe(value => {
          this.currentService = value;
        },
        error => {
          console.log(error);
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.onEdit(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onEdit(value: any) {
    this.prestationService.updateService(this.url, value)
      .subscribe(data => {
          alert('Mise à jour effectuée avec succès');
          this.router.navigateByUrl('/services');
        },
        error => {
          console.log(error);
        });
  }

}
