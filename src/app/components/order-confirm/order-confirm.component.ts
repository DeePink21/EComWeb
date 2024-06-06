import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { env } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
})
export class OrderConfirmComponent implements OnInit {
  makePayment() {
    debugger
    console.log('cart items ', this.cartItems);
  }
  cartItems: { product: Product; quantity: number; }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  baseImageUrl = `${env.apiBaseUrl}/products/images/`;
  defaultUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvhgJA4wsFwlwNSSm23O8bfCBq7wLdq1WEQ&usqp=CAU`;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    // get cart items from localstorage
    const cart = this.cartService.get();
    const productIds = Array.from(cart.keys());
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        products.forEach((product: Product) => {
          this.totalAmount += product.price * cart.get(product.id)!;
          this.cartItems.push({
            product: product!,
            // quantity: cart.get(product.id)!,
            quantity: 2
          });
        })
      },
      error: (error) => {
        console.log('Error fetching products: ', error);
      },
      complete: () => {
        // console.log(this.cartItems);
      },
    });
  }

  totalPrice() {
    this.cartItems.forEach((item) => {
      this.totalAmount += item.product.price * item.quantity;
    });
  }

  applyCoupon(): void {
    this.totalAmount = this.totalAmount * 0.9;


  }
}
