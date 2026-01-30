import { ProductOrderAddModel } from "../product-order/product-order-add.model";

export interface OrderAddModel {
    productOrders: ProductOrderAddModel[],
    total: number
}