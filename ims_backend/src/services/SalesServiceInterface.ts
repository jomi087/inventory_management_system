import { CreateSaleBody } from "../validation/sale/createSaleSchema";

export interface SalesServiceInterface {
    createSale(paylaod: CreateSaleBody): Promise<void>;
}