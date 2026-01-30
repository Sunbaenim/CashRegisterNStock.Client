import { Component, Input, OnInit } from '@angular/core';
import { CartProductIndexModel } from 'src/app/core/models/cart/cart-product-index.model';
import { ProductIndexModel } from 'src/app/core/models/product/product-index.model';
import { ProductUpdateModel } from 'src/app/core/models/product/product-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() products!: ProductIndexModel[];
  @Input() adminMode: Boolean = false;
  baseUrl: string = environment.baseUrl;
  orders!: CartProductIndexModel[];

  constructor(
    private adminService: AdminModalService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.orders = this.cartService.cart$.getValue().orders;
  }
  
  openModal(product: ProductUpdateModel) {
    this.adminService.openProductUpdateModal(product);
  }

  addToCart(product: ProductIndexModel) {
    const productToAdd: CartProductIndexModel = {
      product: product,
      quantity: 1
    }
    this.cartService.addProduct(productToAdd);
  }
  
  getQuantity(product: ProductIndexModel): number {
    let quantity: number = 0;
    if (this.orders) {
      quantity = this.orders.find(o => o.product.id === product.id)?.quantity ?? 0;
    }
    return quantity;
  }

}
