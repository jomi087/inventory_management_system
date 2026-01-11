export interface ItemFilter {
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    $or?: {
        name?: { $regex: string; $options: string };
        description?: { $regex: string; $options: string };
    }[];
}

export interface ItemResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface GetItemsResult {
    items: ItemResponse[];
    total: number;
}

export interface ItemReportResult extends GetItemsResult {
    lowStockCount: number;
    outOfStockCount: number;
    totalInventoryValue: number;
}
