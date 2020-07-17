import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsContentContainerComponent } from './news-content-container/news-content-container.component';

const routes: Routes = [
  { path: 'hacker-news', component: NewsContentContainerComponent },
  { path: '', redirectTo: 'hacker-news', pathMatch: 'full' },
  { path: '**', redirectTo: 'hacker-news', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
