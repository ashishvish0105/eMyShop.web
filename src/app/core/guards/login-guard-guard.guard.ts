import { inject } from '@angular/core';
import { LocalStarageService } from '../../services/local-starage.service';
import { CanActivateFn, Router } from '@angular/router';
import {
  currentUserObjModel,
  localStorageObjName,
  localStorageObjNameModel,
} from '../../constVariable/localStorageObjName.const';
import { AuthGuardService } from '../../services/auth-guard.service';

export const loginGuardGuardGuard: CanActivateFn = (route, state) => {
  let currentUserObjData: currentUserObjModel;
  const localStarageService = inject(LocalStarageService);
  const router = inject(Router);
  const authGuardService = inject(AuthGuardService);
  let isauth: boolean = false;
  currentUserObjData =
    localStarageService.getObjLocalStorage(
      localStorageObjName.currentUserObj
    );
  //
  // authGuardService.autharize.subscribe(res =>{
  //     console.log(res);
  //     isauth =res;
  //   });
  if (currentUserObjData) {
    debugger;
    if (!currentUserObjData.password && !currentUserObjData.password) {
      if (
        currentUserObjData.password != '' &&
        currentUserObjData.password != ''
      ) {
        router.navigate(['/']);
      }
    }else{
      debugger;
      router.navigate(['/','home','product']);
    }
  }  return true;
};
