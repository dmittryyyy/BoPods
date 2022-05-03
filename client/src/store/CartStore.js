import { makeAutoObservable } from "mobx";
import { deleteDeviceFromCart } from '../services/deviceAPI';

export default class CartStore {
    constructor() {
        this._totalPrice = 0;
        this._cart = [];
        makeAutoObservable(this);
    }

    async setDeleteItemCart(device, isAuth = false) {
        if (isAuth) {
            await deleteDeviceFromCart(device.id).then(() => {
                this._cart = this._cart.filter(item => item.id !== device.id);
                this._totalPrice -= device.price * device.count;
            });
        } else {
            this._cart = this._cart.filter(item => item.id !== device.id);
            this._totalPrice -= device.price * device.count;

            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setCart(item, isAuth = false) {
        const checkDeviceInCart = this._cart.findIndex(device => device.id === item.id);
        if (checkDeviceInCart < 0) {
            this._cart = [...this._cart, { count: 1, ...item }];
            let totalPrice = 0;
            this._cart.forEach(device => totalPrice += Number(device.price * device.count));
            this._totalPrice = totalPrice;
        }

        if (!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }
    }

    setDeleteAllDeviceFromCart() {
        this._totalPrice = 0;
        return this._cart = [];
    }

    setCountDevice(deviceId, action, isAuth = false) {
        const itemInd = this._cart.findIndex(item => item.id === deviceId);
        const itemInState = this._cart.find(device => device.id === deviceId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemInd), newItem, ...this._cart.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._cart = [...this._cart.slice(0, itemInd), newItem, ...this._cart.slice(itemInd + 1)]
        }

        if (!isAuth) {
            localStorage.setItem("cart", JSON.stringify(this._cart));
        }

        let totalPrice = 0;
        this._cart.forEach(device => totalPrice += Number(device.price * device.count));
        this._totalPrice = totalPrice;
    }

    resetCart() {
        this._cart = [];
        this._totalPrice = 0;
        localStorage.removeItem('cart');
    }


    get Cart() {
        return this._cart;
    }

    get Price() {
        return this._totalPrice;
    }
}