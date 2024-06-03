import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Map<number, number> = new Map();

  constructor(
    private localStorage: LocalStorageService,
    private productService: ProductService
  ) {
    // check localstorage for available cart
    const storedCart = this.localStorage.retrieve('cart');
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }

    this.saveCartToLocalStorage();
  }

  // save cart to localstorage
  private saveCartToLocalStorage(): void {
    this.localStorage.store(
      'cart',
      JSON.stringify(Array.from(this.cart.entries()))
    );
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }
}
