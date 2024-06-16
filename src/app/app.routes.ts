import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { CombosComponent } from './components/home/combos/combos.component';
import { IndexComponent } from './components/home/index/index.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { UsuarioAdministracionComponent } from './components/home/usuario-administracion/usuario-administracion.component';
import { PeliculaAdministracionComponent } from './components/home/pelicula-administracion/pelicula-administracion.component';

export const routes: Routes = [
    {path:'',component: HomeComponent, children:[
        {path:'',component:IndexComponent},
        {path:'combos',component:CombosComponent},
        {path:'peliculas', component:PeliculaComponent},
        {path:'usuarioAdministracion', component:UsuarioAdministracionComponent},
        {path:'peliculaAdministracion', component:PeliculaAdministracionComponent}]
       
    }
];
