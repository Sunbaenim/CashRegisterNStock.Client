import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryIndexModel } from 'src/app/core/models/category/category-index.model';
import { ProductUpdateModel } from 'src/app/core/models/product/product-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.scss']
})
export class AddingFormComponent {
  
  productAddFormGroup: FormGroup = this.formBuilder.group({});
  categoryAddFormGroup: FormGroup = this.formBuilder.group({});
  categories!: CategoryIndexModel[];
  imageBase64!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private adminModal: AdminModalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.loadProductAddFormGroup();
    this.loadCategoryAddFormGroup();
  }

  loadProductAddFormGroup() {
    this.productAddFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.maxLength(15)]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(999.99)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]]
    });
  }

  loadCategoryAddFormGroup() {
    this.categoryAddFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  loadFile(event: any) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (() => {
      this.imageBase64 = fileReader.result as string;
    });
  }

  markAllProductFieldsAsTouched() {
    Object.keys(this.productAddFormGroup.controls).forEach(field => {
      const control = this.productAddFormGroup.get(field);
      control?.markAsTouched();
    });
  }

  onSubmitProductAdd() {
    this.markAllProductFieldsAsTouched();
    if (this.productAddFormGroup.valid) {
      const product: ProductUpdateModel = {...this.productAddFormGroup.value, imageUrl: this.imageBase64};
      this.productService.createProduct(product).subscribe(
        () => {
          this.toastService.showSuccessToast('Le produit a été ajouté.');
          this.adminModal.catalogUpdate();
          this.adminModal.closeModal();
        },
        () => this.toastService.showErrorToast()
      );
    }
  }

  markCategoryFieldAsTouched() {
    this.categoryAddFormGroup.get('name')?.markAsTouched();
  }
  
  onSubmitCategoryAdd() {
    this.markCategoryFieldAsTouched();
    if (this.categoryAddFormGroup.valid) {
      this.categoryService.createCategory(this.categoryAddFormGroup.value)
      .subscribe(
        () => {
          this.toastService.showSuccessToast('La catégorie a été ajoutée.');
          this.adminModal.catalogUpdate();
          this.adminModal.closeModal();
        },
        () => this.toastService.showErrorToast()
      );
    }
  }

}
