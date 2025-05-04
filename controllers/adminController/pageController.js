const usersModel = require('../../models/userModel');


// controllers/adminController.js

const getloginPage=(req,res)=>{
    res.render('admin/login');
}

const getAdminPage=(req,res)=>{
    res.render('admin/dashboard');
}

const getMessagePage=(req,res)=>{
    res.render('admin/message');
}
const getOrderPage=(req,res)=>{
    res.render('admin/orders');
}

const getProductPage=(req,res)=>{
    res.render('admin/products');
}

const getSettingsPage=(req,res)=>{
    res.render('admin/settings');
}

const getTransactionPage=(req,res)=>{
    res.render('admin/transaction');
}

const getCustomersPage= async (req,res)=>{
    try {
        const users = await usersModel.find({});
        res.render('admin/customers', { users });
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getDiscountPage=(req,res)=>{
    res.render('admin/discount');
}

const getStaffPage=(req,res)=>{
    res.render('admin/staff');
}

module.exports={
 
    // getpages

    getAdminPage,
    getMessagePage,
    getOrderPage,
    getProductPage,
    getSettingsPage,
    getTransactionPage,
    getCustomersPage,
    getloginPage,
    getDiscountPage,
    getStaffPage
}
