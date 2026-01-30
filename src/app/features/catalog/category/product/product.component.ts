import { Component, Input } from '@angular/core';
import { ProductIndexModel } from './models/product-index.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { ReduceProductFontSizeDirective } from '../../../../core/directives/reduce-product-font-size';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ReduceProductFontSizeDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    
  baseUrl: string = environment.baseUrl;
  
  @Input() product!: ProductIndexModel;

}
