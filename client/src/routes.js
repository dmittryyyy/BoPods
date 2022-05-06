import { AdminPanel } from './pages/adminPanel/AdminPanel';
import { Cart } from './pages/cart/Cart';
import { Shop } from './pages/shop/Shop';
import { Device } from './pages/device/Device';
import { Authorisation } from './pages/authorisation/Authorisation';
import { Profile } from './pages/profile/Profile';

import { ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ORDER_ROUTE } from './utils/constants';

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPanel/>
    }
]

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: <Cart/>
    },
    {
        path: ORDER_ROUTE,
        Component: <Profile/>
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Authorisation/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Authorisation/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: <Device/>
    },
    {
        path: CART_ROUTE,
        Component: <Cart/>
    }
]
