import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { MensurationsComponent } from './pages/mensurations/mensurations.component';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
 {
   path: '',
   component: DashboardLayoutComponent,
   children: [
     { path: '', redirectTo: 'profil', pathMatch: 'full' },
     { path: 'profil', component: ProfilComponent },
     { path: 'mensurations', component: MensurationsComponent },
     { path: 'favoris', component: FavorisComponent },
     { path: 'commandes', component: CommandesComponent },
     { path: 'notifications', component: NotificationsComponent }
   ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
