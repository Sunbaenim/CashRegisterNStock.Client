import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryComponent } from './catalog/category/category.component';
import { ProductComponent } from './catalog/category/product/product.component';
import { AdminModalComponent } from './catalog/admin-modal/admin-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryUpdateFormComponent } from './catalog/admin-modal/category-update-form/category-update-form.component';
import { ProductUpdateFormComponent } from './catalog/admin-modal/product-update-form/product-update-form.component';
import { AddingFormComponent } from './catalog/admin-modal/adding-form/adding-form.component';
import { CartComponent } from './cart/cart.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ResizeToFitDirective } from './core/directive/resize-to-fit.directive';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CategoryComponent,
    ProductComponent,
    AdminModalComponent,
    CategoryUpdateFormComponent,
    ProductUpdateFormComponent,
    AddingFormComponent,
    CartComponent,
    ToastComponent,
    ResizeToFitDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
