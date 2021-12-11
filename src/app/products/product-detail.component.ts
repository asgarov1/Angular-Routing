import {Component, OnDestroy, OnInit} from '@angular/core';

import {Product} from './product';
import {ProductService} from './product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id + ' destroyed');
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id + ' initialized');
    this.getProduct(id);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
