import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsItemComponent } from './settings-item/settings-item.component';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    SettingsItemComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }
