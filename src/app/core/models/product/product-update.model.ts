export interface ProductUpdateModel {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
}