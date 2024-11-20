import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
import bcrypt  from 'bcrypt' ;
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import sendEmail from '../config/sendEmail';
dotenv.config()
//get all users
let otp=''


//create new user
export const newUser = async (body) => {

  const data = await User.findOne({where:{email:body.email}});
  if(data){
    return{
      code:HttpStatus.ACCEPTED,
      data:[],
      message:"User Already present"
    }
  }
  else{
    const hashedPassword= await bcrypt.hash(body.password,4);
    body.password=hashedPassword;
    const user = await User.create(body)

    const emailOptions = {
      to: user.email,  
      subject: 'Welcome to Book Store App !',
      html: `<h3>Thank you ${user.firstName} ${user.lastName}  for registration with Book Store App. </h3>`,  // HTML version
    };
  
    const emailResult = await sendEmail(emailOptions);
    
    if (emailResult.success) {
      console.log('Welcome email sent to:', user.email);
    } else {
      console.error('Failed to send email:', emailResult.error);
      return {
        code:HttpStatus.BAD_REQUEST,
        data:emailResult.error,
        message:"Registration mail not send to you !"
      }
    }

    return{
      code:HttpStatus.CREATED,
      data:user,
      message:'User Succesfully created'
    }
  }

};

export const newAdmin = async (body) => {

  const data = await User.findOne({where:{email:body.email,role:'admin'}});
  if(data){
    return{
      code:HttpStatus.ACCEPTED,
      data:[],
      message:"Admin Already present"
    }
  }
  else{
    const hashedPassword= await bcrypt.hash(body.password,4);
    body.password=hashedPassword;
    body.role='admin';
    const user = await User.create(body)

    const emailOptions = {
      to: user.email,  
      subject: 'Welcome to Book Store App !',
      html: `<h3>Thank you ${user.firstName} ${user.lastName}  for registration with Book Store App. </h3>`,  // HTML version
    };
  
    const emailResult = await sendEmail(emailOptions);
    
    if (emailResult.success) {
      console.log('Welcome email sent to:', user.email);
    } else {
      console.error('Failed to send email:', emailResult.error);
      return {
        code:HttpStatus.BAD_REQUEST,
        data:emailResult.error,
        message:"Registration mail not send to you !"
      }
    }

    return{
      code:HttpStatus.ACCEPTED,
      data:user,
      message:'Admin Succesfully created'
    }
  }

};

export const loginUser = async (body) => {

  const data = await User.findOne({ where: { email: body.email} });
  if(data===null){
    return {
      code: HttpStatus.ACCEPTED, 
      data: null,
      message: 'User is not registered !',
    };

  }
   const passwordMatch = await bcrypt.compare(body.password, data.password); 

   if(!passwordMatch){
     return{
        code:HttpStatus.ACCEPTED,
        data:null,
        message:'User Password Is Wrong !',
     };
  }

  const token = jwt.sign({
    userId: data.id,
    email:data.email,
    role:data.role
  }, process.env.JWT_SECRET_USER);

  return{
    code:HttpStatus.CREATED,
    data:token,
    message:'User successfully Login',
 };
  

};
export const getUser = async (body) => {

  const data = await User.findOne({ where: { id : body.userId} });
  if(data===null){
    return {
      code: HttpStatus.ACCEPTED, 
      data: null,
      message: 'User is not registered !',
    };
  }
  return{
    code:HttpStatus.CREATED,
    data:data,
    message:'User successfully Get !',
 };
  

};

export const updateUser = async (body) => {

  const data = await User.findOne({ where: { id : body.userId} });

  if(data===null){
    return {
      code: HttpStatus.ACCEPTED, 
      data: null,
      message: 'User is not registered !',
    };
  }

   data.firstName=body.firstName?body.firstName:data.firstName
   data.lastName=body.lastName?body.lastName:data.lastName
   data.email=body.email?body.email:data.email
   data.save()

  return{
    code:HttpStatus.CREATED,
    data:data,
    message:'User successfully Update!',
 };
  

};

// export const loginAdmin = async (body) => {

//   const data = await User.findOne({ where: { email: body.email } });
//   if(data===null){
//     return {
//       code: HttpStatus.ACCEPTED, 
//       data: null,
//       message: 'Admin is not registered !',
//     };

//   }
//    const passwordMatch = await bcrypt.compare(body.password, data.password); 

//    if(!passwordMatch){
//      return{
//         code:HttpStatus.ACCEPTED,
//         data:null,
//         message:'admin Password Is Wrong !',
//      };
//   }

//   const token = jwt.sign({
//     userId: data.id,
//     email:data.email,
//     role:data.role
//   }, process.env.JWT_SECRET_ADMIN,{ expiresIn: '1h' });

//   return{
//     code:HttpStatus.CREATED,
//     data:token,
//     message:'Admin successfully Login',
//  };
  

// };

export const forgetFassword= async(body)=>{
  const data = await User.findOne({where:{email:body.email}})

  if(!data){
    return{
      code:HttpStatus.ACCEPTED,
      data:null,
      message:"User not registred !"
    }
  }
  else{

    for(let i=0;i<5;i++){
      otp+=Math.floor(Math.random()*10)
    }

    const emailOptions = {
      to: body.email,  
      subject: 'Welcome to Book Store App!',
      html: `<h3>Thank you for registration with Book Store App. Your reset password process started . Please do Not share the otp your OTP : ${otp} </h3>`,  // HTML version
    };
  
    const emailResult = await sendEmail(emailOptions);
    // console.log("new Servise called ",emailResult,body)
    if (emailResult.success) {
      console.log('Welcome email sent to:', body.email);

      return{
        code:HttpStatus.ACCEPTED,
        data:null,
        message:"Otp Generated Please ckeck your mail !"
      }
    } else {
      console.error('Failed to send email:', emailResult.error);
      return {
        code:HttpStatus.ACCEPTED,
        data:emailResult.error,
        message:"Registration mail not send to you !"
      }
    }

  }
}

export const resetPassword= async(email,body)=>{
  const data=await User.findOne({where:{email:email}});
 //  console.log(data);
 console.log(body)
 console.log(otp)
  if(!data){
   return{
     code:HttpStatus.ACCEPTED,
     data:null,
     message:"User not registered !"
   }
 }
  else if(otp!==body.otp){
   return{
     code:HttpStatus.ACCEPTED,
     data:null,
     message:"Otp is wrong !"
   }
 }
 else{
  const hashedPassword= await bcrypt.hash(body.newPassword,4);
  data.password=hashedPassword;
  data.save()
  otp='';

   return{
     code:HttpStatus.ACCEPTED,
     data:data,
     message:"Your Password Succesfully Reset !"
   }
   
 }

}