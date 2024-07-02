import { Routes } from '@angular/router';
import { TestSatNusapersadaComponent } from './pages/test-sat-nusapersada/test-sat-nusapersada.component';
import { title } from 'process';

export const routes: Routes = [
    {   path:'',
        component:TestSatNusapersadaComponent,
        data:{title: 'Test Sat Nusapersada'}
    }
];
