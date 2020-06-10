const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionariesBtn = document.getElementById('show_millionaries');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser (){
    let res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

function addData(user) {
    data.push(user);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Пользователь</strong> наличность</h2>';

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`
        main.appendChild(element);
    })
}

function formatMoney(money) {
   return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);