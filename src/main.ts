import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(DetailProductComponent, appConfig)
  .catch((err) => console.error(err));
