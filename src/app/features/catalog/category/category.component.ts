import { Component, Input, OnInit } from '@angular/core';
import { CategoryIndexModel } from './models/category-index.model';
import { ProductComponent } from "./product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  tilesPerRow: number = 5;
  test: number = (window.innerWidth - 32 - (8 * 4)) / this.tilesPerRow;

  @Input() category!: CategoryIndexModel;

}
