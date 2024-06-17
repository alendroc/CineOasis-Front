import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { CombosComponent } from './components/home/combos/combos.component';
import { IndexComponent } from './components/home/index/index.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { UsuarioAdministracionComponent } from './components/home/usuario-administracion/usuario-administracion.component';
import { PeliculaAdministracionComponent } from './components/home/pelicula-administracion/pelicula-administracion.component';
import { ComidaAdministracionComponent } from './components/home/comida-administracion/comida-administracion.component';
import { AsientosComponent } from './components/home/asientos/asientos.component';
import { FuncionAdministracionComponent } from './components/home/funcion-administracion/funcion-administracion.component';

export const routes: Routes = [
    {path:'',component: HomeComponent, children:[
        {path:'',component:IndexComponent},
        {path:'combos',component:CombosComponent},
        {path:'peliculas/:id', component:PeliculaComponent},
        {path:'usuarioAdministracion', component:UsuarioAdministracionComponent},
        {path:'comidaAdministracion',component:ComidaAdministracionComponent},
        {path:'asientos/:id',component:AsientosComponent},
        {path:'comidaAdministracion',component:ComidaAdministracionComponent},
        {path:'peliculaAdministracion', component:PeliculaAdministracionComponent},
        {path:'comidaAdministracion',component:ComidaAdministracionComponent},
        {path:'asientos/:id',component:AsientosComponent},
        {path:'funcionAdministracion', component:FuncionAdministracionComponent},
        {path:'asientos/:id',component:AsientosComponent}]

    }
];
