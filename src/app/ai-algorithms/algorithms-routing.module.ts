import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmsComponent} from './components/algorithms/algorithms.component';
import {AlgorithmDetailComponent} from './components/algorithm-detail/algorithm-detail.component';
import {AlgorithmComparisonComponent} from './components/algorithm-comparison/algorithm-comparison.component';

const routes: Routes = [
  { path: '', component: AlgorithmsComponent},
  { path: 'detail/:id', component: AlgorithmDetailComponent },
  { path: 'algorithm-comparison', component: AlgorithmComparisonComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlgorithmsRoutingModule {}
