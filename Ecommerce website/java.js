
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation.",
        featured: true
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        rating: 4.3,
        description: "Advanced smartwatch with health monitoring features.",
        featured: true
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        rating: 4.2,
        description: "Comfortable cotton t-shirt available in multiple colors.",
        featured: true
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 89.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        rating: 4.6,
        description: "Lightweight running shoes with excellent cushioning.",
        featured: false
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 49.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
        rating: 4.4,
        description: "Programmable coffee maker with thermal carafe.",
        featured: true
    },
    {
        id: 6,
        name: "Desk Lamp",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        rating: 4.1,
        description: "Adjustable LED desk lamp with multiple brightness settings.",
        featured: false
    },
    {
        id: 7,
        name: "Laptop Backpack",
        price: 45.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        rating: 4.7,
        description: "Durable laptop backpack with multiple compartments.",
        featured: true
    },
    {
        id: 8,
        name: "Wireless Mouse",
        price: 29.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        rating: 4.0,
        description: "Ergonomic wireless mouse with precision tracking.",
        featured: false
    },
    {
        id: 9,
        name: "Yoga Mat",
        price: 39.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
        rating: 4.5,
        description: "Non-slip yoga mat with carrying strap.",
        featured: true
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const userBtn = document.getElementById('userBtn');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const closeModals = document.querySelectorAll('.close-modal');
const checkoutBtn = document.getElementById('checkoutBtn');
const shippingForm = document.getElementById('shippingForm');
const contactForm = document.getElementById('contactForm');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadFeaturedProducts();
    loadAllProducts();
    setupEventListeners();
    
    // Check if there's a hash in the URL and show the corresponding page
    if (window.location.hash) {
        showPage(window.location.hash.substring(1));
    }
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId);
            updateActiveNav(link);
        });
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId);
            updateActiveNav(link);
            mobileMenu.classList.remove('active');
        });
    });
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // User actions
    userBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    cartBtn.addEventListener('click', () => {
        showPage('cart');
        updateActiveNav(document.querySelector('a[href="#cart"]'));
    });
    
    wishlistBtn.addEventListener('click', () => {
        alert('Wishlist feature coming soon!');
    });
    
    // Search functionality
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
                searchInput.value = '';
            }
        }
    });
    
    // Modal controls
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Form submissions
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products before checkout.');
            return;
        }
        showPage('checkout');
        updateActiveNav(document.querySelector('a[href="#checkout"]'));
        loadCheckoutItems();
    });
    
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality coming soon!');
        loginModal.classList.remove('active');
        loginForm.reset();
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration functionality coming soon!');
        registerModal.classList.remove('active');
        registerForm.reset();
    });
    
    // Filter and sort functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortBy = document.getElementById('sortBy');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterAndSortProducts);
    }
    if (sortBy) {
        sortBy.addEventListener('change', filterAndSortProducts);
    }
}

// Page navigation
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update URL hash
    window.location.hash = pageId;
}

function updateActiveNav(activeLink) {
    // Update main navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Update mobile navigation
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Product loading and display
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(product => product.featured);
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product cards
    addProductCardListeners();
}

function loadAllProducts() {
    const allProductsContainer = document.getElementById('allProducts');
    if (!allProductsContainer) return;
    
    allProductsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product cards
    addProductCardListeners();
}

function createProductCard(product) {
    const stars = generateStarRating(product.rating);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">${stars}</div>
                <div class="product-actions">
                    <button class="btn btn-outline add-to-cart">Add to Cart</button>
                    <button class="icon-btn add-to-wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function addProductCardListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
    
    // Add to wishlist buttons
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            addToWishlist(productId);
        });
    });
    
    // Product card clicks (for product details)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.getAttribute('data-product-id'));
            showProductDetails(productId);
        });
    });
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    
    // Show confirmation
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToStorage();
    loadCartItems();
    
    if (cart.length === 0) {
        showPage('cart');
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart</p>
                <a href="#products" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to cart items
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            updateCartItemQuantity(productId, -1);
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            updateCartItemQuantity(productId, 1);
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    updateCartSummary();
}

