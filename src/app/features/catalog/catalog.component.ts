import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { CategoryIndexModel } from './category/models/category-index.model';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CategoryComponent,
    CommonModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

  categories: CategoryIndexModel[] = [];

  constructor (
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories(true).subscribe(data => this.categories = data);
  }

}
