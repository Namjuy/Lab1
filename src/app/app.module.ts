import { VehicleMonitoringComponent } from './pages/vehicle-monitoring/vehicle-monitoring.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/login-component/footer/footer.component';
import { CarouselComponent } from './components/login-component/carousel/carousel.component';
import { HomeDropdownComponent } from './components/home-component/home-dropdown/home-dropdown.component';
import { HomeFilterComponent } from './components/home-component/home-filter/home-filter.component';
import { UserListComponent } from './components/home-component/user-list/user-list.component';
import { UserFilterComponent } from './components/home-component/user-filter/user-filter.component';
import { PaginationComponent } from './components/home-component/pagination/pagination.component';
import { UserModalComponent } from './components/home-component/user-modal/user-modal.component';
import { ToastComponent } from './components/common/toast/toast.component';
import { ChangePasswordModalComponent } from './components/home-component/change-password-modal/change-password-modal.component';
import { ConfirmDialogComponent } from './components/home-component/confirm-dialog/confirm-dialog.component';
import { MapComponent } from './components/vehicle-monitor/map/map.component';
import { VehicleInformationComponent } from './components/vehicle-monitor/vehicle-information/vehicle-information.component';
import {
  HashLocationStrategy,
  LocationStrategy,
  CommonModule,
  DatePipe,
} from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'vehicle-monitor', component: VehicleMonitoringComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    HomeDropdownComponent,
    HomeFilterComponent,
    UserListComponent,
    UserFilterComponent,
    PaginationComponent,
    UserModalComponent,
    ToastComponent,
    ChangePasswordModalComponent,
    ConfirmDialogComponent,
    VehicleMonitoringComponent,
    MapComponent,
    VehicleInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    ),
    BrowserAnimationsModule,
    MatFormFieldModule,

    MatNativeDateModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