function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        saveCartToStorage();
        loadCartItems();
    }
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Checkout functionality
function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (!checkoutItemsContainer) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-details">
                <div class="checkout-item-title">${item.name}</div>
                <div class="checkout-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
        </div>
    `).join('');
    
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function processOrder() {
    // In a real application, this would connect to a payment gateway
    alert('Thank you for your order! Your payment has been processed successfully.');
    
    // Clear the cart
    cart = [];
    saveCartToStorage();
    updateCartCount();
    
    // Redirect to home page
    showPage('home');
    updateActiveNav(document.querySelector('a[href="#home"]'));
}

// Product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const stars = generateStarRating(product.rating);
    
    const productDetailsContent = document.getElementById('productDetailsContent');
    if (!productDetailsContent) return;
    
    productDetailsContent.innerHTML = `
        <div class="product-details">
            <div class="product-details-hero">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h1 class="product-details-title">${product.name}</h1>
                    <div class="product-details-price">$${product.price.toFixed(2)}</div>
                    <div class="product-details-rating">${stars} <span>${product.rating} out of 5</span></div>
                    <p class="product-details-description">${product.description}</p>
                    <div class="product-details-actions">
                        <button class="btn btn-primary add-to-cart-details" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-outline add-to-wishlist-details" data-id="${product.id}">
                            <i class="far fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
            <div class="product-details-tabs">
                <div class="tabs">
                    <button class="tab-btn active" data-tab="description">Description</button>
                    <button class="tab-btn" data-tab="reviews">Reviews</button>
                    <button class="tab-btn" data-tab="shipping">Shipping</button>
                </div>
                <div class="tab-content active" id="description">
                    <p>${product.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="tab-content" id="reviews">
                    <div class="review">
                        <div class="review-header">
                            <div class="review-author">John Doe</div>
                            <div class="review-rating">${generateStarRating(4.5)}</div>
                        </div>
                        <p>Great product! I've been using it for a month and it works perfectly.</p>
                    </div>
                    <div class="review">
                        <div class="review-header">
                            <div class="review-author">Jane Smith</div>
                            <div class="review-rating">${generateStarRating(5)}</div>
                        </div>
                        <p>Excellent quality and fast shipping. Highly recommended!</p>
                    </div>
                </div>
                <div class="tab-content" id="shipping">
                    <p>Free shipping on orders over $50. Standard shipping: 3-5 business days. Express shipping available for an additional fee.</p>
                    <p>Returns accepted within 30 days of purchase.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to product details buttons
    const addToCartBtn = document.querySelector('.add-to-cart-details');
    const addToWishlistBtn = document.querySelector('.add-to-wishlist-details');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(productId);
        });
    }
    
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', () => {
            addToWishlist(productId);
        });
    }
    
    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    showPage('product-details');
    updateActiveNav(document.querySelector('a[href="#product-details"]'));
}

// Wishlist functionality
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        saveWishlistToStorage();
        showNotification(`${product.name} added to wishlist!`);
    } else {
        showNotification(`${product.name} is already in your wishlist!`);
    }
}

function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Search functionality
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    showPage('products');
    updateActiveNav(document.querySelector('a[href="#products"]'));
    
    const allProductsContainer = document.getElementById('allProducts');
    if (allProductsContainer) {
        if (filteredProducts.length === 0) {
            allProductsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
        } else {
            allProductsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
            addProductCardListeners();
        }
    }
}

// Filter and sort functionality
function filterAndSortProducts() {
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by price
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(val => {
            if (val.endsWith('+')) return parseInt(val) || 0;
            return parseInt(val) || 0;
        });
        
        if (priceRange.endsWith('+')) {
            filteredProducts = filteredProducts.filter(product => product.price >= min);
        } else {
            filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
        }
    }
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Featured (default) - no sorting needed
            break;
    }
    
    // Update products display
    const allProductsContainer = document.getElementById('allProducts');
    if (allProductsContainer) {
        allProductsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        addProductCardListeners();
    }
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Update cart when cart page is shown
document.addEventListener('click', (e) => {
    if (e.target && (e.target.getAttribute('href') === '#cart' || 
        e.target.closest('a') && e.target.closest('a').getAttribute('href') === '#cart')) {
        // Small delay to ensure the page is shown before updating
        setTimeout(() => {
            loadCartItems();
        }, 100);
    }
});