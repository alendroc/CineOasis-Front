import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { CombosComponent } from './components/home/combos/combos.component';
import { IndexComponent } from './components/home/index/index.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { UsuarioAdministracionComponent } from './components/home/usuario-administracion/usuario-administracion.component';
import { ComidaAdministracionComponent } from './components/home/comida-administracion/comida-administracion.component';

export const routes: Routes = [
    {path:'',component: HomeComponent, children:[
        {path:'',component:IndexComponent},
        {path:'combos',component:CombosComponent},
<<<<<<< HEAD
        {path:'peliculas/:id', component:PeliculaComponent},
        {path:'usuarioAdministracion', component:UsuarioAdministracionComponent}]
=======
        {path:'peliculas', component:PeliculaComponent},
        {path:'usuarioAdministracion', component:UsuarioAdministracionComponent},
        {path:'comidaAdministracion',component:ComidaAdministracionComponent}]
>>>>>>> 42b3a5e2d7b167d2734edea6e4672890a8acbc07
       
    }
];
