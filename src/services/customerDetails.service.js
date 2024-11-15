import sequelize, { DataTypes } from '../config/database';
const CustomerDetails = require('../models/customerDetails.js')(sequelize, DataTypes);

import HttpStatus from 'http-status-codes';


export const createCustomerDetails = async (body) => {
   try {
    let createCustomer = await CustomerDetails.create(body);
    return{
        code:HttpStatus.ACCEPTED,
        data:createCustomer,
        message:'CustomerDetails Successfull Createed!'
    }

   } catch (error) {

    return{
        code:HttpStatus.BAD_REQUEST,
        data:error,
        message:'CustomerDetails not Createed!'
    }

   }
 
}

export const updateCustomerDetails = async (body,customerId) => {
  let customerDetails= await CustomerDetails.findOne({where:{id:customerId}})

   if(customerDetails){
    
    customerDetails.name=body.name?body.name:customerDetails.name;
    customerDetails.mobileNumber=body.mobileNumber?body.mobileNumber:customerDetails.mobileNumber;
    customerDetails.address=body.address?body.address:customerDetails.address;
    customerDetails.city=body.address?body.city:customerDetails.city;
    customerDetails.state=body.state?body.state:customerDetails.state;
    customerDetails.save()

    return{
        code:HttpStatus.ACCEPTED,
        data:customerDetails,
        message:'CustomerDetails Successfull updated!'
    }

   } else{

    return{
        code:HttpStatus.BAD_REQUEST,
        data:[],
        message:'CustomerDetails not Exit!'
    }

   }
 
}

export const getCustomerDetails = async (userId)=>{

    let customerDetails = await CustomerDetails.findAll({where:{userId:userId}})

    if(customerDetails){

     return{
         code:HttpStatus.ACCEPTED,
         data:customerDetails,
         message:'CustomerDetails Successfull Get!'
     }
 
    } else{
 
     return{
         code:HttpStatus.BAD_REQUEST,
         data:[],
         message:'CustomerDetails Not Exit!'
     }
 
    }

}