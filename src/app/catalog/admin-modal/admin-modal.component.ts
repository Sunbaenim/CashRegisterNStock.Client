import { Component, OnInit } from '@angular/core';
import { CategoryUpdateModel } from 'src/app/core/models/category/category-update.model';
import { ProductUpdateModel } from 'src/app/core/models/product/product-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit {

  product: ProductUpdateModel | undefined;
  category: CategoryUpdateModel | undefined;
  isAdding: boolean = false;

  constructor(
    public adminService: AdminModalService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastService: ToastService,
    private cartService: CartService
  ) { }
  
  ngOnInit(): void {
    this.adminService.isAdding$.subscribe((isAdding: boolean) => {
      this.isAdding = isAdding;
    });
    this.adminService.category$.subscribe((category: CategoryUpdateModel) => {
      this.category = category;
    });
    this.adminService.product$.subscribe((product: ProductUpdateModel) => {
      this.product = product;
    });
  }

  deleteFn() {
    this.product && this.productService.deleteProduct(this.product.id)
      .subscribe(
        () => {
          if (this.cartService.cart$.getValue().orders.find(o => o.product.id === this.product?.id)) {
            const cart = this.cartService.cart$.getValue();
            const index = cart.orders.findIndex(o => o.product.id === this.product?.id);
            cart.total -= cart.orders[index].product.price * cart.orders[index].quantity;
            cart.orders.splice(index, 1);
            this.cartService.cart$.next(cart);
          }
          this.product = undefined;
          this.toastService.showSuccessToast('Le produit a été supprimé.');
          this.adminService.catalogUpdate();
          this.adminService.closeModal();
        },
        () => this.toastService.showErrorToast()
      );
    this.category && this.categoryService.deleteCategory(this.category.id)
      .subscribe(
        () => {
          this.category = undefined;
          this.toastService.showSuccessToast('La catégorie a été supprimée.');
          this.adminService.catalogUpdate();
          this.adminService.closeModal();
        },
        () => this.toastService.showErrorToast()
      );
  }
  
  closeModal() {
    this.product = undefined;
    this.category = undefined;
    this.adminService.closeModal();
  }

}
