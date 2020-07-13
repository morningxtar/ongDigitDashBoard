import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PrestationService} from '../services/prestation.service';

@Component({
  selector: 'app-new-prestation',
  templateUrl: './new-prestation.component.html',
  styleUrls: ['./new-prestation.component.css']
})
export class NewPrestationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private prestationService: PrestationService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
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

    this.onAdd(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onAdd(data: any) {
    console.log(data);
    this.prestationService.saveService(this.prestationService.host + '/services', data)
      .subscribe(value => {
          alert('Service ajouté avec succès');
          this.router.navigateByUrl('/services');
        },
        error => {
          console.log(error);
        });
  }

}
