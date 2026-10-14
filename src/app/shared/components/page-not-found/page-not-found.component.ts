import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTE_NAME } from '../../../constVariable/localStorageObjName.const';
import { LocalStarageService } from '../../../core/Comman/local-starage.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

 CONSTE_VARIABLE =  CONSTE_NAME;
  // a constructor is spececial method that is called when an instance of a class is created.
  // It is used to initialize the properties of the class and perform any setup that is required before the object can be used.

  // constructor(private router: Router, private localStarageService: LocalStarageService) {

  // }
router: Router = inject(Router);
localStarageService: LocalStarageService = inject(LocalStarageService);


goToHome() {
   ;
    this.localStarageService.removeItemLocalStorage(this.CONSTE_VARIABLE.CURRENT_USER);
    this.router.navigate(['/','login']);

  }
}
