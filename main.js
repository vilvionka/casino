
let slides1 = document.querySelectorAll('.spin_one .casino_body_wrap_spin_item');
let slides2 = document.querySelectorAll('.spin_too .casino_body_wrap_spin_item');
let slides3 = document.querySelectorAll('.spin_three .casino_body_wrap_spin_item');
let spin = document.querySelector('.casino_footer_btn_spin');
let price = document.querySelector('.casino_footer_calc_num span');
let total = document.querySelector('.casino_header_cash span');
let star = document.querySelector('.casino_header_star_points span');
let messageWin = document.querySelector('.casino_footer_win')
let minus = document.querySelector('.casino_footer_calc_minus');
let plus = document.querySelector('.casino_footer_calc_plus');
let auto = document.querySelector('.js_active_auto');
let win1 = document.querySelector('.casino_body_wrap_win1')
let win2 = document.querySelector('.casino_body_wrap_win2')
let win3 = document.querySelector('.casino_body_wrap_win3')
let win4 = document.querySelector('.casino_body_wrap_win4')
let win5 = document.querySelector('.casino_body_wrap_win5')
let win6 = document.querySelector('.casino_body_wrap_win6')
let arr = [];
let flag = true;

for (let i = 0; i < slides1.length; i++) {
  arr[i] = slides1[i].getAttribute('src');
  slides1[i].remove();
}
for (let i = 0; i < slides2.length; i++) {
  slides2[i].remove();
}
for (let i = 0; i < slides3.length; i++) {
  slides3[i].remove();
}

star.innerHTML = localStorage.getItem('starLocal') || '500';
total.innerHTML = localStorage.getItem('totalLocal') || '1000000'



for (let i = 0; i < 3; i++) {
  let img = document.createElement('img');
  img.src = arr[i];
  img.classList.add('casino_body_wrap_spin_item')
  document.querySelector('.spin_one').appendChild(img)
}
for (let i = 3; i < 6; i++) {
  let img = document.createElement('img');
  img.src = arr[i];
  img.classList.add('casino_body_wrap_spin_item')
  document.querySelector('.spin_too').appendChild(img)
}
for (let i = 6; i < 9; i++) {
  let img = document.createElement('img');
  img.src = arr[i];
  img.classList.add('casino_body_wrap_spin_item')
  document.querySelector('.spin_three').appendChild(img)
}

minus.onclick = minusCalc;
plus.onclick = plusCalc;
spin.onclick = fullSpin;
auto.onclick = autoSpin;


function autoSpin() {
  auto.classList.toggle('active');
  if (auto.classList.contains('active')) {
    setIntervalId = setInterval(() => {
      fullSpin();
    }, 1150);
  } else {
    clearTimeout(setIntervalId);
  }
}


function minusCalc() {
  let priceNumber = Number(price.innerHTML);
  price.innerHTML = priceNumber - 10000;
  if (price.innerHTML < 10000) {
    price.innerHTML = 10000
  }
}
function plusCalc() {
  let priceNumber2 = Number(price.innerHTML);
  price.innerHTML = priceNumber2 + 10000;
}

function reset() {
  win1.classList.remove('active');
  win2.classList.remove('active');
  win3.classList.remove('active');
  win4.classList.remove('active');
  win5.classList.remove('active');
  win6.classList.remove('active');
  messageWin.classList.remove('active');
  flag = false;
}

function savingData() {
  let starDate = star.innerHTML;
  localStorage.setItem('starLocal', starDate);
  let totalDate = total.innerHTML;
  localStorage.setItem('totalLocal', totalDate);
}

function fullSpin() {
  if (flag) {
    spin.onclick = null;
    minus.onclick = null;
    plus.onclick = null;
    reset();
    let priceNum = price.innerHTML;
    let totalNum = total.innerHTML;
    totalNum = totalNum - priceNum;
    if (totalNum < 0) {
      minus.onclick = minusCalc;
      plus.onclick = plusCalc;
      return;
    } else {
      total.innerHTML = totalNum;
    }

    star.innerHTML = Number(star.innerHTML) + 100;
    spinCicle1();
    spinCicle2();
    spinCicle3();
    setTimeout(function () {
      winningsCheck();
      if (flag == true) {
        setTimeout(function () {
          spin.onclick = fullSpin;
          minus.onclick = minusCalc;
          plus.onclick = plusCalc;
          flag = true;
        }, 500)
      } else {
        spin.onclick = fullSpin;
        minus.onclick = minusCalc;
        plus.onclick = plusCalc;
        flag = true;
      }
      savingData();
    }, 1150);
  } else {
    return
  }
}

