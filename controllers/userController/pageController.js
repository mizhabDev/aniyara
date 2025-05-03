const productModel = require('../../models/productSchema');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const userShema = require('../../models/userSchema');



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
        res.render('user/cosmetics', { products });
    } catch (error) {
        console.error('Error fetching cosmetics:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadToysPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'toys' });
        res.render('user/toys', { products });
    } catch (error) {
        console.error('Error fetching toys:', error);
        res.status(500).send('Internal Server Error');
    }
}

const loadGiftsPage = async (req, res) => {
    try {
        const products = await productModel.find({ category: 'gifts' });
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

const loadLoginPage = async (req, res) => {
    try {
        
        return res.render('user/login');
    
    } catch (error) {
        console.error('Error loading login page:', error);
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

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        
        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            return res.render('user/login', { message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('user/login', { message: 'Email already exists' });
        }

        // Password validation
        if (password !== confirmPassword) {
            return res.render('user/login', { message: 'Passwords do not match' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to database
        await user.save();
        console.log('User created successfully:', user);

        // Set session
        req.session.user = user;
        req.session.userLoggedIn = true;

        return res.redirect('/');

    } catch (error) {
        console.error('Signup error:', error);
        return res.render('user/login', { message: 'Error creating account' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.render('user/login', { message: 'All fields are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('user/login', { message: 'Invalid email' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('user/login', { message: 'Invalid password' });
        }

        // Set session
        req.session.user = user;
        req.session.userLoggedIn = true;

        console.log('User logged in successfully:', user);

        return res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        return res.render('user/login', { message: 'Error logging in' });
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