import { CartProductIndexModel } from "./cart-product-index.model";

export interface CartIndexModel {
    orders: CartProductIndexModel[],
    total: number
}