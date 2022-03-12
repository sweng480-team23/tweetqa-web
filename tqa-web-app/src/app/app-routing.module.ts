import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainComponent } from "./components/main/main.component";
import { VisitorInvitationFormComponent } from "./components/visitor-invitation-form/visitor-invitation-form.component";
import { AppRoute } from "./constants/app-route.constant";

const routes: Routes = [
  { path: AppRoute.ROOT.getRoute, component: MainComponent },
  { path: AppRoute.ADMIN_AUTH.getRoute, component: AdminAuthComponent },
  { path: AppRoute.ADMIN_VISITOR.getRoute, component: VisitorInvitationFormComponent },
  { path: AppRoute.ADMIN.getRoute, component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
