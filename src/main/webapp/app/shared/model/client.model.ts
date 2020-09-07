export interface IClient {
  id?: number;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  age?: number;
  phone?: string;
  email?: string;
  photoContentType?: string;
  photo?: any;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public lastName?: string,
    public firstName?: string,
    public middleName?: string,
    public age?: number,
    public phone?: string,
    public email?: string,
    public photoContentType?: string,
    public photo?: any
  ) {}
}
