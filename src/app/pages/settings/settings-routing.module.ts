import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsItemComponent} from "./settings-item/settings-item.component";

const routes: Routes = [
  {
    path:'',
    component: SettingsItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
