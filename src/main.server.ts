import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { HomeComponent } from './app/components/home/home.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';

const bootstrap = () => bootstrapApplication(DetailProductComponent, config);

export default bootstrap;
