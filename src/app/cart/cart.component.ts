import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartIndexModel } from '../core/models/cart/cart-index.model';
import { CartProductIndexModel } from '../core/models/cart/cart-product-index.model';
import { ToastService } from '../shared/services/toast.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!: CartIndexModel;
  cartSubscription: Subscription = new Subscription;
  baseUrl: String = environment.baseUrl;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(data => {
      this.cart = data;
    });
  }

  navigateToCatalog() {
    this.router.navigate(['']);
  }

  updateProduct(operation: string, product: CartProductIndexModel) {
    this.cartService.updateProduct(operation, product);
  }

  confirmPayement() {
    this.cartService.confirmPayement();
  }

}
