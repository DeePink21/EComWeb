import { Product } from '../../models/product';

// order DTO
export interface OrderDto {
  user_id: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  total_money: number;
  payment_method: string;
  shipping_method: string;
  coupon_code: string;
  cart_items: OrderItem[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
}
