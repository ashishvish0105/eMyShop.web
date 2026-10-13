import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OuterBoxStyleComponent } from '../../../shared/components/outer-box-style/outer-box-style.component';
import { AddOrEditImageInfoComponent } from '../../../shared/singleProductView/add-or-edit-image-info/add-or-edit-image-info.component';
import { InformationWiithImageComponent } from '../../../shared/singleProductView/information-wiith-image/information-wiith-image.component';

import { CommonModule } from '@angular/common';
import {
  ApiResponseICategoryGetList,
  ApiResponseIDeleteCategoryItem,
  ApiResponseInsertOrUpdateCategory,
  ICategoryGetList,
  ICategoryInfo
} from '../../../models/IFileResponse.model';
import { ProfileService } from '../profile.service';
import { ProfileDetailComponent } from '../../user/component/profile-detail/profile-detail.component';
@Component({
  selector: 'app-profile-main-section',
  standalone: true,
  imports: [
    ProfileDetailComponent,
    OuterBoxStyleComponent,
    InformationWiithImageComponent,
    CommonModule,
    OverlayModule,
  ],
  templateUrl: './profile-main-section.component.html',
  styleUrl: './profile-main-section.component.scss',
})
export class ProfileMainSectionComponent implements OnInit {
  stringWord: number = 5;
  categoryGetList: ICategoryGetList[] = [];

  @ViewChild(InformationWiithImageComponent) InformationWiithImageComponent:
    | InformationWiithImageComponent
    | undefined;

  constructor(
    private overlay: Overlay,
    private scrollStrategyOptions: ScrollStrategyOptions,
    private profileService: ProfileService
  ) {}
  ngOnInit() {
    this.CategoryGetList();
  }

  addButton(editData?: ICategoryInfo) {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'model-backgrounnd-content',
      panelClass: 'model-content',
      scrollStrategy: this.scrollStrategyOptions.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      height: 'auto',
      maxWidth: 'auto',
      width: 'auto',
    });

    let overlayRef = this.overlay.create(config);
    const userProfilePortal = new ComponentPortal(AddOrEditImageInfoComponent);
    var componentRef = overlayRef.attach(userProfilePortal);
    if (editData?.categoryId) {
       ;
      componentRef.instance.petchData = editData;
    }
    componentRef.instance.overlapClose.subscribe({
      next: (res: boolean) => {
        if (res) {
          componentRef.instance.formData.subscribe((date) => {
             ;
            if (editData?.categoryId) {
              this.UpdateCategory(date, editData?.categoryId);
            } else {
              this.InsertCategory(date);
            }
            overlayRef.detach();
          });
        } else {
          overlayRef.detach();
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  editButton(category: ICategoryInfo) {
    this.addButton(category);
  }

  deleteButtonEvent(event: ICategoryInfo) {
    this.profileService.DeleteCategoryItem(event.categoryId).subscribe({
      next: (res: ApiResponseIDeleteCategoryItem) => {
        this.CategoryGetList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private InsertCategory(formData: FormData) {
    this.profileService.InsertCategory(formData).subscribe((res: ApiResponseInsertOrUpdateCategory) => {
      if (res.isSuccess) {
        this.CategoryGetList();
      }
    });
  }
  private UpdateCategory(formData: FormData, categoryId: number) {
     ;
    this.profileService
      .UpdateCategory(formData, categoryId)
      .subscribe((res: ApiResponseInsertOrUpdateCategory) => {
        if (res.isSuccess) {

          this.CategoryGetList();
        }
      });
  }

  private CategoryGetList() {
    this.profileService
      .CategoryGetList()
      .subscribe((res: ApiResponseICategoryGetList) => {
        this.categoryGetList = res.payload;
      });
  }
}
