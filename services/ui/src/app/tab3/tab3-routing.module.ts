import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3PageComponent } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
