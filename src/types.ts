export interface InsertItem {
  title: string;
  price: number;
  location: string;
  image_url: string;
  link: string;
}

export interface SearchParams {
  query: string;
  location: string;
  radius: number;
  minPrice: number;
  pageCount: number;
}