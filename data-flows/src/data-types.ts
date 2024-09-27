export type User = {
  id: number;
  created_at: Date,
  updated_at: Date,
  name: string,
  title: string,
  age: number,
  email: string,
  telephone: string,
  gender: string,
  occupation: string,
  address: {
    street_number: number,
    street_name: string,
    city: string,
    state: string,
    postal_code: string,
  }
}

export type StagedUser = {
  id: number;
  created_at: Date,
  updated_at: Date,
  name: string,
  title: string,
  age: number,
  email: string,
  telephone: string,
}

export type Product = {
  "id": number,
  "name": string,
  "type": string,
  "price": number,
  "created_at": Date
}

export type StagedProduct = Pick<Product, 'id' | 'name' | 'type' | 'price' | 'created_at'>
export type Purchase = {
  "id": string,
  "product_id": number,
  "user_id": number,
  "created_at": Date,
  "updated_at": Date,
  "added_to_cart": Date,
  purchased_at?: Date
  returned_at?: Date
}
export type StagedPurchase = Omit<Purchase, ''>
