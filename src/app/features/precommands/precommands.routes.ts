import { Routes } from '@angular/router';
import { PrecommandLayoutComponent } from './precommand-layout/precommand-layout.component';
import { PrecommandsComponent } from './precommands.component';
import { PrecommandDetailComponent } from './precommand-detail/precommand-detail.component';

export const PRECOMMANDS_ROUTES: Routes = [
  {
    path: '',
    component: PrecommandLayoutComponent,
    children: [
      {
        path: '',
        component: PrecommandsComponent
      },
      {
        path: ':id',
        component: PrecommandDetailComponent
      }
    ]
  }
];
