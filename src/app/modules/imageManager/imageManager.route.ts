import { Routes } from "@angular/router";
import { ImageManagerMainSectionComponent } from "./image-manager-main-section/image-manager-main-section.component";
import { authGuardGuard } from "../../core/guards/auth-guard.guard";

export const route:Routes=[{
  path:"",
  component:ImageManagerMainSectionComponent,
  canActivate: [authGuardGuard],
  data: { authRole: 'seller' },
}]
