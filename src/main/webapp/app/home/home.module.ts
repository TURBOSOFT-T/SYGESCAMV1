import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sygescamv1SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Sygescamv1SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class Sygescamv1HomeModule {}
