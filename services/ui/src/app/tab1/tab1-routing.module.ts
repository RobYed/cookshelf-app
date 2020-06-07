import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1PageComponent } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
