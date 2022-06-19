import { makeAutoObservable } from "mobx";
import { deleteDeviceFromCart, getDevicesFromCart, updateDevices } from '../services/deviceAPI';

export class CartStore {
    constructor() {
        this._totalPrice = 0;
        this._cart = [];
        this._keyName = 'cart';
        this._countElemInCart = 0;
        makeAutoObservable(this);
    }

    get cart() {
        return this._cart;
    }

    get countElemInCart() {
        return this._countElemInCart;
    }

    setCountElemInCart(countElemInCart) {
        this._countElemInCart = countElemInCart;
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

    async getCartData(isAuth = false) {
        if (isAuth) {
            await getDevicesFromCart().then(devices => this.setCart(devices));
        } else {
            this.setCart(this.getProduct());
            this.setTotalPrice(Number(localStorage.getItem('totalPrice')));
        }
    };

    async deleteDeviceInCart(deviceItem, isAuth = false) {
        if (isAuth) {
            await deleteDeviceFromCart(deviceItem.id).then(() => {
                this._cart = this._cart.filter(item => item.id !== deviceItem.id);
            });
        } else {
            this._cart = this._cart.filter(item => item.id !== deviceItem.id);
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
        this._totalPrice -= deviceItem.price * deviceItem.count;
        this._countElemInCart -= deviceItem.count;
        deviceItem.count = 1;
        const newItem = {
            ...deviceItem,
        }
        updateDevices(deviceItem.id, newItem)
        localStorage.setItem('totalPrice', this._totalPrice);
    }

    getCountDeviceInCart() {
        let array = 0;
        this.cart.map(item => {
            array += item.count;
        });
        this.setCountElemInCart(array);
    }
}

