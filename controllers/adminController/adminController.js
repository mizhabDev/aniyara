// controllers/adminController.js

const getAdminPage=(req,res)=>{
    res.render('admin/dashboard');
}


exports.getAdminPage=getAdminPage;