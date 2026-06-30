/* ========================================
   Menu Filtering & Cart System
   ======================================== */

// Menu Data
const menuItems = [
  // Drinks
  {
    id: 1, name: 'Sakura Matcha Latte', nameJp: '桜抹茶ラテ', category: 'drinks',
    description: 'Creamy matcha latte with cherry blossom syrup and latte art',
    price: 6.50, emoji: '🍵', badge: 'Popular',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 2, name: 'Momo\'s Boba Tea', nameJp: 'ももボバティー', category: 'drinks',
    description: 'Classic brown sugar milk tea with chewy tapioca pearls',
    price: 7.00, emoji: '🧋', badge: null,
    image: 'assets/images/menu-food.png'
  },
  {
    id: 3, name: 'Lavender Dream Latte', nameJp: 'ラベンダーラテ', category: 'drinks',
    description: 'Fragrant lavender-infused latte with vanilla cream',
    price: 6.00, emoji: '💜', badge: null,
    image: 'assets/images/menu-food.png'
  },
  {
    id: 4, name: 'Strawberry Fizz Soda', nameJp: 'いちごソーダ', category: 'drinks',
    description: 'Sparkling strawberry soda with fresh fruit slices',
    price: 5.50, emoji: '🍓', badge: 'New',
    image: 'assets/images/menu-food.png'
  },
  // Food
  {
    id: 5, name: 'Soufflé Pancakes', nameJp: 'スフレパンケーキ', category: 'food',
    description: 'Jiggly Japanese soufflé pancakes with maple & berry compote',
    price: 12.00, emoji: '🥞', badge: 'Chef\'s Pick',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 6, name: 'Neko Onigiri Set', nameJp: '猫おにぎりセット', category: 'food',
    description: 'Cute cat-shaped rice balls with salmon, umeboshi & tuna',
    price: 10.00, emoji: '🍙', badge: null,
    image: 'assets/images/menu-food.png'
  },
  {
    id: 7, name: 'Anime Ramen Bowl', nameJp: 'アニメラーメン', category: 'food',
    description: 'Rich tonkotsu ramen with naruto fish cake and soft egg',
    price: 14.00, emoji: '🍜', badge: 'Popular',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 8, name: 'Kawaii Bento Box', nameJp: 'かわいい弁当', category: 'food',
    description: 'Character-styled bento with teriyaki, tempura & pickles',
    price: 15.00, emoji: '🍱', badge: null,
    image: 'assets/images/menu-food.png'
  },
  // Desserts
  {
    id: 9, name: 'Strawberry Parfait', nameJp: 'いちごパフェ', category: 'desserts',
    description: 'Layered parfait with fresh strawberries, cream & granola',
    price: 9.00, emoji: '🍨', badge: 'Popular',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 10, name: 'Mochi Ice Cream', nameJp: 'もちアイス', category: 'desserts',
    description: 'Assorted mochi ice cream — matcha, strawberry & taro',
    price: 8.00, emoji: '🍡', badge: null,
    image: 'assets/images/menu-food.png'
  },
  {
    id: 11, name: 'Sakura Cheesecake', nameJp: '桜チーズケーキ', category: 'desserts',
    description: 'Fluffy Japanese cheesecake with cherry blossom glaze',
    price: 8.50, emoji: '🍰', badge: 'New',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 12, name: 'Taiyaki Waffle', nameJp: 'たい焼きワッフル', category: 'desserts',
    description: 'Fish-shaped waffle filled with red bean & custard cream',
    price: 7.00, emoji: '🐟', badge: null,
    image: 'assets/images/menu-food.png'
  },
  // Specials
  {
    id: 13, name: 'Ghibli Forest Cake', nameJp: 'ジブリフォレストケーキ', category: 'specials',
    description: 'A magical matcha forest cake with edible flowers & mochi',
    price: 18.00, emoji: '🌿', badge: '✨ Limited',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 14, name: 'Moon Rabbit Set', nameJp: '月うさぎセット', category: 'specials',
    description: 'Seasonal combo: dango, matcha & rabbit-themed sweets',
    price: 16.00, emoji: '🐰', badge: 'Seasonal',
    image: 'assets/images/menu-food.png'
  },
  {
    id: 15, name: 'Dragon Roll Platter', nameJp: 'ドラゴンロール', category: 'specials',
    description: 'Epic sushi roll platter with spicy mayo & avocado dragon',
    price: 22.00, emoji: '🐉', badge: '✨ Limited',
    image: 'assets/images/menu-food.png'
  },
];

class MenuSystem {
  constructor() {
    this.currentFilter = 'all';
    this.cart = this.loadCart();
    this.init();
  }

  init() {
    this.renderMenu();
    this.bindFilters();
    this.updateCartUI();
  }

  renderMenu(filter = 'all') {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === filter);

    grid.innerHTML = '';

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `menu-card reveal delay-${(index % 4) + 1}`;
      card.innerHTML = `
        <div class="menu-card-image">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;background:linear-gradient(135deg, var(--sakura-50), var(--lavender-50));">
            ${item.emoji}
          </div>
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <div class="menu-card-name">${item.name}</div>
          <div class="menu-card-jp">${item.nameJp}</div>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">$${item.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${item.id}" aria-label="Add ${item.name} to cart" id="add-cart-${item.id}">+</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-trigger reveal animations
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('revealed');
      });
    }, 50);

    // Bind add-to-cart buttons
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        this.addToCart(id);
        e.target.classList.add('added');
        e.target.textContent = '✓';
        setTimeout(() => {
          e.target.classList.remove('added');
          e.target.textContent = '+';
        }, 1000);
      });
    });
  }

  bindFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderMenu(this.currentFilter);
      });
    });
  }

  // Cart Methods
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('sakura-cart')) || [];
    } catch {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem('sakura-cart', JSON.stringify(this.cart));
  }

  addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(c => c.id === itemId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ id: itemId, qty: 1 });
    }

    this.saveCart();
    this.updateCartUI();
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter(c => c.id !== itemId);
    this.saveCart();
    this.updateCartUI();
    this.renderCartDrawer();
  }

  updateQty(itemId, delta) {
    const item = this.cart.find(c => c.id === itemId);
    if (!item) return;
    
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.saveCart();
    this.updateCartUI();
    this.renderCartDrawer();
  }

  getCartTotal() {
    return this.cart.reduce((total, cartItem) => {
      const item = menuItems.find(i => i.id === cartItem.id);
      return total + (item ? item.price * cartItem.qty : 0);
    }, 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.qty, 0);
  }

  updateCartUI() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getCartCount();
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
      if (count > 0) {
        badge.style.animation = 'none';
        badge.offsetHeight; // trigger reflow
        badge.style.animation = 'badgeBounce 0.4s ease';
      }
    }
  }

  renderCartDrawer() {
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    if (!cartItems) return;

    if (this.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <p style="font-size:0.85rem; margin-top:0.5rem;">Add some delicious items!</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = this.cart.map(cartItem => {
        const item = menuItems.find(i => i.id === cartItem.id);
        if (!item) return '';
        return `
          <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${(item.price * cartItem.qty).toFixed(2)}</div>
            </div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="window.menuSystem.updateQty(${item.id}, -1)">−</button>
              <span>${cartItem.qty}</span>
              <button class="qty-btn" onclick="window.menuSystem.updateQty(${item.id}, 1)">+</button>
            </div>
          </div>
        `;
      }).join('');
    }

    if (subtotalEl) {
      subtotalEl.textContent = `$${this.getCartTotal().toFixed(2)}`;
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartUI();
    this.renderCartDrawer();
  }
}

// Export
window.MenuSystem = MenuSystem;
