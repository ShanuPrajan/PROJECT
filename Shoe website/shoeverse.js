AOS.init();

let cart = [];
let cartTotal = 0;

function toggleMenu() {
    const nav = document.querySelector('.navbar-nav');
    nav.classList.toggle('show');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' ||
            productCategory === category ||
            productCategory.startsWith(category + '-') ||
            (category === 'men' && productCategory.startsWith('men-')) ||
            (category === 'women' && productCategory.startsWith('women-')) ||
            (category === 'sports' && productCategory.includes('sports')) ||
            (category === 'casual' && productCategory.includes('casual')) ||
            (category === 'formal' && productCategory.includes('formal')) ||
            (category === 'slippers' && productCategory.includes('slippers')) ||
            (category === 'comfort' && productCategory.includes('comfort'))) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
});

function quickView(button) {
    const card = button.closest('.product-card');
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;

    document.getElementById('modalProductTitle').textContent = title;
    document.getElementById('modalProductPrice').textContent = price;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

function addToCart() {
    const title = document.getElementById('modalProductTitle').textContent;
    const price = parseFloat(document.getElementById('modalProductPrice').textContent.replace('$', ''));
    const size = document.getElementById('sizeSelect').value;
    const color = document.querySelector('.color-option.selected') ? document.querySelector('.color-option.selected').style.backgroundColor : 'black';

    cart.push({ title, price, size, color });
    cartTotal += price;
    updateCart();

    // Animation
    const button = event.target;
    button.textContent = 'Added!';
    button.style.backgroundColor = 'green';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 1000);

    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="https://via.placeholder.com/80x80?text=Shoe" alt="Shoe">
                <div>
                    <h6>${item.title}</h6>
                    <p>Size: ${item.size}, Color: ${item.color}</p>
                    <p>$${item.price}</p>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
}

function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cartPanel').classList.toggle('open');
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
        alert('Subscribed successfully!');
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('Please enter a valid email.');
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShoe = document.querySelector('.hero-shoe');
    heroShoe.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
});