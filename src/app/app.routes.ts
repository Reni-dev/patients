import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Patient } from './patient/patient';
import { Visit } from './visit/visit';
import { Navbar } from './navbar/navbar';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "home", component: Home},
    {path: "about", component: About},
    {path: "patient", component: Patient},
    {path: "visit", component: Visit},
    {path: "navbar", component: Navbar},
];
