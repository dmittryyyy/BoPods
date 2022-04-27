import { React, useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../..';
import { createType, createBrand, createDevice, getTypes, getBrands } from '../../services/deviceAPI';

import { observer } from 'mobx-react-lite';

import './Modals.scss';

export const Modals = observer(({ showProd, showType, showBrand, closeModal }) => {

    const { device } = useContext(ThemeContext);

    const [isInfo, setIsInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');

    const [valueType, setValueType] = useState('');
    const [valueBrand, setValueBrand] = useState('');

    useEffect(() => {
        getTypes().then(data => device.setTypes(data));
        getBrands().then(data => device.setBrands(data));
    }, []);

    const addType = () => {
        createType({ name: valueType }).then(data => {
            setValueType('');
            closeModal();
        })
    }

    const addBrand = () => {
        createBrand({ name: valueBrand }).then(data => {
            setValueBrand('');
            closeModal();
        })
    }

    const addInfo = () => {
        setIsInfo([...isInfo, { title: '', description: '', number: Date.now() }])
    }

    const removeinfo = (number) => {
        setIsInfo(isInfo.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setIsInfo(isInfo.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', brand);
        formData.append('typeId', type);
        formData.append('info', JSON.stringify(isInfo));
        createDevice(formData).then(data => closeModal());
    }

    return (
        <div className={showProd || showType || showBrand ? 'modalWrapper' : 'modalHidden'}>
            <div className="modal">
                <div className='modalClose'>
                    <span onClick={closeModal}>X</span>
                </div>
                {showProd ?
                    <div className='modalContentProd'>
                        <h3>Добавление товара</h3>
                        <div className="menuSelect">
                            <select className='selectItem' onChange={(e) => setType(e.target.value)}>
                                <option>{type || 'Выберете тип'}</option>
                                {device.types.map(type =>
                                    <option
                                    value={type.id}
                                        key={type.id} 
                                    >
                                        {type.name}
                                    </option>
                                )}
                            </select>
                            <select className='selectItem' onChange={(e) => setBrand(e.target.value)}>
                                <option>{brand || 'Выберете брэнд'}</option>
                                {device.brands.map(brand =>
                                    <option
                                    value={brand.id}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="menuName">
                            <input type="text"
                                placeholder='Введите название товара'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input type="number"
                                placeholder='Введите стоимость товара'
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div className='inputFile'>
                            <input type="file" onChange={selectFile} />
                        </div>
                        <button onClick={addInfo}>Указать характеристики</button>
                        <div className="propertyBlock">
                            {isInfo.map(i =>
                                <div className="property" key={i.number}>
                                    <input type="text"
                                        placeholder='Наименование свойства'
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    />

                                    <input type="text"
                                        placeholder='Значение свойства'
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                    <li><button onClick={() => removeinfo(i.number)} className='removeBtn'>Удалить</button></li>
                                </div>
                            )}
                        </div>
                        <button onClick={addDevice}>Добавить товар</button>
                    </div>
                    : showType ?
                        <div className='modalContent'>
                            <h3>Добавление типа товара</h3>
                            <input type="text"
                                placeholder='Введите наименование типа товара'
                                value={valueType}
                                onChange={e => setValueType(e.target.value)}
                            />
                            <button onClick={addType}>Добавить</button>
                        </div>
                        : showBrand ?
                            <div className='modalContent'>
                                <h3>Добавление брэнда товара</h3>
                                <input type="text"
                                    placeholder='Введите наименование брэнда'
                                    value={valueBrand}
                                    onChange={e => setValueBrand(e.target.value)}
                                />
                                <button onClick={addBrand}>Добавить</button>
                            </div>
                            : ''
                }
            </div>
        </div>
    )
});
