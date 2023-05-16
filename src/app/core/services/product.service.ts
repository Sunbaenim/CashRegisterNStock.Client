import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductIndexModel } from '../models/product/product-index.model';
import { ProductUpdateModel } from '../models/product/product-update.model';
import { ProductAddModel } from '../models/product/product-add.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = environment.apiUrl + 'product/';
  
  constructor(
    private client: HttpClient
  ) { }

  getProducts(): Observable<ProductIndexModel[]> {
    return this.client.get<ProductIndexModel[]>(this.productUrl);
  }

  getProduct(id: number): Observable<ProductIndexModel> {
    return this.client.get<ProductIndexModel>(this.productUrl + id);
  }

  updateProduct(id: number, product: ProductUpdateModel) {
    return this.client.put<ProductUpdateModel>(this.productUrl + id, product);
  }

  createProduct(product: ProductAddModel) {
    return this.client.post<ProductAddModel>(this.productUrl, product);
  }

  deleteProduct(id: number) {
    console.log(this.productUrl + id);
    return this.client.delete(this.productUrl + id);
  }
  
}
