//  дорабатываю задание по уроку6 (каталог)
function Product(id, title, price, image) {
   this.id = id;
   this.title = title;
   this.price = price;
   this.image = image;
}
var product1 = new Product(' 134 ', '  куртка    ', 26, 'img/Layer_4m.jpg');
var product2 = new Product(' 256  ', ' платье   ', 28, 'img/Layer_5m.jpg');
var product3 = new Product(' 343  ', ' платье   ', 34, 'img/Layer_6m.jpg');
var $catalogProd = [product1, product2, product3, ];

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

function cartView() {
   $cartview = document.querySelector('.cartview');
   var $id = document.createElement('p');
   var $name=document.createElement('span');
   var $price=document.createElement('span');
   var $quantity=document.createElement('span');
   
   for (var i = 0; i < cart.length; i++) {
      $id.textContent = cart[i].id;
      $name.textContent = cart[i].title;
      $price.textContent = cart[i].price;
      $quantity.textContent = cart[i].quantity;
      $id.appendChild($quantity);
      $cartview.appendChild($id);
      $id.appendChild($name);
      //$id.appendChild($price);
      $id.appendChild($quantity);
      $cartview.appendChild($id);
      
      
      
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
   event.preventDefault();
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
      cartView();

   }
   if (event.target.tagName === 'IMG') {
      var $overlay = document.querySelector('.overlay');
      $overlay.style.display = 'block';
      $overlay.querySelector('.preview').src = event.target.src;
   }
}

function countCartTotal(items) {
   var total = 0;
   var count = 0;
   for (var i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
      count += items[i].quantity;
   }
   var message = '';
   if (items.length) {
      message = ' В корзине   ' + count + '  товаров  на сумму ' + total + '  рублей';
   } else {
      message = 'Корзина пуста'
   }
   var $cart = document.getElementById('cart');
   $cart.textContent = message;
}

function handleCloseClick() {
   var $overlay = document.querySelector('.overlay');
   $overlay.style.display = 'none';

}

function init() {
   catalogView();
   var $catalog = document.querySelector('#catalog');
   $catalog.addEventListener('click', handleBuyClick);

   var $close = document.querySelector('.close');
   $close.addEventListener('click', handleCloseClick);

}
window.addEventListener('load', init);
