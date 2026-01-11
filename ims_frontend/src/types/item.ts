export interface UpdateItemPayload {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
}

export interface CreateItemPayload {
  name: string;
  description: string;
  quantity: number;
  price: number;
}
