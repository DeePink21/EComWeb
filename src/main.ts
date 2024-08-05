import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { importProvidersFrom } from '@angular/core';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';

bootstrapApplication(OrderConfirmComponent, appConfig)
  .catch((err) => console.error(err));
