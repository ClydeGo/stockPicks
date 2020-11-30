import { stockPick } from './stock-pick';

export interface IUser {
    username: string,
    password: string
}

export class User implements IUser{
    public username: string = '';
    public password: string = '';
}