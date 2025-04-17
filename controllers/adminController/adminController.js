// controllers/adminController.js

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

const getCustomersPage=(req,res)=>{
    res.render('admin/customers');
}


module.exports={
    getAdminPage,
    getMessagePage,
    getOrderPage,
    getProductPage,
    getSettingsPage,
    getTransactionPage,
    getCustomersPage
}
