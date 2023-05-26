import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsItemComponent } from './settings-item/settings-item.component';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { StatisticComponent } from './statistic/statistic.component';
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './tour-loader/tour-loader.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingsItemComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    TableModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }
