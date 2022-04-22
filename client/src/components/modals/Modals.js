import { React, useState } from 'react';
import './Modals.scss';

export const Modals = ({ addType, addBrand, addProduct }) => {
    

    const renderModal = () => {
        if (addType) {
            return (
                <>
                    <h3>Добавление типа</h3>
                    <input type="text" placeholder='Введите наименование типа товара' />
                    <button>Добавить</button>
                </>
            )
        } else if (addBrand) {
            return (
                <>
                    <h3>Добавление брэнда</h3>
                    <input type="text" placeholder='Введите наименование брэнда' />
                    <button>Добавить</button>
                </>
            )
        } else if (addProduct) {
            return (
                <>
                    <h3>Добавление товара</h3>
                    <input type="text" placeholder='Введите наименование товара' />
                    <button>Добавить</button>
                </>
            )
        }
    }

    return (
        <div className=''>
            <div className="modal">
            <div className='modalClose'>
                <span>X</span>
            </div>
                {renderModal()}
            </div>
        </div>
    )
}
