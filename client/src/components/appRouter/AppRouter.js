import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ThemeContext } from '../../index';
import { authRoutes, publicRoutes } from '../../routes';
import { Shop } from '../../pages/shop/Shop';

export const AppRouter = () => {
    const { user } = useContext(ThemeContext);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            <Route path='*' element={<Shop />} />
        </Routes>
    )
}
