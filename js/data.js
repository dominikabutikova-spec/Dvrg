/* ============================================================
   КАТАЛОГ «МИР ПОДАРКОВ»
   Все товары и фотографии предоставлены для проекта.
   ============================================================ */

const CATEGORIES = [
  {
    id: 'flowers',
    name: 'Цветы',
    desc: 'Живые и вечные букеты',
    img: 'products/purple-roses.jpg'
  },
  {
    id: 'sweets',
    name: 'Сладости',
    desc: 'Шоколад, ягоды и десерты',
    img: 'products/love-box.jpg'
  },
  {
    id: 'sets',
    name: 'Готовые наборы',
    desc: 'Всё продумано за вас',
    img: 'products/giftbox-roses-strawberries.jpg'
  },
  {
    id: 'toys',
    name: 'Игрушки и конструкторы',
    desc: 'Мягкие и не только',
    img: 'products/plush-fox.jpg'
  },
  {
    id: 'jewelry',
    name: 'Украшения',
    desc: 'Маленькие драгоценности',
    img: 'products/cosmic-jewelry-set.jpg'
  },
  {
    id: 'cards',
    name: 'Открытки',
    desc: 'Сделано вручную',
    img: 'products/postcard-cat-bouquet.jpg'
  }
];

const PRODUCTS = [
  /* Цветы — 5 */
  {
    id: 1, cat: 'flowers', name: 'Тёмный бархат', price: 5400,
    color: 'бордовый', desc: 'Бордовые лилии, эвкалипт и гипсофила в графитовой упаковке.',
    contents: '7 лилий, эвкалипт, гипсофила, открытка',
    badge: 'hit', img: 'products/dark-lilies.jpg', popularity: 93
  },
  {
    id: 2, cat: 'flowers', name: 'Лавандовый вечер', price: 4700,
    color: 'лавандовый', desc: 'Лавандовые и фиолетовые розы с белой гипсофилой.',
    contents: '25 роз, гипсофила, упаковка',
    badge: '', img: 'products/purple-roses.jpg', popularity: 87
  },
  {
    id: 3, cat: 'flowers', name: 'Светящийся конструктор', price: 6900,
    color: 'нежный', desc: 'Букет из 756 деталей с тёплой гирляндой — цветы, которые не завянут.',
    contents: 'конструктор, ваза, гирлянда',
    badge: 'new', img: 'products/lego-flower-lights.jpg', popularity: 90
  },
  {
    id: 4, cat: 'flowers', name: 'Розовые розы из деталей', price: 5900,
    color: 'розовый', desc: 'Букет роз из 789 деталей с белыми полевыми цветами.',
    contents: '789 деталей, схема сборки',
    badge: '', img: 'products/lego-pink-roses.jpg', popularity: 84
  },
  {
    id: 5, cat: 'flowers', name: 'Цветы под стеклом', price: 1900,
    color: 'микс', desc: 'Мини-букет в стеклянном куполе: роза, ландыши или ромашки.',
    contents: 'мини-букет, купол, подсветка',
    badge: 'new', img: 'products/flower-domes.jpg', popularity: 80
  },

  /* Сладости — 6 */
  {
    id: 6, cat: 'sweets', name: 'Гранат в шоколаде', price: 2200,
    color: 'гранатовый', desc: 'Половинки граната в тёмном и белом шоколаде с золотым блеском.',
    contents: '8 половинок, подарочная коробка',
    badge: 'hit', img: 'products/pomegranate-chocolate.jpg', popularity: 92
  },
  {
    id: 7, cat: 'sweets', name: 'Сердце на 14 февраля', price: 5900,
    color: 'красный', desc: 'Клубника, малина, голубика и трюфели в коробке-сердце.',
    contents: 'ягоды, шоколад, коробка-сердце',
    badge: 'hit', img: 'products/heart-strawberries.jpg', popularity: 97
  },
  {
    id: 8, cat: 'sweets', name: 'LOVE-бокс', price: 7500,
    color: 'алый', desc: 'Коробка в форме слова LOVE с ягодами и шоколадными конфетами.',
    contents: '4 секции, ягоды, конфеты',
    badge: 'hit', img: 'products/love-box.jpg', popularity: 99
  },
  {
    id: 9, cat: 'sweets', name: 'Фруктовый сад', price: 2400,
    color: 'розовый', desc: 'Шоколадные фрукты и ягоды ручной работы в розовой коробке.',
    contents: '9 фигур, коробка',
    badge: 'new', img: 'products/fruit-chocolates.jpg', popularity: 88
  },
  {
    id: 10, cat: 'sweets', name: 'Шоколадные медальоны', price: 2800,
    color: 'бежевый', desc: 'Четыре медальона с малиной, ежевикой, голубикой и золотой пудрой.',
    contents: '4 медальона, коробка',
    badge: '', img: 'products/chocolate-medallions.jpg', popularity: 82
  },
  {
    id: 11, cat: 'sweets', name: 'Сладкий сюрприз', price: 3500,
    color: 'ассорти', desc: 'Коробка любимых сладостей: Kinder, Snickers, KitKat и Oreo.',
    contents: '12 сладостей, коробка',
    badge: '', img: 'products/sweets-box.jpg', popularity: 79
  },

  /* Готовые наборы — 4 */
  {
    id: 12, cat: 'sets', name: 'Шкатулка «Розовый сад»', price: 6900,
    color: 'розовый', desc: 'Пионы, розы, гвоздики и клубника в шоколаде в шляпной коробке.',
    contents: 'цветы, 12 ягод, коробка',
    badge: 'hit', img: 'products/giftbox-roses-strawberries.jpg', popularity: 96
  },
  {
    id: 13, cat: 'sets', name: 'Клубника в цветах', price: 6500,
    color: 'пудровый', desc: 'Розовая коробка с клубникой в шоколаде и живыми цветами.',
    contents: 'цветы, 10 ягод, лента',
    badge: 'new', img: 'products/strawberries-and-flowers.jpg', popularity: 91
  },
  {
    id: 14, cat: 'sets', name: 'Шоколадная корзина', price: 8900,
    color: 'коричневый', desc: 'Какао, конфеты Lindor, печенье, трюфели и свеча в плетёной корзине.',
    contents: 'какао, конфеты, свеча, корзина',
    badge: 'hit', img: 'products/chocolate-basket.jpg', popularity: 89
  },
  {
    id: 15, cat: 'sets', name: 'Тёплый вечер', price: 4900,
    color: 'бежевый', desc: 'Кружка, мишка, какао и маршмеллоу для уютного вечера.',
    contents: 'кружка, мишка, какао, маршмеллоу',
    badge: 'hit', img: 'products/cozy-cocoa-set.jpg', popularity: 88
  },

  /* Игрушки и конструкторы — 6 */
  {
    id: 16, cat: 'toys', name: 'Оленёнок Лу', price: 2400,
    color: 'бежевый', desc: 'Мягкий оленёнок с рожками, 30 см.',
    contents: 'игрушка 30 см',
    badge: 'new', img: 'products/plush-deer.jpg', popularity: 86
  },
  {
    id: 17, cat: 'toys', name: 'Акула Бублик', price: 1900,
    color: 'бирюзовый', desc: 'Плюшевая акула 40 см, которую хочется обнять.',
    contents: 'игрушка 40 см',
    badge: '', img: 'products/plush-shark.jpg', popularity: 81
  },
  {
    id: 18, cat: 'toys', name: 'Лисёнок Рыжик', price: 2200,
    color: 'рыжий', desc: 'Пушистый лисёнок 25 см с большими ушами.',
    contents: 'игрушка 25 см',
    badge: 'hit', img: 'products/plush-fox.jpg', popularity: 90
  },
  {
    id: 19, cat: 'toys', name: 'Змейка Матча', price: 1800,
    color: 'зелёный', desc: 'Мягкая змейка-обнимашка 60 см.',
    contents: 'игрушка 60 см',
    badge: 'new', img: 'products/plush-snake.jpg', popularity: 83
  },
  {
    id: 20, cat: 'toys', name: 'Конструктор «Рок-гитара»', price: 12900,
    color: 'красный', desc: 'Коллекционный набор из 1074 деталей с гитарой и усилителем.',
    contents: '1074 детали, инструкция',
    badge: 'hit', img: 'products/lego-guitar.jpg', popularity: 94
  },
  {
    id: 21, cat: 'toys', name: 'Конструктор «Крипер»', price: 4500,
    color: 'зелёный', desc: 'Зелёный кубический персонаж из 665 деталей.',
    contents: '665 деталей, инструкция',
    badge: '', img: 'products/lego-creeper.jpg', popularity: 80
  },

  /* Украшения — 9 */
  {
    id: 22, cat: 'jewelry', name: 'Крылья бабочки', price: 2900,
    color: 'синий', desc: 'Серьги из прозрачной смолы с синими крыльями и кристаллами.',
    contents: 'серьги, подарочная коробка',
    badge: 'new', img: 'products/butterfly-earrings.jpg', popularity: 85
  },
  {
    id: 23, cat: 'jewelry', name: 'Красный клён', price: 3400,
    color: 'красный', desc: 'Серьги с красными кристаллами и подвесками-цепочками.',
    contents: 'серьги, коробка',
    badge: '', img: 'products/red-maple-earrings.jpg', popularity: 78
  },
  {
    id: 24, cat: 'jewelry', name: 'Космический набор', price: 4800,
    color: 'серебряный', desc: 'Колье, серьги и браслет с лунами, звёздами и синими камнями.',
    contents: '3 предмета, шкатулка',
    badge: 'hit', img: 'products/cosmic-jewelry-set.jpg', popularity: 93
  },
  {
    id: 25, cat: 'jewelry', name: 'Путеводная звезда', price: 3600,
    color: 'золотой', desc: 'Золотое колье с звездой и розовым кристаллом.',
    contents: 'колье, коробка',
    badge: '', img: 'products/star-necklace.jpg', popularity: 84
  },
  {
    id: 26, cat: 'jewelry', name: 'Над луной', price: 5200,
    color: 'золотой', desc: 'Браслет, колье и серьги с ночным небом и золотыми звёздами.',
    contents: '3 предмета, шкатулка',
    badge: 'hit', img: 'products/moon-jewelry-set.jpg', popularity: 95
  },
  {
    id: 27, cat: 'jewelry', name: 'Лунный цветок', price: 1900,
    color: 'лавандовый', desc: 'Плетёный браслет с лавандовыми цветами и месяцем.',
    contents: 'браслет, регулируемая застёжка',
    badge: 'new', img: 'products/flower-bracelet.jpg', popularity: 82
  },
  {
    id: 28, cat: 'jewelry', name: 'Цветочная корона', price: 4200,
    color: 'розовый', desc: 'Ободок с прозрачными цветами, кристаллами и цепочками.',
    contents: 'ободок, кристаллы',
    badge: 'new', img: 'products/crystal-crown.jpg', popularity: 87
  },
  {
    id: 29, cat: 'jewelry', name: 'Роза в серебре', price: 4900,
    color: 'серебряный', desc: 'Серебряное кольцо с цветком и красным камнем.',
    contents: 'кольцо, коробка',
    badge: '', img: 'products/rose-ring.jpg', popularity: 81
  },
  {
    id: 30, cat: 'jewelry', name: 'Цветочные шпильки', price: 2200,
    color: 'розовый', desc: 'Шпильки с розовыми и золотыми цветами, жемчугом и подвесками.',
    contents: '2 шпильки, коробка',
    badge: 'new', img: 'products/flower-hairpins.jpg', popularity: 86
  },

  /* Открытки — 5 */
  {
    id: 31, cat: 'cards', name: 'Кот с букетом', price: 350,
    color: 'кремовый', desc: 'Открытка ручной работы с чёрным котом и цветами.',
    contents: 'открытка, крафт-конверт',
    badge: 'hit', img: 'products/postcard-cat-bouquet.jpg', popularity: 90
  },
  {
    id: 32, cat: 'cards', name: 'Самый любимый', price: 450,
    color: 'белый', desc: 'Открытка с котиками и тёплой надписью.',
    contents: 'открытка, конверт',
    badge: '', img: 'products/postcard-cats-love.jpg', popularity: 78
  },
  {
    id: 33, cat: 'cards', name: 'Котики и любовь', price: 300,
    color: 'розовый', desc: 'Милая открытка с котиками и признанием.',
    contents: 'открытка, конверт',
    badge: 'new', img: 'products/postcard-cats-we.jpg', popularity: 80
  },
  {
    id: 34, cat: 'cards', name: 'Нежные цветы', price: 400,
    color: 'голубой', desc: 'Открытка с голубыми цветами и акварельными деталями.',
    contents: 'открытка, конверт',
    badge: '', img: 'products/postcard-blue-flowers.jpg', popularity: 75
  },
  {
    id: 35, cat: 'cards', name: 'Лесной огонёк', price: 450,
    color: 'зелёный', desc: 'Новогодняя открытка с ёлочкой, снежинками и золотыми деталями.',
    contents: 'открытка, конверт',
    badge: 'new', img: 'products/christmas-card.jpg', popularity: 84
  }
];

