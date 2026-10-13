import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import {
  IUserListApiResponseModel,
  IUserModel,
} from '../../../../interface/user/IUser.Model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule, DatePipe, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  UserList: IUserModel[] = [];
  UserForm!: FormGroup;
  userID: any;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
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

    this.userService.GetUserListData().subscribe((res: any) => {
      if (res.isSuccess) {
        this.UserList = res.payLoad;
        console.log(res);
      }
    });
  }

  UserFormData(value: any) {
    console.log(value);
  }
}
