import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CategoryIndexModel } from '../../features/catalog/category/models/category-index.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string = environment.apiUrl + 'category/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(includeProducts: boolean = false): Observable<CategoryIndexModel[]> {    
    return this.httpClient.get<CategoryIndexModel[]>(this.categoryUrl + '?includeProducts=' + includeProducts);
  }

}
