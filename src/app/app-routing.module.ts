import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {SetupComponent} from './component/setup/setup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {path: '', component: MainComponent},
        {path: 'setup', component: SetupComponent}
      ]
    )
  ]
})
export class AppRoutingModule { }
