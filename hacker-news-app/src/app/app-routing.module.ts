import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsContentContainerComponent } from './news-content-container/news-content-container.component';

const routes: Routes = [
  { path: '', component: NewsContentContainerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
