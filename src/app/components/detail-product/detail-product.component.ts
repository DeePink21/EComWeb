import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product, ProductImage } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { env } from '../../environments/environment';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  imports: [HeaderComponent, FooterComponent, CarouselModule, CommonModule, FormsModule  ],
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  imageBaseUrl = `${env.apiBaseUrl}/products/images/`;
  quantity: number = 1;
  constructor(
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // get product id from url
    // const idParam = this.route.snapshot.paramMap.get('id');
    // const idParam = this.route.snapshot.params['id'];
    // temporarily hardcoded product id
    const idParam = 5;
    if (idParam !== null) {
      this.productId = +idParam;
    }
    // get product detail
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: Product) => {
          // get product images and change url
          // debugger;
          // if (response.product_images && response.product_images.length > 0) {
          //   response.product_images.forEach((image: ProductImage) => {
          //     image.image_url = this.imageBaseUrl + image.image_url;
          //   });
          //   console.log(response.product_images);
          // }
          this.product = response;
          console.log(response);
          this.showImage(0);
        },
        complete() {
          // debugger;
        },
        error: (error: any) => {
          // debugger;
          console.log('Error fetching product: ', error);
        },
      });
    } else {
      // this.route.navigate(['/']);
      console.log('Invalid product id: ', this.productId);
    }
    // debugger;
  }
  showImage(index: number) {
    // debugger;
    if (
      this.product &&
      this.product.product_images &&
      this.product.product_images.length > 0
    ) {
      // validate index range
      if (index < 0) {
        index = this.product.product_images.length - 1;
      } else if (index >= this.product.product_images.length) {
        index = 0;
      }
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    this.showImage(index);
  }
  previousImage() {
    this.showImage(this.currentImageIndex - 1);
  }
  nextImage() {
    this.showImage(this.currentImageIndex + 1);
  }

  // cart stuff
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      console.error('Invalid product id: ', this.productId);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {

  }

}
