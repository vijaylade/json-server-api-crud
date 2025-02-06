import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
    },
    {
        path: 'table',
        component: TableComponent
    }
];
