import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestAComponent } from './test/test-a/test-a.component';
import { TestBComponent } from './test/test-b/test-b.component';

const routes: Routes = [
  {path: 'test', children: [
    {path: 'a', component: TestAComponent},
    {path: 'b', component: TestBComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
