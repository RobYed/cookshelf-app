import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2PageComponent } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
