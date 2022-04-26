import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ThemeContext } from '../../index';
import { authRoutes, publicRoutes, adminRoutes } from '../../routes';
import { Shop } from '../../pages/shop/Shop';

export const AppRouter = observer ( () => {
    const { user } = useContext(ThemeContext);
    
    return (
        <Routes>
            {user.isAdmin && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            <Route path='*' element={<Shop />} />
        </Routes>
    )
});
