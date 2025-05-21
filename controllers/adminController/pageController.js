const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const Product = require('../../models/productSchema')



// controllers/adminController.js

const getloginPage = (req, res) => {
    res.render('admin/login');
}

const getAdminPage = (req, res) => {
    res.render('admin/dashboard');
}

const getMessagePage = (req, res) => {
    res.render('admin/message');
}
const getOrderPage = (req, res) => {
    res.render('admin/orders');
}


const getProductPage = async (req, res) => {

    res.render('admin/products', { currentPage: 1, totalPages: 4 });
};



const loadProductPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 16;
    const sortOption = req.query.sort || 'name';

    let sortBy;

    if (sortOption === 'date') {
        sortBy = { createdAt: -1 }; // latest joined first
    } else if (sortOption === 'count') {
        sortBy = { totalCount: -1 }; // assuming you have a field 'totalCount'
    } else {
        sortBy = { name: 1 }; // default to A-Z
    }

    try {
        const totalUsers = await Product.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        const products = await Product.find({})
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit);

        setTimeout(() => {
            res.json({
                success: true,
                products,
                currentPage: page,
                totalPages,
                sort: sortOption
            });
        }, 5000);



    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getSettingsPage = (req, res) => {
    res.render('admin/settings');
}

const getTransactionPage = (req, res) => {
    res.render('admin/transaction');
}

const getCustomersPage = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'name';

        // This renders the EJS template instead of returning JSON data
        res.render('admin/customers', {
            currentPage: page,
            totalPages: 4, // This will be replaced by client-side pagination
            sort: sort
        });
    } catch (error) {
        console.error('Error rendering customers page:', error);
        res.status(500).send('Server error');
    }
};


const loadCustomerPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const sortOption = req.query.sort || 'name';


    let sortBy = {};
    switch (sortOption) {
        case 'date':
            sortBy = { createdAt: -1 };
            break;
        case 'count':
            sortBy = { totalOrders: -1 };
            break;
        default:
            sortBy = { name: 1 };
    }


    try {
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await User.find({})
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit).lean();

        setTimeout(() => {

            return res.json({
                success: true,
                users,
                currentPage: page,
                totalPages,
                sort: sortOption
            });
        }, 1000);

    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
    }
};


const getDiscountPage = (req, res) => {
    res.render('admin/discount');
}

const getStaffPage = (req, res) => {
    res.render('admin/staff');
}

const getCustomerDetailsModal = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add any additional user data you want to send
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            isBlocked: user.isBlocked || false,
            totalOrders: user.totalOrders || 0,
            totalSpent: user.totalSpent || 0,
            // Add more fields as needed
        };

        res.json(userData);
        console.log("this from admin routes", userData);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateBlockStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ isBlocked: user.isBlocked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addCustomer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        // Name validation
        if (!name || name.length < 3) {
            return res.status(400).json({ error: 'Name must be at least 3 characters long' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Password validation
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }


        if (phone && !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Phone must be a 10-digit number if provided' });
        }

        const emailExists = await User.findOne({ email });
        console.log(emailExists);

        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const phoneExists = await User.findOne({ phone });
        console.log(phoneExists);

        if (phoneExists) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }




        const hashedPassword = await bcrypt.hash(password, 10); // 

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const searchUsers = async (req, res) => {
    const query = req.query.query || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const sortOption = req.query.sort || 'name';

    try {
        let sortBy = {};
        switch (sortOption) {
            case 'date': sortBy = { createdAt: -1 }; break;
            case 'count': sortBy = { totalOrders: -1 }; break;
            default: sortBy = { name: 1 };
        }

        const searchQuery = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } }
            ]
        };



        const count = await User.countDocuments(searchQuery);
        const totalPages = Math.ceil(count / limit);

        const users = await User.find(searchQuery)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit);


        setTimeout(() => {
            // Remove the setTimeout - it's causing unnecessary delay
            res.json({
                success: true,
                users,
                currentPage: page,
                totalPages,
                sort: sortOption
            });
        }, 500);

    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}


module.exports = {

    // getpages

    getAdminPage,

    // massage Page
    getMessagePage,


    // order page
    getOrderPage,

    // product page 
    getProductPage,
    loadProductPage,

    // setting Page 
    getSettingsPage,

    // transaction page
    getTransactionPage,


    // customers page
    getCustomersPage,
    loadCustomerPage,
    getCustomerDetailsModal,
    updateBlockStatus,// put methods
    addCustomer,// post methods
    searchUsers,


    // login page
    getloginPage,


    // Discound page
    getDiscountPage,


    // staff page
    getStaffPage,


}
