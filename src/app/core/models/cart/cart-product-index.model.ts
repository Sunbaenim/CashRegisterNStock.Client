import { ProductIndexModel } from "../product/product-index.model";

export interface CartProductIndexModel {
    product: ProductIndexModel,
    quantity: number
}