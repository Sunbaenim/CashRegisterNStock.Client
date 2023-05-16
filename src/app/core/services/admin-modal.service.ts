import { EventEmitter, Injectable } from '@angular/core';
import { ProductUpdateModel } from '../models/product/product-update.model';
import { CategoryUpdateModel } from '../models/category/category-update.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {

  catalogUpdated: EventEmitter<void> = new EventEmitter();
  isModalVisible: boolean = false;
  category$: Subject<CategoryUpdateModel> = new Subject<CategoryUpdateModel>();
  product$: Subject<ProductUpdateModel> = new Subject<ProductUpdateModel>();
  isAdding$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  openProductUpdateModal(product: ProductUpdateModel) {
    this.isModalVisible = true;
    this.product$.next(product);
  }

  openCategoryUpdateModal(category: CategoryUpdateModel) {
    this.isModalVisible = true;
    this.category$.next(category);
  }

  openAddingModal() {
    this.isModalVisible = true;
    this.isAdding$.next(true);
  }

  closeModal() {
    this.isModalVisible = false;
    this.isAdding$.next(false);
  }
  
  catalogUpdate() {
    this.catalogUpdated.emit();
  }
}
