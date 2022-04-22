import { AdminPanel } from './pages/adminPanel/AdminPanel';
import { Cart } from './pages/Cart';
import { Shop } from './pages/shop/Shop';
import { Device } from './pages/device/Device';
import { Authorisation } from './pages/authorisation/Authorisation';

import { ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/constants';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPanel/>
    },
    {
        path: CART_ROUTE,
        Component: <Cart/>
    }
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
    }
]
