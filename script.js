var product = {
  plainBurger: {
    name: 'Гамбургер простой',
    cost: 10000,
    kcall: 400,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumkcall() {
      return this.amount * this.kcall;
    }
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    cost: 20500,
    kcall: 500,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumkcall() {
      return this.amount * this.kcall;
    }
  },
  freshCombo: {
    name: 'FRESH COMBO',
    cost: 31900,
    kcall: 700,
    amount: 0,
    get summ() {
      return this.amount * this.cost;
    },
    get sumkcall() {
      return this.amount * this.kcall;
    }
  }
}

var extraProduct = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    cost: 500,
    kcall: 60
  },
  lettuce: {
    name: 'Салатный лист',
    cost: 300,
    kcall: 20
  },
  cheese: {
    name: 'Сыр',
    cost: 1000,
    kcall: 500
  },
}

const btn = document.querySelectorAll('.main__product-btn');


btn.forEach(el => {

  el.addEventListener('click', function (e) {
    e.preventDefault();
    add(this)
  })

})

function add(button) {

  // button.getAttribute("name") - вернеит значение атрибута
  // button.setAttribute("name", vale) - добавит атрибут и значение для него
  // button.hasAttribute("name") - проверяет наличие атрибута
  // button.removeAttribute("name") - удаляет атрибут

  let simbol = button.getAttribute('data-symbol');
  const parent = button.closest('.main__product');
  let id = parent.getAttribute('id');

  if (simbol == '+') {
    product[id].amount++
  }
  else if (product[id].amount > 0) {
    product[id].amount--
  }

  let output = parent.querySelector('.main__product-num');
  let productPrice = parent.querySelector('.main__product-price span');
  let productKcall = parent.querySelector('.main__product-kcall span');
  output.innerHTML = product[id].amount;
  productPrice.innerHTML = product[id].summ;
  productKcall.innerHTML = product[id].sumkcall;

  // console.log(productKcall);

}

const checkbox = document.querySelectorAll('.main__product-checkbox');

checkbox.forEach(el => {
  el.addEventListener('click', function () {
    addIngredient(this);
  })
})

function addIngredient(check) {
  let parent = check.closest('.main__product');
  let parentId = parent.getAttribute('id');
  let checkId = check.getAttribute('data-extra');
  let checked = check.checked;

  product[parentId][checkId] = checked;

  if (product[parentId][checkId] == true) {
    product[parentId].cost += extraProduct[checkId].cost;
    product[parentId].kcall += extraProduct[checkId].kcall;
  } else {
    product[parentId].cost -= extraProduct[checkId].cost;
    product[parentId].kcall -= extraProduct[checkId].kcall;
  }

  let cost = parent.querySelector('.main__product-price span');
  let kcall = parent.querySelector('.main__product-kcall span');

  cost.innerHTML = product[parentId].summ;
  kcall.innerHTML = product[parentId].sumkcall;
  // console.log(product[parentId]);
}

const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
const receiptWindowBtn = document.querySelector('.receipt__window-btn');

let arrProduct = [],
  totalName = '',
  totalPrice = 10000,
  totalKcall = 0;

addCart.addEventListener('click', function () {

  for (const key in product) {
    const el = product[key];
    if (el.amount > 0) {
      arrProduct.push(el)
      for (const key2 in el) {
        if (el[key2] === true) {
          el.name += "\n" + extraProduct[key2].name;
        }
      }
    }
  }
  for (let i = 0; i < arrProduct.length; i++) {
    const element = arrProduct[i];
    totalName += element.name + "\n" + `В количестве: ${element.amount} шт.\n\n`;
    totalPrice += element.summ;
    totalKcall += element.sumkcall;
  }

  receiptWindowOut.innerHTML = `<h1>Вы заказали</h1> \n\n <h3>${totalName}\nКаллорийность: ${totalKcall}\nСтоимость покупки с доставкой: ${totalPrice}сумм</h3>`

  if (totalKcall > 0) {
    receipt.style.display = "flex";
    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = '50%';
      receiptWindow.style.transform = 'translateY(-50%)';
    }, 100);
    document.body.style.overflow = 'hidden';
  }

  let productNum = document.querySelectorAll('.main__product-num');
  let productPrice = document.querySelectorAll('.main__product-price span');
  let productKcall = document.querySelectorAll('.main__product-kcall span');

  productNum.forEach((el, i) => {
    el.innerHTML = 0;
    productPrice[i].innerHTML = 0;
    productKcall[i].innerHTML = 0;
  });

  console.log(receiptWindowOut);
})

receiptWindowBtn.addEventListener('click', ()=> {
  window.location.reload();
})

let timer = document.querySelector('.header__timer-extra');

function start(e) {  

  setTimeout(() => {
    
    if(timer.innerHTML >= 0 && timer.innerHTML < 50){
      timer.innerHTML++;
      start(10);
    }
    else if(timer.innerHTML >= 50 && timer.innerHTML < 70){
      timer.innerHTML++;
      start(50);
    }
    else if(timer.innerHTML >= 70 && timer.innerHTML < 90){
      timer.innerHTML++;
      start(80);
    }
    else if(timer.innerHTML >= 90 && timer.innerHTML < 97){
      timer.innerHTML++;
      start(120);
    }
    else if(timer.innerHTML >= 97 && timer.innerHTML < 100){
      timer.innerHTML++;
      start(200);
    }
  }, e);
}

start();

const productInfo = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewImg = document.querySelector('.view img');
const viewClose = document.querySelector('.view__close');

productInfo.forEach(item => {
  item.addEventListener('dblclick', function () {  
    openImg(this)
  })
})

function openImg(el) {  
  view.classList.add('active');
  let img = el.querySelector('.main__product-info img');
  let imgSrs = img.getAttribute('src');
  viewImg.setAttribute('src', imgSrs);
}

viewClose.addEventListener('click', ()=> {
  view.classList.remove('active');
})




  // Сылка на объект

// var user = {
//   name: 'Вася'
// };
// var user2 = user;

// console.log(user, user2);

// user2.name = 'Петя';
// console.log(user, user2);