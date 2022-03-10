import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin/auth', component: AdminAuthComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
