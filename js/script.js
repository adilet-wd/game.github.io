function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });;
// Перезагрузка сайта
function refresh(){
    window.location.reload();
}
// Значения переменных характеристик
let propertiesValue = document.querySelector(".properties__amount");
let propertiesAmount = 8;
let villainSubmit = false;
let charData;
let villainData;    
// Вывод характеристик на сайт
propertiesValue.innerHTML = `Очки характеристик: ${propertiesAmount}`;

// Изменение значений характеристик
function propertiesDown(name) {
    if (propertiesAmount != 0) {
        let value = +(document.querySelector(`.${name}__value`).innerHTML)
        if (value == 0) {
            return;
        }
        document.querySelector(`.${name}__value`).innerHTML = value - 1;
        propertiesAmount += 1;
        propertiesValue.innerHTML = `Очки характеристик: ${propertiesAmount}`;
    }
}
function propertiesUp(name) {
    if (propertiesAmount != 0) {
        let value = +(document.querySelector(`.${name}__value`).innerHTML)
        document.querySelector(`.${name}__value`).innerHTML = value + 1;
        propertiesAmount -= 1;
        propertiesValue.innerHTML = `Очки характеристик: ${propertiesAmount}`;
    }
}
// Получение итоговых характеристик
function propertiesSubmit() {
    if (propertiesAmount != 0 ){
        return;
    }
    let buttons = document.querySelectorAll(".properties__button")
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].style.display = "none";
    }
    document.querySelector('.properties__submit').style.display = "none";
    if (propertiesAmount == 0) {
        let healthValue = +(document.querySelector(".health__value").innerHTML);
        let damageValue = +(document.querySelector(".damage__value").innerHTML);
        let armourValue = +(document.querySelector(".armour__value").innerHTML);
        let agilityValue = +(document.querySelector(".agility__value").innerHTML);
    
        charData = {
            health: healthValue,
            damage: damageValue,
            armour: armourValue,
            agility: agilityValue,
        }
    }
    if (charData.health <= 0) {
        document.querySelector('.game-over').innerHTML = "Game over"
        document.querySelector('.game-over').style.display = 'flex';
    }
    document.querySelector('.game__bar').style.display = 'flex';
}
//Выбор противника
document.querySelectorAll('.villain__card').forEach((item) => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        if (villainSubmit == false) {
            document.querySelectorAll(".card__properties").forEach((child) =>
                child.classList.remove("active")
            ),
            item.querySelector(".card__properties").classList.add("active");
        }
    })
});

//Подтверждение характеристик противника
document.querySelector('.villain__submit').addEventListener('click', function(item){
    let villainArea = document.querySelector('.card__properties.active')
    let healthValue = +(villainArea.querySelector('.villain__health').innerHTML);
    let damageValue = +(villainArea.querySelector('.villain__damage').innerHTML);
    let armourValue = +(villainArea.querySelector('.villain__armour').innerHTML);
    let agilityValue = +(villainArea.querySelector('.villain__agility').innerHTML);
    villainData = {
        health: healthValue,
        damage: damageValue,
        armour: armourValue,
        agility: agilityValue,
    };
    // (document.querySelector(".card__properties.active")!==null)
    document.querySelectorAll('.villain__card').forEach((item) => {
        if (item.querySelector('.card__properties.active')==null) {
                item.querySelector('.card__disable').style.display = "block";
            }
        }
    );
    this.style.display = "none";
    document.querySelector('.game__action').style.display = "flex";
    return villainSubmit = true;
})

//Передача текста в блок
function gameRow(message) {
    let rowArea = document.querySelector('.fight__text');
    rowArea.innerHTML += `<p>${message}</p>`;
}
//Нанесение урона
function attack() {
    if (villainData.health <= 0) {
        gameRow(`Враг уже мертв,не издевайся`)
    } else {
        gameRow(`Вы нанесли ${charData.damage - villainData.armour} урона( Враг заблокировал ${villainData.armour} урона с помощью брони)`);
        villainData.health -= (charData.damage - villainData.armour);
        if (villainData.health <= 0) {
            gameRow(`Враг мертв`);
        } else {
            gameRow(`У врага осталось ${villainData.health} здоровья`);
        }
    }
}
//Block
function block() {
    if (villainData.health <= 0) {
        gameRow(`Враг уже мертв,не издевайся`)
    } else {
        gameRow(`Вы нанесли ${charData.damage - villainData.armour} урона( Враг заблокировал ${villainData.armour} урона с помощью брони)`);
        villainData.health -= (charData.damage - villainData.armour);
        if (villainData.health <= 0) {
            gameRow(`Враг мертв`);
        } else {
            gameRow(`У врага осталось ${villainData.health} здоровья`);
        }
    }
}
