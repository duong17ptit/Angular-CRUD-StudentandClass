import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HocSinhComponent } from './hoc-sinh/hoc-sinh.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';

const routes: Routes = [
  { path: 'student', component: HocSinhComponent },
  { path: '', component: DashboardComponent},
  { path: 'class', component: LopHocComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
