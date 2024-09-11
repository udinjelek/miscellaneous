import { Routes } from '@angular/router';
import { TestSatNusapersadaComponent } from './pages/test-sat-nusapersada/test-sat-nusapersada.component';
import { TestComponent } from './pages/test/test.component';
import { FrontComponent } from './pages/front/front.component';
import { title } from 'process';

export const routes: Routes = [
    {   path:'pr',
        component:TestSatNusapersadaComponent,
        data:{title: 'Test Sat Nusapersada'}
    },
    {   path:'test',
        component:TestComponent,
        data:{title: 'Test'}
    },
    {   path:'front',
        component:FrontComponent,
        data:{title: 'Front'}
    }
];
