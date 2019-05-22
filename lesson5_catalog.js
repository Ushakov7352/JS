//  дорабатываю задание по уроку6 (каталог)
function Product(id, title, price, image) {
   this.id = id;
   this.title = title;
   this.price = price;
   this.image = image;
}
var product1 = new Product('1', 'куртка', 26, 'img/Layer_4.jpg');
var product2 = new Product('2', 'платье', 28, 'img/Layer_5.jpg');
var product3 = new Product('3', 'платье', 34, 'img/Layer_6.jpg');
var product4 = new Product('4', 'пиджак', 40, 'img/Layer_7.jpg');
var product5 = new Product('5', 'брюки', 18, 'img/Layer_8.jpg');
var product6 = new Product('6', 'шорты', 26, 'img/Layer_9.jpg');

var $catalogProd = [product1, product2, product3, product4, product5, product6, ];

var cart = [];

function catalogView() {
   var $catalog = document.querySelector('#catalog');
   for (var i = 0; i < $catalogProd.length; i++) {
      var $template = document.querySelector('#template').children[0].cloneNode(true);
      $template.querySelector('.title').textContent = $catalogProd[i].title;
      $template.querySelector('.price').textContent = $catalogProd[i].price;
      $template.querySelector('.picture').src = $catalogProd[i].image;
      $template.querySelector('.button').dataset.id = $catalogProd[i].id;
      $template.querySelector('.button').dataset.title = $catalogProd[i].title;
      $template.querySelector('.button').dataset.price = $catalogProd[i].price;
      $template.querySelector('.button').dataset.image = $catalogProd[i].image;
      $catalog.appendChild($template);
   }
}


function findIdx(id) {
   for (i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
         return i;
      }
   }
}

function isExistInCart(id) {
   for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
         return true
      }
   }
   return false;
}

function handleBuyClick(event) {
   if (event.target.tagName === 'BUTTON') {
      if (isExistInCart(+event.target.dataset.id)) {
         var idx = findIdx(+event.target.dataset.id);
         cart[idx].quantity++;
      } else {
         cart.push({
            id: +event.target.dataset.id,
            title: event.target.dataset.title,
            price: +event.target.dataset.price,
            image: +event.target.dataset.image,
            quantity: 1
         });

      }
      countCartTotal(cart);

   }
}

function countCartTotal(item) {
   var total = 0;
   var count = 0;
   for (var i = 0; i < items.length; i++) {
      total += item[i].price * item[i].quantity;
      count += items[i].quantity;
   }
   var message = '';
   if (item.length) {
      message = ' В корзине   ' + count + '  товаров  на сумму ' + total + '  рублей';
   } else {
      message = 'Корзина пуста'
   }
   var $cart = document.getElementById('cart');
   $cart.textContent = message;
}

function init() {
   $catalog.addEventListener('click', handleBuyClick);
   catalogView();
   var $catalog = document.querySelector('#catalog');

}
window.addEventListener('load', init);
