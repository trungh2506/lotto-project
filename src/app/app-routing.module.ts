import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LottoTicketsComponent } from './lotto-tickets/lotto-tickets.component';
import { LottoComponent } from './lotto/lotto.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'lotto',
    component: LottoComponent,
  },
  {
    path: 'lotto-tickets',
    component: LottoTicketsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
