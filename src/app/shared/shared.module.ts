import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './serivces/basic/alertify/alertify.service';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AlertifyService],
})
export class SharedModule {}
