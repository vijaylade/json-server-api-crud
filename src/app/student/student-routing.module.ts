import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuInfoComponent } from './stu-info/stu-info.component'

const routes: Routes = [
  {
    path: 'info',
    component: StuInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
