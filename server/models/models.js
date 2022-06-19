const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, primaryKey: true}
});

const CartDevice = sequelize.define('cart_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deviceId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 1}
});

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false},
    mobile: {type: DataTypes.STRING(25), allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: true},
});

const OrderDevice = sequelize.define('orders_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deviceId: {type: DataTypes.INTEGER, allowNull: false},
    orderId: {type: DataTypes.INTEGER, allowNull: false},
});

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 1}
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const DeviceDescripton = sequelize.define('device_descr', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false}
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartDevice)
CartDevice.belongsTo(Cart)

User.hasMany(Orders);
Orders.belongsTo(User, 
    {
        foreignKey: { name: 'userId'},
        onDelete: 'CASCADE'
    }
)

Orders.hasMany(OrderDevice);
OrderDevice.belongsTo(Orders, 
    {
        foreignKey: { name: 'orderId'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }    
)

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(CartDevice);
CartDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Device.hasMany(DeviceDescripton, {as: 'descr'});
DeviceDescripton.belongsTo(Device);

Type.belongsToMany(Brand, {through: TypeBrand });
Brand.belongsToMany(Type, {through: TypeBrand });

module.exports = {
    User,
    Cart,
    CartDevice,
    Device,
    Type,
    Brand,
    TypeBrand,
    DeviceInfo,
    DeviceDescripton,
    Orders,
    OrderDevice
}