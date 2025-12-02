// 1. Interface สำหรับรีวิว (Review)
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// 2. Interface สำหรับขนาด (Dimensions)
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// 3. Interface สำหรับ Meta data
export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// 4. Interface หลักของ "ตัวสินค้า" (Product)
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string; // ใส่ ? เพราะให้รองรับ nullable
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

// 5. Interface สำหรับ "Response ทั้งหมดจาก API" (Root Object)
export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}