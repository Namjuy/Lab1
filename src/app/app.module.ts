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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './components/login-component/header/header.component';
import { FooterComponent } from './components/login-component/footer/footer.component';
import { CarouselComponent } from './components/login-component/carousel/carousel.component';
import { HomeDropdownComponent } from './components/home-component/home-dropdown/home-dropdown.component';
import { HomeFilterComponent } from './components/home-component/home-filter/home-filter.component';
import { UserListComponent } from './components/home-component/user-list/user-list.component';
import { UserFilterComponent } from './components/home-component/user-filter/user-filter.component';
import { PaginationComponent } from './components/home-component/pagination/pagination.component';
import { UserModalComponent } from './components/home-component/user-modal/user-modal.component';
import { ToastComponentComponent } from './components/home-component/toast-component/toast-component.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
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
    ToastComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
