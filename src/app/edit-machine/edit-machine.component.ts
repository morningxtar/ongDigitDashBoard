import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MachineService} from '../services/machine.service';
import {MachineModel} from '../models/machine.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.css']
})
export class EditMachineComponent implements OnInit {

  currentMachine: MachineModel;
  url: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private activedRoute: ActivatedRoute,
              private machineService: MachineService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.url = atob(this.activedRoute.snapshot.params.id);

    this.registerForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
    });

    this.machineService.getMachine(this.url)
      .subscribe(value => {
          this.currentMachine = value;
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
    this.machineService.updateMachine(this.url, value)
      .subscribe(data => {
          alert('Mise à jour effectuée avec succès');
          this.router.navigateByUrl('/machines');
        },
        error => {
          console.log(error);
        });
  }

}
