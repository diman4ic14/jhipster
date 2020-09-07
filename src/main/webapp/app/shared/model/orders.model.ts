import { IClient } from '@/shared/model/client.model';
import { IProduct } from '@/shared/model/product.model';

export interface IOrders {
  id?: number;
  date?: Date;
  amount?: number;
  client?: IClient;
  product?: IProduct;
}

export class Orders implements IOrders {
  constructor(public id?: number, public date?: Date, public amount?: number, public client?: IClient, public product?: IProduct) {}
}
