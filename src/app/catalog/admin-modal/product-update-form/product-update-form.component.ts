import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryIndexModel } from 'src/app/core/models/category/category-index.model';
import { ProductUpdateModel } from 'src/app/core/models/product/product-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { AdminModalComponent } from '../admin-modal.component';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss']
})
export class ProductUpdateFormComponent implements OnInit {

  @Input() product!: ProductUpdateModel;
  productUpdateFormGroup: FormGroup = this.formBuilder.group({});
  categories!: CategoryIndexModel[];
  imageUrl!: string;
  imageBase64!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private adminModal: AdminModalService,
    private toastService: ToastService,
    private adminModalComponent: AdminModalComponent
  ) { }

  ngOnInit(): void {
    this.imageUrl = environment.baseUrl + this.product.imageUrl;
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.loadproductUpdateFormGroup();
  }

  loadproductUpdateFormGroup() {
    this.productUpdateFormGroup = this.formBuilder.group({
      name: [this.product.name, [Validators.required, Validators.maxLength(15)]],
      description: [this.product.description, [Validators.required, Validators.maxLength(15)]],
      categoryId: [this.product.categoryId, [Validators.required]],
      price: [this.product.price, [Validators.required, Validators.min(0.01), Validators.max(999.99)]],
      stock: [this.product.stock, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  loadFile(event: any) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (() => {
      this.imageBase64 = fileReader.result as string;
      this.imageUrl = fileReader.result as string;
    });
  }

  markAllProductFieldsAsTouched() {
    Object.keys(this.productUpdateFormGroup.controls).forEach(field => {
      const control = this.productUpdateFormGroup.get(field);
      control?.markAsTouched();
    });
  }

  onSubmitProductUpdate() {
    this.markAllProductFieldsAsTouched();
    if (this.productUpdateFormGroup.valid) {
      const product: ProductUpdateModel = {...this.productUpdateFormGroup.value, imageUrl: this.imageBase64 ?? this.product.imageUrl};
      this.productService.updateProduct(this.product.id, product).subscribe(
        () => {
          this.adminModalComponent.product = undefined;
          this.toastService.showSuccessToast('Le produit a été mis à jour.');
          this.adminModal.catalogUpdate()
          this.adminModal.closeModal();
        },
        () => this.toastService.showErrorToast()
      );
    }
  }
  
}
