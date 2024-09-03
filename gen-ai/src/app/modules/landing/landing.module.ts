import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { OptionComponent } from './option/option.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    LandingComponent,
    OptionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LandingModule { }
