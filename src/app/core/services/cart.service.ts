import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartIndexModel } from '../models/cart/cart-index.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderAddModel } from '../models/order/order-add.model';
import { ProductOrderAddModel } from '../models/product-order/product-order-add.model';
import { CartProductIndexModel } from '../models/cart/cart-product-index.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private orderUrl: string = environment.apiUrl + 'order/';

  cart$: BehaviorSubject<CartIndexModel> = new BehaviorSubject<CartIndexModel>({orders: [], total: 0});

  constructor(
    private client: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) { }

  addProduct(product: CartProductIndexModel) {
    const currentCart: CartIndexModel = this.cart$.getValue();
    const foundProduct = currentCart.orders.find(p => p.product.id === product.product.id);
    if (foundProduct) {
      if (foundProduct.quantity < foundProduct.product.stock) {
        foundProduct.quantity += 1;
      } else {
        this.toastService.showErrorToast(`Le stock de ${foundProduct.product.name} est limité à ${foundProduct.product.stock}.`);
      }
    } else {
      currentCart.orders.push(product);
    }
    currentCart.total = this.calculateTotal();
    this.cart$.next(currentCart);
  }

  updateProduct(operation: string, order: CartProductIndexModel) {
    let currentCart = this.cart$.getValue();
    const productToUpdate = currentCart.orders.find(o => o.product.id === order.product.id);
    if (operation === '+') {
      productToUpdate!.quantity += 1;
    }
    if (operation === '-') {
      productToUpdate!.quantity -= 1;
      if (productToUpdate!.quantity === 0) {
        currentCart.orders = currentCart.orders.filter(o => o.product.id !== productToUpdate?.product.id);
      }
    }
    currentCart.total = this.calculateTotal();
    this.cart$.next(currentCart);
  }

  calculateTotal(): number {
    const currentCart = this.cart$.getValue();
    let total: number = 0;
    currentCart.orders.forEach(o => total += o.product.price * o.quantity);
    return total;
  }

  getCart() {
    return this.cart$ as Observable<CartIndexModel>;
  }

  mapCart(cart: CartIndexModel): OrderAddModel {
    const productOrders: ProductOrderAddModel[] = cart.orders.map(o => {
      return {
        productId: o.product.id,
        quantity: o.quantity
      };
    });
    const order: OrderAddModel = {
      productOrders: productOrders,
      total: cart.total
    };
    return order;
  }

  confirmPayement() {
    const order: OrderAddModel = this.mapCart(this.cart$.getValue());
    this.client.post<OrderAddModel>(this.orderUrl, order).subscribe(
      () => {
        this.router.navigate(['']);
        this.cart$.next({orders: [], total: 0});
        this.toastService.showSuccessToast('La commande a été validée.');
      },
      () => this.toastService.showErrorToast()
    );
  }
  
}
