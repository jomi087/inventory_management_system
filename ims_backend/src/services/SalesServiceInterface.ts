import { CreateSaleBody } from "../validation/sale/createSaleSchema";

export interface ISalesService {
    createSale(paylaod: CreateSaleBody): Promise<void>;
}