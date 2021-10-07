import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquireComponent } from './enquire.component';
import { EnquireRoutingModule } from './enquire.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EnquireRoutingModule,
    SharedModule
  ],
  declarations: [EnquireComponent]
})
export class EnquireModule { }
