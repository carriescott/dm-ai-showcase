import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ai-algorithms' },
  { path: 'ai-algorithms',
    loadChildren: () => import ('./ai-algorithms/ai-algorithms.module').then(m => m.AiAlgorithmsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
