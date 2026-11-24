/* ============================================================
   ЗАКАЗЫ
   ============================================================ */

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function createOrder(address, phone, comment, recipientName) {
  const user = currentUser();
  if (!user) throw new Error('Требуется вход в аккаунт');
  const cart = getCart();
  if (!cart.length) throw new Error('Корзина пуста');

  const orders = getOrders();
  const id = orders.length ? Math.max.apply(null, orders.map(function (order) { return order.id; })) + 1 : 1;
  const now = new Date().toISOString();

  const order = {
    id: id,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    recipientName: recipientName || user.name,
    address: address,
    phone: phone,
    comment: comment || '',
    items: cart.map(function (item) { return Object.assign({}, item); }),
    total: cartTotal(),
    status: 'new',
    createdAt: now,
    updatedAt: now,
    assemblerId: null,
    courierId: null,
    receivedAt: null,
    rating: null,
    review: '',
    ratedAt: null,
    history: [{ status: 'new', at: now, by: user.id }]
  };

  orders.push(order);
  saveOrders(orders);
  clearCart();
  return order;
}

function updateOrderStatus(orderId, status, workerId, workerRole) {
  const orders = getOrders();
  const order = orders.find(function (item) { return item.id === orderId; });
  if (!order) return false;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  order.history = order.history || [];
  order.history.push({ status: status, at: order.updatedAt, by: workerId || null, role: workerRole || 'admin' });

  if (workerRole === 'assembler' && workerId) order.assemblerId = workerId;
  if (workerRole === 'courier' && workerId) order.courierId = workerId;

  saveOrders(orders);
  return true;
}

function getOrdersByUser(userId) {
  return getOrders().filter(function (order) { return order.userId === userId; }).reverse();
}

function getOrdersByStatus(statuses) {
  return getOrders().filter(function (order) { return statuses.indexOf(order.status) !== -1; });
}

function confirmReceived(orderId) {
  const user = currentUser();
  if (!user) throw new Error('Требуется вход');
  const orders = getOrders();
  const order = orders.find(function (item) { return item.id === orderId; });
  if (!order) throw new Error('Заказ не найден');
  if (order.userId !== user.id) throw new Error('Это не ваш заказ');
  if (order.status !== 'done') throw new Error('Заказ ещё не доставлен');
  order.receivedAt = new Date().toISOString();
  saveOrders(orders);
  return order;
}

function rateOrder(orderId, rating, review) {
  const user = currentUser();
  if (!user) throw new Error('Требуется вход');
  const orders = getOrders();
  const order = orders.find(function (item) { return item.id === orderId; });
  if (!order) throw new Error('Заказ не найден');
  if (order.userId !== user.id) throw new Error('Это не ваш заказ');
  if (order.status !== 'done') throw new Error('Сначала дождитесь доставки');
  if (!order.receivedAt) throw new Error('Сначала подтвердите получение');

  rating = Number(rating);
  if (rating < 1 || rating > 5) throw new Error('Оценка должна быть от 1 до 5');

  order.rating = rating;
  order.review = (review || '').trim();
  order.ratedAt = new Date().toISOString();
  saveOrders(orders);
  return order;
}

function getAllRatings() {
  return getOrders()
    .filter(function (order) { return order.rating; })
    .map(function (order) {
      return {
        orderId: order.id,
        userName: order.userName,
        rating: order.rating,
        review: order.review,
        date: order.ratedAt
      };
    })
    .reverse();
}

function getAverageRating() {
  const ratings = getAllRatings();
  if (!ratings.length) return 0;
  return ratings.reduce(function (sum, item) { return sum + item.rating; }, 0) / ratings.length;
}

const STATUS_LABELS = {
  new: 'Новый',
  assembling: 'Собирается',
  assembled: 'Собран',
  delivering: 'В доставке',
  done: 'Доставлен',
  canceled: 'Отменён'
};
