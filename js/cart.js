/* ============================================================
   КОРЗИНА
   ============================================================ */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();
  const index = cart.findIndex(function (cartItem) {
    return cartItem.name === item.name &&
      (cartItem.custom_data || '') === (item.custom_data || '');
  });

  if (index >= 0) {
    cart[index].qty += (item.qty || 1);
  } else {
    cart.push({
      type: item.type || 'product',
      name: item.name,
      price: Number(item.price),
      qty: item.qty || 1,
      img: item.img || '',
      art: item.art || '',
      variant: item.variant || 0,
      cat: item.cat || '',
      custom_data: item.custom_data || ''
    });
  }

  saveCart(cart);
  if (typeof showToast === 'function') showToast('Добавлено в корзину', 'success');
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function changeQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(cart);
}

function cartTotal() {
  return getCart().reduce(function (sum, item) {
    return sum + item.price * item.qty;
  }, 0);
}

function cartCount() {
  return getCart().reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
}

function clearCart() {
  saveCart([]);
}

function updateCartCount() {
  const elements = document.querySelectorAll('.cart-link .count, .cart-count');
  elements.forEach(function (element) {
    element.textContent = cartCount();
  });
}
