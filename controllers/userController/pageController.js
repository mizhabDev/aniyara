const productModel = require('../../models/productSchema');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');




const getHomePage = (req, res) => {
    const productSections = {
        jewelry: {
            title: "Jewelry",
            products: [
                { title: 'Gold Necklace', price: '299.00', image: 'gold-necklace', isNew: true },
                { title: 'Silver Earrings', price: '89.00', image: 'silver-earrings' },
                { title: 'Diamond Ring', price: '499.00', image: 'diamond-ring' },
                { title: 'Pearl Bracelet', price: '159.00', image: 'pearl-bracelet' }
            ]
        },
        gifts: {
            title: "Gifts",
            products: [
                { title: 'Gift Box', price: '30.00', image: 'gift-box', isNew: true },
                { title: 'Greeting Card', price: '5.00', image: 'greeting-card' },
                { title: 'Photo Frame', price: '25.00', image: 'photo-frame' },
                { title: 'Candle Set', price: '20.00', image: 'candle-set' }
            ]
        },
        toys: {
            title: "Toys",
            products: [
                { title: 'Teddy Bear', price: '24.99', image: 'teddy-bear', isNew: true },
                { title: 'Wooden Train', price: '34.99', image: 'wooden-train' },
                { title: 'Building Blocks', price: '29.99', image: 'blocks' },
                { title: 'Art Set', price: '19.99', image: 'art-set' }
            ]
        }
    };

    res.render('user/index', { productSections });
};

const loadCosmeticsPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'cosmetics' });
        if (!Array.isArray(products)) {
            throw new Error('Invalid products data');
        }
        res.render('user/cosmetics', { products });
    } catch (error) {
        console.error('Error fetching cosmetics:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadToysPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'toys' });
        if (!Array.isArray(products)) {
            throw new Error('Invalid products data');
        }
        res.render('user/toys', { products });
    } catch (error) {
        console.error('Error fetching toys:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadGiftsPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'gifts' });
        if (!Array.isArray(products)) {
            throw new Error('Invalid products data');
        }
        res.render('user/gifts', { products });
    } catch (error) {
        console.error('Error fetching gifts:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadJewelryPage = async (req, res) => {
    try {
        // const products = await productModel.find({ category: 'jewelry' });
        res.render('user/jewelry', { products });
    } catch (error) {
        console.error('Error fetching jewelry:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadDecorationsPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'decorations' });
        res.render('user/decoration', { products });
    } catch (error) {
        console.error('Error fetching decorations:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadAboutPage = (req, res) => {
    try {
        return res.render('user/about');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadContactPage = (req, res) => {
    try {
        return res.render('user/contact');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadCartPage = (req, res) => {
    try {
        return res.render('user/cart');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }

}

const loadCheckoutPage = (req, res) => {
    try {
        return res.render('user/checkout');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }
    
}

const loadOthersPage = (req, res) => {
    try {
        return res.render('user/others');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }
    
}

const loadPerfumePage = async (req, res) => {
    // const products = await productModel.find({ category: 'perfumes' });

    try {
        res.render('user/perfumes')//, { products });
    } catch (error) {
        console.error('Error fetching perfumes:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadPnfPage = (req, res) => {
    try {
        return res.render('user/pnf');
    } catch (error) {
        console.error('Error loading about page:', error);
        res.status(500).send('Internal Server Error');
    }   
}


const loadWishlistPage = (req, res) =>{
    try {
        return res.render('user/wishlist')
    } catch (error) {
        
    }
}

const loadUserPage = (req, res) => {
    try {
        return res.render('user/user')
    } catch (error) {
        console.error('Error loading user page:', error);
        res.status(500).send('Internal Server Error');
    }
}



// sign up page

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             req.flash('error_msg', 'All fields are required');
//             return res.redirect('/login');
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             req.flash('error_msg', 'Invalid email or password');
//             return res.redirect('/login');
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             req.flash('error_msg', 'Invalid email or password');
//             return res.redirect('/login');
//         }

//         req.session.user = user;
//         req.session.userLoggedIn = true;
//         req.flash('success_msg', 'Welcome back! You have successfully logged in.');
//         return res.redirect('/');

//     } catch (error) {
//         console.error('Login error:', error);
//         req.flash('error_msg', 'An error occurred while logging in');
//         return res.redirect('/login');
//     }
// };

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;

//         if (!name || !email || !password || !confirmPassword) {
//             req.flash('error_msg', 'All fields are required');
//             return res.redirect('/login');
//         }

//         if (password !== confirmPassword) {
//             req.flash('error_msg', 'Passwords do not match');
//             return res.redirect('/login');
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             req.flash('error_msg', 'Email is already registered');
//             return res.redirect('/login');
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword
//         });

//         await user.save();
//         req.session.user = user;
//         req.session.userLoggedIn = true;
//         req.flash('success_msg', 'Account created successfully! Welcome to Aniyara.');
//         return res.redirect('/');

//     } catch (error) {
//         console.error('Signup error:', error);
//         req.flash('error_msg', 'An error occurred while creating your account');
//         return res.redirect('/login');
//     }
// };


// const loadLoginPage = async (req, res) => {
//     try {

//         res.render('user/login');
//     } catch (error) {
//         console.error('Error loading login page:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
const loadLoginPage = async (req, res) => {
    try {
        res.render('user/login');
    } catch (error) {
        console.error('Error loading login page:', error);
        res.status(500).send('Internal Server Error');
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.flash('error', 'All fields are required');
            return res.redirect('/login');
        }

        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.session.userLoggedIn = true;
        req.flash('success', 'Welcome back!');
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'An error occurred during login');
        res.redirect('/login');
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password >= 6) {
            req.flash('error', 'Atlest 6 charater should be there');
            return res.redirect('/login');
        }

        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/login');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email already registered');
            return res.redirect('/login');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        req.session.user = user;
        req.session.userLoggedIn = true;
        req.flash('success', 'Account created successfully!');
        res.redirect('/');
    } catch (error) {
        console.error('Signup error:', error);
        req.flash('error', 'An error occurred during signup');
        res.redirect('/login');
    }
};


// Exporting the functions to be used in routes

module.exports = {
    // get pages
    getHomePage,
    loadCosmeticsPage,
    loadToysPage,
    loadGiftsPage,
    loadJewelryPage,
    loadDecorationsPage,
    loadAboutPage,
    loadContactPage,
    loadCartPage,
    loadCheckoutPage,
    loadOthersPage,
    loadPerfumePage,
    loadPnfPage,
    loadLoginPage,
    loadWishlistPage,
    loadUserPage,

    // post pages
    signup,
    login
};