import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { AlgorithmComparisonComponent } from './components/algorithm-comparison/algorithm-comparison.component';
import { AlgorithmsRoutingModule} from './algorithms-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { AlgorithmDetailComponent } from './components/algorithm-detail/algorithm-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [AlgorithmsComponent, AlgorithmDetailComponent, AlgorithmComparisonComponent],
  exports: [
    AlgorithmsComponent,
    AlgorithmDetailComponent,
    AlgorithmComparisonComponent
  ],
  imports: [
    CommonModule,
    AlgorithmsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxChartsModule,
    SharedModule
  ]
})
export class AiAlgorithmsModule { }
