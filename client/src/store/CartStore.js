import { makeAutoObservable } from "mobx";

export class CartStore {
    constructor() {
        this._cart = [];
        this._totalPrice = 0;
        makeAutoObservable(this);
    }

    setCart(cart) {
        this._cart = cart;
    }

    setPrice(price) {
        this._price = price;
    }

    get cart() {
        return this._cart;
    }

    get price() {
        return this._totalPrice;
    }
}