function prizeCalculation(dif) {
  let priceNum = price.innerHTML;
  priceNum = Number(priceNum) * dif
  let totalNum = total.innerHTML;
  total.innerHTML = Number(totalNum) + priceNum;
  messageWin.querySelector('p').innerHTML = priceNum;
  messageWin.classList.add('active');
  flag = true;
}

let b1, b2, b3;
let a1, a2, a3;
let c1, c2, c3;
function winningsCheck() {
  if (a1 == a3 && a2 == a3) {
    win1.classList.add('active');
    prizeCalculation(10);
  }
  if (b1 == b2 && b1 == b3) {
    win2.classList.add('active');
    prizeCalculation(20);
  }
  if (c1 == c2 && c1 == c3) {
    win3.classList.add('active');
    prizeCalculation(10);
  }
  if (a1 == b1 && a1 == c1) {
    win4.classList.add('active');
    prizeCalculation(7);
  }
  if (a2 == b2 && a2 == c2) {
    win5.classList.add('active');
    prizeCalculation(7);
  }
  if (a3 == b3 && a3 == c3) {
    win6.classList.add('active');
    prizeCalculation(7);
  }

}

function spinCicle1() {
  let num = getRandomIntSpin();
  for (let i = 0; i < num; i++) {
    let imgSpin = document.createElement('img');
    imgSpin.src = arr[getRandomInt()];
    imgSpin.classList.add('casino_body_wrap_spin_item')
    document.querySelector('.spin_one').appendChild(imgSpin)
  }
  let spines = document.querySelectorAll('.spin_one .casino_body_wrap_spin_item');
  let spin = document.querySelector('.spin_one');
  spin.style.top = 8 - num * 77 + 'px'

  setTimeout(function () {
    for (let i = 0; i < num; i++) {
      spines[i].remove();
    }
    spin.classList.add('noTran')
    spin.style.top = 8 + 'px';
    spines = document.querySelectorAll('.spin_one .casino_body_wrap_spin_item');
    b1 = spines[1].getAttribute('src');
    a1 = spines[0].getAttribute('src');
    c1 = spines[2].getAttribute('src');
  }, 1100)
  spin.classList.remove('noTran')

}
function spinCicle2() {
  let num = getRandomIntSpin();
  for (let i = 0; i < num; i++) {
    let imgSpin = document.createElement('img');
    imgSpin.src = arr[getRandomInt()];
    imgSpin.classList.add('casino_body_wrap_spin_item')
    document.querySelector('.spin_too').appendChild(imgSpin)
  }
  let spines = document.querySelectorAll('.spin_too .casino_body_wrap_spin_item');
  let spin = document.querySelector('.spin_too');
  spin.style.top = 8 - num * 77 + 'px'

  setTimeout(function () {
    for (let i = 0; i < num; i++) {
      spines[i].remove();
    }
    spin.classList.add('noTran')
    spin.style.top = 8 + 'px';
    spines = document.querySelectorAll('.spin_too .casino_body_wrap_spin_item');
    b2 = spines[1].getAttribute('src');
    a2 = spines[0].getAttribute('src');
    c2 = spines[2].getAttribute('src');
  }, 1100)
  spin.classList.remove('noTran')
}

function spinCicle3() {
  let num = getRandomIntSpin();
  for (let i = 0; i < num; i++) {
    let imgSpin = document.createElement('img');
    imgSpin.src = arr[getRandomInt()];
    imgSpin.classList.add('casino_body_wrap_spin_item')
    document.querySelector('.spin_three').appendChild(imgSpin)
  }
  let spines = document.querySelectorAll('.spin_three .casino_body_wrap_spin_item');
  let spin = document.querySelector('.spin_three');
  spin.style.top = 8 - num * 77 + 'px'

  setTimeout(function () {
    for (let i = 0; i < num; i++) {
      spines[i].remove();
    }
    spin.classList.add('noTran')
    spin.style.top = 8 + 'px';
    spines = document.querySelectorAll('.spin_three .casino_body_wrap_spin_item');
    b3 = spines[1].getAttribute('src');
    a3 = spines[0].getAttribute('src');
    c3 = spines[2].getAttribute('src');
  }, 1100)
  spin.classList.remove('noTran')
}

function getRandomInt() {
  return Math.floor(Math.random() * 9);
}

function getRandomIntSpin() {
  return Math.floor(Math.random() * 4 + 10);
}
