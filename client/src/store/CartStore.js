import { makeAutoObservable } from "mobx";
import { deleteDeviceFromCart, addDeviceToCart } from '../services/deviceAPI';

export class CartStore {
    constructor() {
        this._totalPrice = 0;
        this._cart = [];
        this._keyName = 'cart';
        makeAutoObservable(this);
    }

    get cart() {
        return this._cart;
    }

    setCart(cart) {
        this._cart = cart;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    setTotalPrice(totalPrice) {
        this._totalPrice = totalPrice;
    }

    getProduct() {
        const productsLocalStorage = localStorage.getItem(this._keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        } else {
            return [];
        }
    }

    putProduct(id) {
        let ItemsCart = this.getProduct();
        let pushProduct = false;
        const index = ItemsCart.findIndex((item) => Number(item.id) === Number(id.id));

        if (index === -1) {
            ItemsCart.push(id);
            pushProduct = true;
            this._totalPrice += Number(id.price);
            this.setCart(ItemsCart);
        } else {
            ItemsCart.splice(index, 1);
            this._totalPrice -= Number(id.price);
            this.setCart(ItemsCart);
        }

        localStorage.setItem(this._keyName, JSON.stringify(ItemsCart));

        return { pushProduct, ItemsCart }
    }

    setBasket(item, isAuth = false) {
        const checkDeviceInBasket = this._cart.findIndex(device => device.id === item.id);
        if (checkDeviceInBasket < 0) {
            this._cart = [...this._cart, { count: 1, ...item }];
            let totalPrice = 0;
            this._cart.forEach(device => totalPrice += Number(device.price * device.count));
            this._totalPrice = totalPrice;
        }
    }

    async deleteDeviceInCart(deviceItem, isAuth = false) {
        if (isAuth) {
            await deleteDeviceFromCart(deviceItem.id).then(() => {
                this._cart = this._cart.filter(item => item.id !== deviceItem.id);
                this._totalPrice -= deviceItem.price;
            });
        } else {
            this._cart = this._cart.filter(item => item.id !== deviceItem.id);
            this._totalPrice -= deviceItem.price;

            localStorage.setItem('totalPrice', this._totalPrice);
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }
}