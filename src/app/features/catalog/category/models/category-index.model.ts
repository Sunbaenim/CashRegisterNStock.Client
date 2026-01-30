import { ProductIndexModel } from "../product/models/product-index.model";

export interface CategoryIndexModel {
    id: number;
    name: string;
    products: ProductIndexModel[];
}