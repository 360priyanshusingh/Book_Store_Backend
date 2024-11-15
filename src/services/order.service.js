import sequelize, { DataTypes } from '../config/database';
const Cart = require('../models/cart.js')(sequelize, DataTypes);
const Order = require('../models/order.js')(sequelize, DataTypes);
const CustomerDetails = require('../models/customerDetails.js')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';


export const createOrder = async (body) => {
    let cart = await Cart.findOne({ where: { userId: body.userId } });

    if (!cart) {
       return{
            code: HttpStatus.BAD_REQUEST,
            data: cart,
            message: 'cart not exit',
        };
    } else {
        const customerDetails= await CustomerDetails.findOne({where:{id:body.shippingAddress}})
        if(!customerDetails){
            return {
                code: HttpStatus.BAD_REQUEST,
                data: order,
                message: 'CustomerDetails Not Exit',
            };
        }

        const order= await Order.create( {
            userId:body.userId,
            totalPrice:cart.totalPrice,
            totalDiscountPrice:cart.totalDiscountPrice,
            totalQuantity:cart.totalQuantity,
            books:cart.books,
            shippingAddress:{
                name:customerDetails.name,
                mobileNumber:customerDetails.mobileNumber,
                address:customerDetails.address,
                city:customerDetails.city,
                state:customerDetails.state
            },
        })

        cart = await Cart.destroy({ where: { userId:body.userId } })

        return {
            code: HttpStatus.ACCEPTED,
            data: order,
            message: 'order successfully created',
        };

    }
 
}

export const getOrder = async(body)=>{
    const order = await Order.findOne({where:{userId:body.userId}})
    if(order){
        return {
            code: HttpStatus.ACCEPTED,
            data: order,
            message: 'order successfully get',
        };
    }else{
        return {
            code: HttpStatus.ACCEPTED,
            data: [],
            message: 'order not exit',
        };
    }
}