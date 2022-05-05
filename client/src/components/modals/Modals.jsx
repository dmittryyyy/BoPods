import { React, useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../..';
import { createType, createBrand, createDevice, getTypes, getBrands, deleteType, deleteBrand } from '../../services/deviceAPI';

import { observer } from 'mobx-react-lite';

import './Modals.scss';

export const Modals = observer(({ showProd, showType, showBrand, showDeleteTypeBrand, closeModal }) => {

    const { device } = useContext(ThemeContext);

    const [isInfo, setIsInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');

    const [valueType, setValueType] = useState('');
    const [valueBrand, setValueBrand] = useState('');

    const [deletedValue, setDeletedValue] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [messageAdmin, setMessageAdmin] = useState();


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

    const deleteTypeBrand = async () => {
        if(deletedValue === 'brand') {
            await deleteBrand(selectedBrand).then(() => {
                setMessageAdmin(true);
                setTimeout(closeModal, 2000);
            })
        } else if(deletedValue === 'type') {
            await deleteType(selectedType).then(() => {
                setMessageAdmin(true);
                setTimeout(closeModal, 2000);
            })
        } else {
            messageAdmin.value = 'Непредвиденная ошибка...'
        }
    }

    return (
        <div className={showProd || showType || showBrand || showDeleteTypeBrand ? 'modalWrapper' : 'modalHidden'}>
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
                            : showDeleteTypeBrand ?
                                <div className='modalContent'>
                                    <h3>Удаление типа или брэнда</h3>
                                    <div className="menuSelect">
                                        <select className='selectItem' onChange={(e) => setDeletedValue(e.target.value)}>
                                            <option value="">Выберете категорию</option>
                                            <option value="brand">Брэнд</option>
                                            <option value="type">Тип</option>
                                        </select>
                                        {deletedValue === 'brand' ? (
                                            <select className='selectItem' onChange={(e) => setSelectedBrand(e.target.value)}>
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
                                        ) : (deletedValue === 'type' ? (
                                            <select className='selectItem' onChange={(e) => setSelectedType(e.target.value)}>
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
                                        ) : '')}
                                    </div>
                                    <div className="messageAdmin">
                                        {messageAdmin ? 'Удаление прошло успешно' : ''}
                                    </div>
                                    <button onClick={deleteTypeBrand}>Удалить</button>
                                </div>
                                : ''
                }
            </div>
        </div>
    )
});
