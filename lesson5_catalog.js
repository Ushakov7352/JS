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

function catalogView() {
   var $catalog = document.querySelector('#catalog');
   for (var i = 0; i < $catalogProd.length; i++) {
      var $template = document.querySelector('#template').children[0].cloneNode(true);
      $template.querySelector('.title').textContent = $catalogProd[i].title;
      $template.querySelector('.price').textContent = $catalogProd[i].price;
      $template.querySelector('.button').dataset.id = $catalogProd[i].id;
      $template.querySelector('.picture').src = $catalogProd[i].image;
      $catalog.appendChild($template);
   }
}



function init() {
   catalogView();
}
window.addEventListener('load', init);
