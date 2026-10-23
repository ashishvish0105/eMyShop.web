import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { OuterBoxStyleComponent } from '../../components/outer-box-style/outer-box-style.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ICategoryInfo } from '../../../interface/IFileResponse.model';
import { single } from 'rxjs';

@Component({
  selector: 'app-add-or-edit-image-info',
  standalone: true,
  imports: [
    OuterBoxStyleComponent,
    ReactiveFormsModule,
    ButtonComponent,
    OverlayModule,
  ],
  templateUrl: './add-or-edit-image-info.component.html',
  styleUrl: './add-or-edit-image-info.component.scss',
})
export class AddOrEditImageInfoComponent implements OnInit, AfterContentInit {
  formInfo!: FormGroup;

  switcValue: WritableSignal<boolean> = signal<boolean>(false);
  imgInfo = {
    filePath: null,
    fileBolb: '',
    imagefile: Blob,
  };
  @Output() formData = new EventEmitter<FormData>();
  @Output() overlapClose = new EventEmitter<boolean>();
  @Input('petchData') petchData!: ICategoryInfo;
  isSubmitForm: boolean = false;
  imageRequired = signal<boolean>(false);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInfo = this.fb.group({
      catTitle: new FormControl('', [Validators.required]),
      categoryName: new FormControl('', [Validators.required]),
      catDescription: new FormControl('', [Validators.required]),
    });
  }
  ngAfterContentInit(): void {
    if (this.petchData) {
      this.formInfo.setValue({
        catTitle: this.petchData.itemName,
        categoryName: this.petchData.categoryName,
        catDescription: this.petchData.itemdescription,
      });
      this.imgInfo.fileBolb = this.petchData.itemImagePath;
      this.switcValue.set(this.petchData.isvisiable);
    }
  }

  submit() {
    this.isSubmitForm = true;
    if (!this.imgInfo.filePath || !this.imgInfo.fileBolb) {
      this.imageRequired.set(true);
    } else {
      this.imageRequired.set(false);
    }
    if (this.formInfo.valid) {
      let formData = new FormData();
       ;
      formData.append('CategoryName', this.formInfo.value.categoryName);
      formData.append('ItemName', this.formInfo.value.catTitle);
      formData.append('Itemdescription', this.formInfo.value.catDescription);
      formData.append('Isvisiable', this.switcValue().toString());

      console.log(this.switcValue().toString());

      if (this.imgInfo.imagefile instanceof File) {
        formData.append(
          'ItemImage',
          this.imgInfo.imagefile,
          this.imgInfo.imagefile.name || 'image.png'
        );
      }
       ;
      console.log(formData);
      this.overlapClose.emit(true);
      this.formData.emit(formData);
    }
  }

  cancel() {
    this.overlapClose.emit(false);
  }

  switchEvent(switcValue: boolean) {
     ;
    if (switcValue) {
      this.switcValue.set(true);
    } else {
      this.switcValue.set(false);
    }
  }

  fileUpload(event: Event) {
    event.preventDefault();
    let button = document.createElement('input');
    button.setAttribute('type', 'file');
    button.setAttribute('accept', '.png, .jpg, .jpeg, .pdf');
    button.addEventListener('change', (innerEvent: Event) => {
      this.fileChangeEvent(innerEvent);
      this.imageRequired.set(false);
    });
    button.click();
  }

  fileChangeEvent(fileInput: any) {
    this.imgInfo.filePath = fileInput.target.value;
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.imgInfo.imagefile = fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          let imgBase64Path = e.target.result;
          this.imgInfo.fileBolb = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
export interface formField {
  catImage: File;
  catTitle: string;
  categoryName: string;
  catDescription: string;
  isvisiable: boolean;
}

export interface imgInfo {
  filePath: string;
  fileBolb: string;
  imagefile: Blob;
}
