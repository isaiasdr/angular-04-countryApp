import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( module => module.CountriesModule )
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
