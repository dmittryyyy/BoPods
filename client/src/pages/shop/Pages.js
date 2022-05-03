import { React, useContext } from 'react';
import { ThemeContext } from '../..';

export const Pages = () => {

    const { device } = useContext(ThemeContext);

    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    };

    return (
        <div className="pagination">
            {pages.map(page =>
                <div
                    key={page}
                    onClick={() => device.setPage(page)}
                    className={`pageItem ${device.page === page ? 'pageItemActive' : ''}`}>
                    {page}
                </div>
            )}
        </div>
    )
}
