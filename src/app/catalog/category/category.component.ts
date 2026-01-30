import { Component, Input } from '@angular/core';
import { CategoryIndexModel } from 'src/app/core/models/category/category-index.model';
import { CategoryUpdateModel } from 'src/app/core/models/category/category-update.model';
import { AdminModalService } from 'src/app/core/services/admin-modal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Input() categories!: CategoryIndexModel[];
  @Input() adminMode: boolean = false;

  constructor(
    private adminService: AdminModalService
  ) { }

  openModal(category: CategoryUpdateModel) {
    this.adminService.openCategoryUpdateModal(category);
  }
  
}
