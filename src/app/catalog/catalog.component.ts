import { AfterViewInit, Component } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { CategoryIndexModel } from '../core/models/category/category-index.model';
import { AdminModalService } from '../core/services/admin-modal.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit {
  
  categories!: CategoryIndexModel[];
  adminMode: boolean = false;

  constructor(
    private cService: CategoryService,
    private adminService: AdminModalService,
    private adminModal: AdminModalService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.initCatalog();
    this.adminModal.catalogUpdated.subscribe(() => this.initCatalog());
  }
  
  initCatalog() {
    this.cService.getCategories(true).subscribe(data => this.categories = data);
  }

  toggleAdmin() {
    this.adminMode = !this.adminMode;
  }

  openModal() {
    this.adminService.openAddingModal();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
  
}
