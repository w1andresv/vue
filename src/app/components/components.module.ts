import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormSharedModule } from '../form-components/form-components.module';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';


@NgModule( {
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFountComponent,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormSharedModule,
    WidgetsModule,
    BreadcrumbModule
  ]
} )
export class ComponentsModule {
}
