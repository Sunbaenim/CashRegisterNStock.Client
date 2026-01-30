import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryUpdateModel } from 'src/app/core/models/category/category-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AdminModalComponent } from '../admin-modal.component';

@Component({
  selector: 'app-category-update-form',
  templateUrl: './category-update-form.component.html',
  styleUrls: ['./category-update-form.component.scss']
})
export class CategoryUpdateFormComponent implements OnInit {

  @Input() category!: CategoryUpdateModel;

  categoryUpdateFormGroup: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private adminModal: AdminModalService,
    private toastService: ToastService,
    private adminModalComponent: AdminModalComponent
  ) { }

  ngOnInit(): void {
    this.loadCategoryUpdateFormGroup();
  }

  loadCategoryUpdateFormGroup(): void {
    this.categoryUpdateFormGroup = this.formBuilder.group({
      name: [this.category.name, [Validators.required, Validators.maxLength(30)]]
    });
  }

  markCategoryFieldAsTouched() {
    this.categoryUpdateFormGroup.get('name')?.markAsTouched();
  }

  onSubmitCategoryUpdate() {
    this.markCategoryFieldAsTouched();
    if (this.categoryUpdateFormGroup.valid) {
      this.categoryService.updateCategory(this.category.id, this.categoryUpdateFormGroup.value)
        .subscribe(
          () => {
            this.adminModalComponent.category = undefined;
            this.toastService.showSuccessToast('La catégorie a été mise à jour.');
            this.adminModal.catalogUpdate()
            this.adminModal.closeModal();
          },
          () => this.toastService.showErrorToast()
        );
    }
  }
  
}
