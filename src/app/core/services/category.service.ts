<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CategoryIndexModel } from '../../features/catalog/category/models/category-index.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryIndexModel } from '../models/category/category-index.model';
import { CategoryUpdateModel } from '../models/category/category-update.model';
import { CategoryAddModel } from '../models/category/category-add.model';
>>>>>>> d96b547fc4a65038883ca34c3a3f02f84241e581

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string = environment.apiUrl + 'category/';
<<<<<<< HEAD

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories(includeProducts: boolean = false): Observable<CategoryIndexModel[]> {    
    return this.httpClient.get<CategoryIndexModel[]>(this.categoryUrl + '?includeProducts=' + includeProducts);
=======
  private categories$: BehaviorSubject<CategoryIndexModel[]>;
  
  constructor(
    private client: HttpClient
  ) {
    this.categories$ = new BehaviorSubject<CategoryIndexModel[]>([]);
  }
  
  getCategories(includeProducts: boolean = false): Observable<CategoryIndexModel[]> {
    return this.client.get<CategoryIndexModel[]>(this.categoryUrl + '?includeProducts=' + includeProducts);
  }

  update() {
    this.getCategories(true).subscribe(data => {
      this.categories$.next(data);
    });
  }

  getCategory(id: number): Observable<CategoryIndexModel> {
    return this.client.get<CategoryIndexModel>(this.categoryUrl + id);
  }

  updateCategory(id: number, category: CategoryUpdateModel) {
    return this.client.put<CategoryUpdateModel>(this.categoryUrl + id, category);
  }

  createCategory(category: CategoryAddModel) {
    return this.client.post<CategoryAddModel>(this.categoryUrl, category);
  }

  deleteCategory(id: number) {
    return this.client.delete(this.categoryUrl + id);
>>>>>>> d96b547fc4a65038883ca34c3a3f02f84241e581
  }

}
