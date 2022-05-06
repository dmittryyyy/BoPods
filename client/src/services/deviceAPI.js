import { $authHost, $host } from "./services";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}

export const getTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost.delete(`api/type/${id}`);
    return data;
}

// Brands

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
}

export const getBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete(`api/brand/${id}`);
    return data;
}

// Device

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device);
    return data;
}

export const getDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {params: { 
        typeId, brandId, page, limit
    }});
    return data;
}

export const getDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data;
}

export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete(`api/device/${id}`);
    return data;
}

export const updateDevices = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/device/${id}`, data: body});
    return data;
}

export const getAllDevicesInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/device/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}


//Cart

export const addDeviceToCart = async (device) => {
    const {data} = await $authHost.post('api/cart', device);
    return data;
}

export const getDeviceFromCart = async () => {
    const {data} = await $authHost.get('api/cart');
    return data;
}

export const deleteDeviceFromCart = async (id) => {
    const {data} = await $authHost.delete(`api/cart/${id}`);
    return data;
}