const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const { name } = require('ejs');


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

const getProductPage = (req, res) => {
    res.render('admin/products',{currentPage:2,totalPages:10    });
}

const getSettingsPage = (req, res) => {
    res.render('admin/settings');
}

const getTransactionPage = (req, res) => {
    res.render('admin/transaction');
}


const getCustomersPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 1;
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
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({})
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    res.render('admin/customers', {
      users,
      currentPage: page,
      totalPages,
      sort: sortOption
    });
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

    try {
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // case-insensitive match
                { email: { $regex: query, $options: 'i' } }, // case-insensitive match
                { phone: { $regex: query, $options: 'i' } } // case-insensitive match
            ]
        });

        res.json(users);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {

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
    getStaffPage,
    getCustomerDetailsModal,
    searchUsers,  

    // put methods
    updateBlockStatus,

    // post methods
    addCustomer


}
