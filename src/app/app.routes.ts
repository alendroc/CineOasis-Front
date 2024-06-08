import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { CombosComponent } from './components/home/combos/combos.component';
import { IndexComponent } from './components/home/index/index.component';

export const routes: Routes = [
    {path:'',component: HomeComponent, children:[
        {path:'',component:IndexComponent},
       {path:'combos',component:CombosComponent}]
    }
];
