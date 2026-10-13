import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule
],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  serviceList: serviceList[] = [
    {
      servicesId: 1,
      ServicesName: 'voting update',
    },
    {
      servicesId: 2,
      ServicesName: 'Adahar update',
    },
    {
      servicesId: 3,
      ServicesName: 'pan card',
    },
    {
      servicesId: 4,
      ServicesName: 'goverment',
    },
  ];
  formHeaadingName: string = 'Basic Infomation';

  servicesForm!: FormGroup;
  // addServicesForm!: FormGroup;
  IsAddServicesForm = signal(false);
  SelectedServiceType: number = 1;
  IsValidForm: boolean = false;

  constructor(private fb: FormBuilder,private route:Router) {}

  ngOnInit() {
    // this.servicesForm = this.fb.group({
    //   UserName: new FormControl('name', [Validators.required]),
    //   Email: new FormControl('name', [Validators.required]),
    //   ServicesType: new FormControl(0, [Validators.required]),
    // });

    // this.servicesForm.get('ServicesType')?.valueChanges.subscribe((value) => {
    //   this.onChangeServicesType(value);
    // });

    // this.addServicesForm = this.fb.group({
    //   FirstName: new FormControl('First name', [Validators.required]),
    //   MiddleName: new FormControl('Middle name', [Validators.required]),
    //   LastName: new FormControl('Last name', [Validators.required]),
    //   Messaage: new FormControl('hello', [Validators.required]),
    // });

    this.servicesForm = this.fb.group({
      UserName: new FormControl('UserName', [Validators.required]),
      Email: new FormControl('demo@gmail.com'),
      ServicesType: new FormControl(0, [Validators.required]),
      FirstName: new FormControl('first name', [Validators.required]),
      MiddleName: new FormControl('middle name', [Validators.required]),
      LastName: new FormControl('last name', [Validators.required]),
      Message: new FormControl('message'),
      MobileNo: new FormControl('8866077896'),
      Address: new FormControl('Marutinager-b, vijalpor navsari'),
    });
    this.servicesForm.get('ServicesType')?.valueChanges.subscribe((value) => {
      this.onChangeServicesType(value);
    });
  }

  servicesFormSubmit() {
    if (this.servicesForm.valid == true) {
      console.log(this.servicesForm.value);
    }
  }

  addServicesFormSubmit() {
     ;
    this.IsValidForm = true;
    if (this.servicesForm.valid && this.IsValidForm) {
      console.log(this.servicesForm.value);
      this.route.navigate(['dashboard/eShop/token']);

    }
  }

  onChangeServicesType(value: any) {
     ;
    if (parseInt(value) === 0) {
      this.IsAddServicesForm.set(false);
    } else {
      this.IsAddServicesForm.set(true);
      this.serviceList.map((res: serviceList) => {
        if (res.servicesId === parseInt(value)) {
          this.formHeaadingName = res.ServicesName;
        }
      });
    }
  }
}
export interface serviceList {
  servicesId: number;
  ServicesName: string;
}
