import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomePageComponent } from './calculator/pages/home-page/home-page.component';
import { NotFoundComponent } from './calculator/pages/not-found/not-found.component';

import { PrincipalLayoutComponent } from './shared/layouts/principal-layout.component';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DiscountComponent } from './shared/components/discount/discount.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundComponent,
    PrincipalLayoutComponent,
    DiscountComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  providers: [
    NgxBootstrapExpandedFeaturesService,
    provideAnimationsAsync(),
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  exports: [DiscountComponent],
})
export class AppModule {}
