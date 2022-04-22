import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Наушники'},
            {id: 2, name: 'Часы'},
            {id: 3, name: 'Чехлы'},
            {id: 4, name: 'Ремешки'},
            {id: 5, name: 'Беспроводная зарядка'},
            {id: 6, name: 'PowerBank'},
        ]
        this._brands = [
            {id: 1, name: 'Apple'},
            {id: 2, name: 'Xiaomi'},
        ]
        this._devices = [
            {id: 1, name: 'Apple Watch 7', price: '5000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCE4pgmmjxgEJLk7mnz1IuJ0n403lhR7c8sw&usqp=CAU'},
            {id: 2, name: 'Air Pods 2'},
            {id: 3, name: 'Air Pods'},
            {id: 4, name: 'Air Pods Pro'},
        ]
        this._selectedType = {}
        this._selectedBrand = {}
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
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}