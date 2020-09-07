import { ICategory } from '@/shared/model/category.model';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  photoContentType?: string;
  photo?: any;
  categories?: ICategory[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public photoContentType?: string,
    public photo?: any,
    public categories?: ICategory[]
  ) {}
}
