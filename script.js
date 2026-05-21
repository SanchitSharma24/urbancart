/*
  =========================================
  UrbanCart — Core Interactivity JavaScript
  =========================================
  Gen Z Minimalist Streetwear E-Commerce
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initToastNotification();
  initProductDetailPage();
  initNewsletterForm();
  initContactForm();
});

/* --- Mobile Menu Navigation --- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation links on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

/* --- Toast Mock Notification System --- */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toastMsg');
  
  if (!toast) {
    // Dynamically create toast if it doesn't exist
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  // Update text & show
  toast.textContent = message;
  toast.classList.add('show');

  // Clear any existing timeouts to prevent rapid overlap issues
  clearTimeout(toastTimeout);
  
  // Hide after 3 seconds
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initToastNotification() {
  // Listen for all quick mock cart additions
  const addToCartBtns = document.querySelectorAll('.btn-add-to-cart, .btn-card-cart');
  const cartCounts = document.querySelectorAll('.cart-count');

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get product details if available
      let productTitle = "Item";
      const card = btn.closest('.product-card');
      const detailMeta = btn.closest('.product-meta');
      
      if (card) {
        productTitle = card.querySelector('.product-title').textContent;
      } else if (detailMeta) {
        productTitle = detailMeta.querySelector('h1').textContent;
      }
      
      // Increment cart count badges
      cartCounts.forEach(badge => {
        let count = parseInt(badge.textContent) || 0;
        badge.textContent = count + 1;
      });

      showToast(`Added "${productTitle}" to cart successfully!`);
    });
  });
}

/* --- Product Detail Page Interactivity --- */
function initProductDetailPage() {
  // 1. Thumbnail Image Switching
  const thumbs = document.querySelectorAll('.thumb-img');
  const mainImg = document.getElementById('mainProductImage');

  if (thumbs.length > 0 && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active class from all other thumbnails
        thumbs.forEach(t => t.classList.remove('active'));
        
        // Add active to current
        thumb.classList.add('active');
        
        // Swap main image src and alt
        const newSrc = thumb.querySelector('img').getAttribute('src');
        const newAlt = thumb.querySelector('img').getAttribute('alt');
        mainImg.setAttribute('src', newSrc);
        mainImg.setAttribute('alt', newAlt);
      });
    });
  }

  // 2. Size Button Activation
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Size selected: ${btn.textContent}`);
    });
  });

  // 3. Quantity Increment/Decrement
  const qtyInput = document.querySelector('.qty-input');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');

  if (qtyInput && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      qtyInput.value = currentVal + 1;
    });
  }

  // 4. Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('active');
    });
  });

  // 5. Buy Now Button Mock Alert
  const buyNowBtn = document.querySelector('.btn-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      showToast("Redirecting to secure payment checkout... (Mockup)");
    });
  }
}

/* --- Newsletter Submission Form Mock --- */
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== "") {
        showToast(`Thank you! "${emailInput.value}" is subscribed to UrbanCart newsletter.`);
        emailInput.value = "";
      }
    });
  }
}

/* --- Contact Page Form Interactivity --- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm && contactAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform very basic validation
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (name && email && subject && message) {
        // Show success alert message
        contactAlert.textContent = `Thank you, ${name}! Your message has been sent successfully. We will get back to you shortly.`;
        contactAlert.style.display = 'block';
        
        // Scroll to success message
        contactAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset the form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          contactAlert.style.display = 'none';
        }, 5000);
      } else {
        showToast("Please fill in all the required fields.");
      }
    });
  }
}
