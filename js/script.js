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
let propertiesAmount = 20;
let villainSubmit = false;
//Действие противника 1 - атака, 0 - блок 
let actionVillain;
// Объекты для хранения характеристик
let charData;
let villainData;
//Временная защита для блока    
let blockAttackChar = 0;
let blockAttackVillain = 0; 
//Скролл для фиксирования действий
let scrollElem;
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
        let currentHeight = window.screen.height;
        document.querySelector('.game-over').style.height = currentHeight + "px";
        document.body.classList.add("active")
    }
    document.querySelector('.game__bar').style.display = 'flex';
}
//Выбор противника
document.querySelectorAll('.villain__card').forEach((item) => {
    item.addEventListener('click', function(c){
        c.preventDefault();
        document.querySelectorAll('.villain__card').forEach((child) => {
            child.classList.remove("active")
        } )
    });
    item.addEventListener('click', function(e) {
        e.preventDefault();
        if (villainSubmit == false) {
            document.querySelectorAll(".card__properties").forEach((child) =>
                child.classList.remove("active")
            ),
            item.querySelector(".card__properties").classList.add("active");
        }
        this.classList.add("active");
    });
});

//Подтверждение характеристик противника
document.querySelector('.villain__submit').addEventListener('click', function(item){
    let villainArea = document.querySelector('.card__properties.active');
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
    scrollElem = document.documentElement.clientHeight;
    this.style.display = "none";
    document.querySelector('.game__action').style.display = "flex";
    return villainSubmit = true;
})

//Передача текста в блок
function gameRow(message, person) {
    let rowArea = document.querySelector('.fight__text');
    rowArea.innerHTML += `<p class="${person}">${message}</p>`;
}
//Блокирование
function block() {
    blockAttackChar = 1;
    gameRow(`Вы поставили блок`, "character")
    villainAction()
    if (actionVillain == 0) {
        villainBlock()
    } else {
        villainAttack()
    }
    blockAttackChar = 0;
    blockAttackVillain = 0;
}
//Нанесение урона
function attack() {
    villainAction()
    if (actionVillain == 0) {
        villainBlock()
        if (blockAttackVillain == 1) {
            gameRow("Противник заблокировал вашу атаку", "villain")
        } 
    } else {
        if (villainData.health <= 0) {
            document.querySelector('.game-over').innerHTML = "You win"
            document.querySelector('.game-over').style.display = 'flex';
        } else {
                if (charData.damage < villainData.armour ) {
                    gameRow("Вы не можете нанести противнику урон,защита противника непробиваема", `character`)
                } else {
                    gameRow(`Вы нанесли ${charData.damage - villainData.armour} урона( Враг заблокировал ${villainData.armour} урона с помощью брони)`, `character`);
                    villainData.health -= (charData.damage - villainData.armour);
                    if (villainData.health <= 0) {
                        gameRow(`Враг мертв`,`death`);
                        document.querySelector('.game-over').innerHTML = "You win"
                        document.querySelector('.game-over').style.display = 'flex';
                        let currentHeight = window.screen.height;
                        document.querySelector('.game-over').style.height = currentHeight + "px";
                        document.body.classList.add("active")
                    } else {
                        gameRow(`У врага осталось ${villainData.health} здоровья`, `health`);
                    }
                }
            }
            villainAttack()
    }
    blockAttackVillain = 0;
}

//Атака противника
function villainAttack() {
    {
        if (blockAttackChar) {
            gameRow("Атака противника была заблокирована", `villain`)
        } else {
            if (villainData.damage < charData.armour ) {
                gameRow("Противник не может нанести Вам урон,Ваша защита непробиваема", `villain`)
            } else {
                gameRow(`Противник нанес вам ${villainData.damage - charData.armour} урона( Вы заблокировали ${charData.armour} урона с помощью брони)`,  `villain`);
                charData.health -= (villainData.damage - charData.armour);
                if (charData.health <= 0) {
                    gameRow(`Вы мертвы`, `death`)
                    if (charData.health <= 0) {
                        document.querySelector('.game-over').innerHTML = "Game over"
                        document.querySelector('.game-over').style.display = 'flex';
                        let currentHeight = window.screen.height;
                        document.querySelector('.game-over').style.height = currentHeight + "px";
                        document.body.classList.add("active")
                    }
                } else {
                    gameRow(`У вас осталось ${charData.health} здоровья`, `health`);
                }
            }
        }
    }
}

//Блокирование противника
function villainBlock () {
    blockAttackVillain = 1;  
    gameRow(`Противник поставил блок`, "villain")
}

//Действия противника
function villainAction(){
    action = Math.round(((+(Math.random().toFixed(4))*10000) % 10))
    if (action <= 5) {
        console.log("Атака")
        return actionVillain = 1;
    } else {
        console.log("Блок");
        return actionVillain = 0;
    }
}
window.onscroll = function fixedAction() {
    if (window.pageYOffset > 1457) {
        document.querySelector('.fight__buttons').classList.add('fixed')
    } else {
        document.querySelector('.fight__buttons').classList.remove('fixed')
    }
}