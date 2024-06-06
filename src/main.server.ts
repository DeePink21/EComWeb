import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { HomeComponent } from './app/components/home/home.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';

const bootstrap = () => bootstrapApplication(OrderConfirmComponent, config);

export default bootstrap;