const PACKAGING = [
  {
    id: 'kraft', name: 'Крафт-бокс с лентой', short: 'Крафт-бокс',
    price: 350, tag: 'Классика',
    desc: 'Плотный картон, атласная лента в тон и открытка внутри.',
    art: 'box', variant: 0
  },
  {
    id: 'heart', name: 'Коробка-сердце', short: 'Коробка-сердце',
    price: 550, tag: 'Романтика',
    desc: 'Бархатная лента, розовая бумага и место для маленького сюрприза.',
    art: 'heart', variant: 1
  },
  {
    id: 'hat', name: 'Шляпная коробка', short: 'Шляпная коробка',
    price: 650, tag: 'Премиум',
    desc: 'Круглая коробка с крышкой и цветком-комплиментом.',
    art: 'hat', variant: 2
  },
  {
    id: 'basket', name: 'Плетёная корзина', short: 'Корзина',
    price: 750, tag: 'Эко-стиль',
    desc: 'Корзина с льняной подкладкой и сухоцветами.',
    art: 'basket', variant: 3
  },
  {
    id: 'envelope', name: 'Конверт с сургучом', short: 'Конверт',
    price: 250, tag: 'Мини',
    desc: 'Для открытки, сертификата или денежного подарка.',
    art: 'envelope', variant: 4
  },
  {
    id: 'custom', name: 'Упаковка на заказ', short: 'Своя упаковка',
    price: 800, tag: 'Индивидуально',
    desc: 'Подберём цвет, декор и размер под ваш подарок.',
    art: 'custom', variant: 3
  }
];

