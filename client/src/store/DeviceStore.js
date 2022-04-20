import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Наушники'},
            {id: 2, name: 'Часы'}
        ]
        this._brands = [
            {id: 1, name: 'Apple'},
            {id: 2, name: 'Xiaomi'}
        ]
        this._devices = [
            {id: 1, name: 'Apple Watch 7'},
            {id: 2, name: 'Air Pods 2'},
            {id: 2, name: 'Air Pods'},
            {id: 3, name: 'Air Pods Pro'}
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
}