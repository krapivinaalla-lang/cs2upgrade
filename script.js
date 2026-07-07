console.log("CS2 Upgrade запущен!");

let money = localStorage.getItem("money")
    ? Number(localStorage.getItem("money"))
    : 1000;
let casePrice = 300;
let inventory = localStorage.getItem("inventory")
    ? JSON.parse(localStorage.getItem("inventory"))
    : [];

const skins = [
{
    name: "AK-47 | Redline",
    rarity: "Редкий ⭐️",
    price: 300,
    chance: 30
},

{
    name: "AWP | Asiimov",
    rarity: "Эпический ⭐️⭐️",
    price: 700,
    chance: 15
},

{
    name: "M4A4 | Howl",
    rarity: "Легендарный ⭐️⭐️⭐️",
    price: 3000,
    chance: 4
},

{
    name: "Glock-18 | Water Elemental",
    rarity: "Обычный ⭐️",
    price: 150,
    chance: 50
},

{
    name: "Karambit | Fade",
    rarity: "Легендарный ⭐️⭐️⭐️",
    price: 5000,
    chance: 1
}
];

let currentSkin = "";

function getRandomSkin() {

    let random = Math.random() * 100;

    let sum = 0;


    for (let skin of skins) {

        sum += skin.chance;


        if (random <= sum) {
            return skin;
        }

    }

}

function openCase() {

    if (money < casePrice) {
        document.getElementById("result").innerHTML = "❌ Недостаточно денег";
        return;
    }

    localStorage.setItem("money", money);document.getElementById("result").innerHTML =
"🎰 Открываем кейс...";
    document.getElementById("money").innerHTML = money;

currentSkin = getRandomSkin();

startRoulette(currentSkin);

inventory.push(currentSkin);localStorage.setItem("inventory", JSON.stringify(inventory));

    updateInventory();

    setTimeout(function(){

    document.getElementById("result").innerHTML =
    "🎁 Ты получил: " + currentSkin.name +
    "<br>⭐️ Редкость: " + currentSkin.rarity;rarityEffect(currentSkin);

}, 1500);

} 


function upgradeSkin() {

    if (currentSkin === "") {
        document.getElementById("result").innerHTML =
        "❗ Сначала открой кейс";
        return;
    }

    if (money < 200) {
        document.getElementById("result").innerHTML =
        "❌ Недостаточно денег";
        return;
    }

    money -= 200;

    document.getElementById("money").innerHTML = money;

    if (Math.random() > 0.5) {

        document.getElementById("result").innerHTML =
        "🔥 Улучшение успешно!<br>" + currentSkin.name

    } else {

        document.getElementById("result").innerHTML =
        "💀 Улучшение не удалось";

    }
}

function getRarityClass(rarity) {

    if (rarity.includes("Обычный")) {
        return "common";
    }

    if (rarity.includes("Редкий")) {
        return "rare";
    }

    if (rarity.includes("Эпический")) {
        return "epic";
    }

    if (rarity.includes("Легендарный")) {
        return "legendary";
    }

}

function updateInventory() {

    let html = "";

    inventory.forEach(function(skin, index) {

        html += `
        <div class="skin-card ${getRarityClass(skin.rarity)}">
            🔫 ${skin.name}
            <br>
            ⭐️ ${skin.rarity}
            <br>
            💰 Цена: ${skin.price}$
            <br>
            <button onclick="sellSkin(${index})">
                Продать
            </button>
        </div>
        `;

    });

    document.getElementById("inventory").innerHTML = html;

}
function sellSkin(index) {
    
    let skin = inventory[index];

    money += skin.price;

    document.getElementById("money").innerHTML = money;


    inventory.splice(index, 1);localStorage.setItem("inventory", JSON.stringify(inventory));
localStorage.setItem("money", money);

    updateInventory();


    document.getElementById("result").innerHTML =
    "💰 Ты продал: " + skin.name +
    "<br>Получено: " + skin.price + "$";

}
function startRoulette(winSkin) {

    let box = document.getElementById("roulette-items");

    box.innerHTML = "";

    let items = [];

    // первые 10 случайных скинов
    for (let i = 0; i < 10; i++) {

        let random = Math.floor(Math.random() * skins.length);

        items.push(skins[random]);

    }

    // настоящий выигрыш
    items.push(winSkin);


    // ещё случайные после
    for (let i = 0; i < 5; i++) {

        let random = Math.floor(Math.random() * skins.length);

        items.push(skins[random]);

    }


    items.forEach(function(skin) {

        box.innerHTML += `
        <div class="roulette-item">
            🔫 ${skin.name}
        </div>
        `;

    });


    box.style.transition = "none";
    box.style.transform = "translateX(0px)";


    setTimeout(function(){

        // останавливаемся на 11-м элементе
        let position = 10 * 180;


        box.style.transition =
        "transform 5s cubic-bezier(0.15, 0.85, 0.25, 1)";


        box.style.transform =
        "translateX(-" + position + "px)";


    },100);

}
function rarityEffect(skin) {

    let result = document.getElementById("result");


    result.className = "";


    if (skin.rarity.includes("Легендарный")) {

        result.className = "legendary-effect";

    }

    if (skin.name.includes("Karambit")) {

        result.className = "knife-effect";

    }

}
document.getElementById("money").innerHTML = money;
updateInventory();