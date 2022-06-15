import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";

export class UserStore {
    constructor() {
        this._isAuth = false;
        this._isAdmin = false;
        this._user = {};
        this.checkValidToken = this.checkValidToken.bind(this);
        makeAutoObservable(this);
    }

    checkValidToken() {
        let isExpired = false;
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()) {
            isExpired = true;
        }

        return isExpired;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get isAdmin() {
        return this._isAdmin
    }
}