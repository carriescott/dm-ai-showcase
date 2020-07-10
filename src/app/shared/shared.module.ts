import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import {DeepmindSvgComponent} from './components/deepmind-svg/deepmind-svg.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [NavigationComponent, DeepmindSvgComponent, LoadingComponent, ErrorComponent],
  imports: [FormsModule, ReactiveFormsModule, RouterModule, MaterialModule, CommonModule, FlexLayoutModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, MaterialModule, NavigationComponent,
    DeepmindSvgComponent, LoadingComponent, FlexLayoutModule, ErrorComponent],
})
export class SharedModule {}
