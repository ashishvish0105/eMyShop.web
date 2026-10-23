import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGetUserApiResponseModel, IUserModel } from '../../../../interface/user/IUser.Model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  UserList: IUserModel[] = [];
  UserForm!: FormGroup;
  CurrentRoute!: number;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((route) => {
      this.CurrentRoute = Number(route.get('userId'));
      console.log(this.CurrentRoute);
      this.getUserData()
    });

    this.UserForm = this.fb.group({
      userID: new FormControl(1, [Validators.required]),
      firstName: new FormControl('hellow', [Validators.required]),
      lastName: new FormControl('hellow', [Validators.required]),
      email: new FormControl('hellow', [Validators.required]),
      mobileNumber: new FormControl('hellow', [Validators.required]),
      address: new FormControl('hellow', [Validators.required]),
      city: new FormControl('hellow', [Validators.required]),
      state: new FormControl('hellow', [Validators.required]),
      country: new FormControl('hellow', [Validators.required]),
      postalCode: new FormControl('hellow', [Validators.required]),
      role: new FormControl('hellow', [Validators.required]),
      yearsOfExperience: new FormControl(2, [Validators.required]),
      skills: new FormControl('hellow', [Validators.required]),
    });
  }

  UserFormData(value: any) {
    this.userService.UpdatetUser(value,this.CurrentRoute).subscribe((res:any)=>{
      console.log(res.payLoad)
      this.router.navigate(['/User']);
    })
  }

  getUserData(){
    this.userService.GetUserData(this.CurrentRoute).subscribe((res:IGetUserApiResponseModel)=>{

      this.UserForm.patchValue(res.payLoad)
      console.log(res.payLoad)
    })
  }
}