const BOXES = PACKAGING.slice(0, 4).map(function (item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    color: item.tag,
    desc: item.desc,
    art: item.art,
    variant: item.variant
  };
});

const FILLINGS = [
  {
    id: 'f1', name: 'Шоколадные конфеты', price: 450,
    type: 'Сладости', color: 'ассорти', icon: 'candy'
  },
  {
    id: 'f2', name: 'Мини-мишка', price: 650,
    type: 'Игрушка', color: 'карамельный', icon: 'toy'
  },
  {
    id: 'f3', name: 'Открытка с вашим текстом', price: 150,
    type: 'Открытка', color: 'кремовый', icon: 'card'
  },
  {
    id: 'f4', name: 'Свеча «Сакура»', price: 550,
    type: 'Дом', color: 'розовый', icon: 'candle'
  },
  {
    id: 'f5', name: 'Кофе в зёрнах', price: 500,
    type: 'Кофе', color: 'коричневый', icon: 'coffee'
  },
  {
    id: 'f6', name: 'Чайный набор', price: 450,
    type: 'Чай', color: 'оливковый', icon: 'tea'
  },
  {
    id: 'f7', name: 'Воздушный шар', price: 250,
    type: 'Шар', color: 'пудровый', icon: 'balloon'
  },
  {
    id: 'f8', name: 'Веточка эвкалипта', price: 300,
    type: 'Флористика', color: 'зелёный', icon: 'flower'
  }
];
