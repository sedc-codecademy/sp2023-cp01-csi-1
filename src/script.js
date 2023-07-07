const app = {};

app.apiCall = (coin, color) => {
  const localStorageKey = `coinData_${coin}`;

  // Check if the data is already present in localStorage
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    renderChart(parsedData, color);
    console.log('local storage coin data ');
    return;
  }

  fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=d1`)
    .then(function (response) {
      if (response.ok) {
        console.log('fetch data');
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (response) {
      console.log(response);

      const weeksValues = response.data.slice(-7);
      const prices = weeksValues.map((day) =>
        parseFloat(day.priceUsd).toFixed(2)
      );
      const dates = weeksValues.map((date) => date.date.slice(0, 10));

      const data = {
        labels: dates,
        datasets: [
          {
            label: 'Price USD',
            backgroundColor: color,
            borderColor: color.replace('1)', '0.5)'),
            borderWidth: 7,
            data: prices,
          },
        ],
      };

      // Save the data to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(data));

      renderChart(data, color);
    })
    .catch(function () {
      const chartContainer = document.querySelector('.chart-container');
      const errorMessage = document.createElement('p');
      errorMessage.innerHTML = 'Sorry, something went wrong... try again!';
      chartContainer.innerHTML = '';
      chartContainer.append(errorMessage);
    });
};

function renderChart(data, color) {
  const config = {
    type: 'line',
    data,
    options: {},
  };

  const myChart = new Chart(document.getElementById('myChart'), config);
  myChart.update();
}

app.init = () => {
  const pages = document.querySelectorAll('.page');

  const showPage = (pageId) => {
    pages.forEach((page) => {
      if (page.id === pageId) {
        page.style.display = 'block';
      } else {
        page.style.display = 'none';
      }
    });
  };

  const homeBtn = document.getElementById('homeBtn');
  const statisticsBtn = document.getElementById('statisticsBtn');
  const simulatorBtn = document.getElementById('simulatorBtn');
  const infoBtn = document.getElementById('infoBtn');
  const loginBtn = document.getElementById('loginBtn');

  homeBtn.addEventListener('click', () => {
    showPage('homePage');
  });

  statisticsBtn.addEventListener('click', () => {
    showPage('statisticsPage');
  });

  simulatorBtn.addEventListener('click', () => {
    showPage('simulatorPage');
  });

  infoBtn.addEventListener('click', () => {
    showPage('infoPage');
  });

  loginBtn.addEventListener('click', () => {
    showPage('loginPage');
  });

  showPage('homePage');

  const coinData = document.getElementById('coinData');

  const showCoinData = (coin, color) => {
    coinData.innerHTML = `
    <div class="d-flex justify-content-between "> 
      <h2>${coin.name}</h2>
      <button id= "exit" class="btn btn-primary">X</button>
      </div>
      <div class="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    `;
    app.apiCall(coin.id, color);
    let exit = document.getElementById('exit');
    exit.addEventListener('click', function () {
      coinData.innerHTML = '';
    });
  };

  const createTableHtml = (data, type) => {
    const tableData =
      type === 'gainers'
        ? data.sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          ) && data.slice(0, 5)
        : type === `losers`
        ? data.sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          ) && data.slice(0, 5)
        : data.sort((a, b) => a.market_cap_rank - b.market_cap_rank) &&
          data.slice(0, 100);
    console.log(tableData);

    let html = `
    <div class="table-header">
    <h3>${
      type === 'gainers'
        ? 'Top Gainers'
        : type === `losers`
        ? 'Top Losers'
        : `Top 100 Coins`
    }</h3>
  </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Logo</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Price Change</th>
          <th>View graph</th>
        </tr>
      </thead>
      <tbody>
  `;
    tableData.forEach((coin, index) => {
      const {
        name,
        image,
        current_price,
        price_change_percentage_24h,
        market_cap,
      } = coin;

      html += `
      <tr >  
        <td>${index + 1}</td>
        <td><img src="${image}" alt="${name}" width="30"></td>
        <td>${name}</td>
        <td>${formatPrice(current_price)}</td>
        <td>${formatMarketCap(market_cap)}</td>
        <td class="text-left">${
          price_change_percentage_24h > 0
            ? "<strong class='text-success h3'>↑</strong>"
            : coin.price_change_percentage_24h < 0
            ? "<strong class='text-danger h3' >↓</strong>"
            : ' '
        }&nbsp &nbsp${price_change_percentage_24h}% </td>
        <td>
          <button class="btn btn-primary coinBtn " data-coin-id="${
            coin.id
          }" data-coin-name="${name}" data-coin-color="#f54242">View</button>
        </td>
      </tr>
    `;
    });

    html += `
      </tbody>
    </table>
  `;

    function formatPrice(price) {
      const parts = price.toFixed(2).split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const decimalPart = parts[1];
      return `${integerPart},${decimalPart}`;
    }
    function formatMarketCap(marketCap) {
      const abbreviated = ['', 'K', 'M', 'B', 'T'];
      const suffixIndex = Math.floor(Math.log10(marketCap) / 3);
      const abbreviatedValue = (
        marketCap / Math.pow(10, suffixIndex * 3)
      ).toFixed(2);
      return `${abbreviatedValue}${abbreviated[suffixIndex]}`;
    }

    html += `
        </tbody>
      </table>
    `;

    return html;
  };

  // Check if the data is available in local storage
  const storedData = localStorage.getItem('coinData');
  if (storedData) {
    const data = JSON.parse(storedData);
    const topGainersTable = document.getElementById('topGainersTable');
    const topLosersTable = document.getElementById('topLosersTable');
    const top100Coin = document.getElementById('top100Coins');

    const topGainersHeader = document.createElement('div');
    topGainersHeader.classList.add('table-header');
    topGainersHeader.innerHTML = '<h3>Top Gainers</h3>';
    topGainersTable.classList.add('table', 'table-striped');
    topGainersTable.innerHTML = createTableHtml(data, 'gainers');

    const topLosersHeader = document.createElement('div');
    topLosersHeader.classList.add('table-header');
    topLosersHeader.innerHTML = '<h3>Top Losers</h3>';
    topLosersTable.classList.add('table', 'table-striped');
    topLosersTable.innerHTML = createTableHtml(data, 'losers');

    const top100CoinHeader = document.createElement('div');
    top100CoinHeader.classList.add('table-header');
    top100CoinHeader.innerHTML = '<h3>Top 100</h3>';
    top100Coin.classList.add('table', 'table-striped');
    top100Coin.innerHTML = createTableHtml(data, 'topCoin');

    const coinButtons = document.querySelectorAll('.coinBtn');
    coinButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const coinId = button.getAttribute('data-coin-id');
        const coinName = button.getAttribute('data-coin-name');
        const coinColor = button.getAttribute('data-coin-color');
        showCoinData({ id: coinId, name: coinName }, coinColor);
      });
    });
  } else {
    // Make the API request
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => response.json())
      .then((data) => {
        const topGainersTable = document.getElementById('topGainersTable');
        const topLosersTable = document.getElementById('topLosersTable');
        const top100Coins = document.getElementById('top100Coins');

        topGainersTable.innerHTML = createTableHtml(data, 'gainers');
        topLosersTable.innerHTML = createTableHtml(data, 'losers');
        top100Coins.innerHTML = createTableHtml(data, 'topCoin');

        // Save the data in local storage
        localStorage.setItem('coinData', JSON.stringify(data));

        const coinButtons = document.querySelectorAll('.coinBtn');
        coinButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const coinId = button.getAttribute('data-coin-id');
            const coinName = button.getAttribute('data-coin-name');
            const coinColor = button.getAttribute('data-coin-color');
            showCoinData({ id: coinId, name: coinName }, coinColor);
          });
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
};

app.init();
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', populateHomePage);

  const homeBtn = document.getElementById('homeBtn');
  const statisticsBtn = document.getElementById('statisticsBtn');
  const simulatorBtn = document.getElementById('simulatorBtn');
  const infoBtn = document.getElementById('infoBtn');
  const loginBtn = document.getElementById('loginBtn');

  const homePage = document.getElementById('homePage');
  const statisticsPage = document.getElementById('statisticsPage');
  const simulatorPage = document.getElementById('simulatorPage');
  const infoPage = document.getElementById('infoPage');
  const loginPage = document.getElementById('loginPage');

  const loginFormContainer = document.getElementById('loginFormContainer');

  function showPage(page) {
    const pages = [
      homePage,
      statisticsPage,
      simulatorPage,
      infoPage,
      loginPage,
    ];
    pages.forEach(function (page) {
      page.style.display = 'none';
    });
    page.style.display = 'block';

    if (page !== homePage) {
      const homePageHero = document.getElementById('homePageHero');
      homePageHero.innerHTML = '';
    }
  }

  function createLoginForm() {
    const loginForm = document.createElement('form');
    loginForm.innerHTML = `
    <div class="form-container">
      <div class="LoginRegistercard">
        <div class="LoginRegistercard-body">
          <h5 class="LoginRegistercard-title">Login</h5>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input type="email" class="form-control" id="emailInput" required>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input type="password" class="form-control mb-4" id="passwordInput" required>
          </div>
          <button type="submit" class="btn btn-primary mb-4">Login</button>
          <p class="mt-3 text-dark">Not registered? <a href="#" id="registerLink"><span class="bold">Click here to register</span></a></p>
        </div>
      </div>
    </div>
  `;

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;

      loginUser(email, password);
    });

    loginFormContainer.innerHTML = '';
    loginFormContainer.appendChild(loginForm);

    const registerLink = document.getElementById('registerLink');
    registerLink.addEventListener('click', function (e) {
      e.preventDefault();
      createRegistrationForm();
    });
    function loginUser(email, password) {
      // Check if the user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert('Invalid email or password.');
        return;
      }

      // Store the logged-in user information in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');

      // Show the simulator button and hide the login button
      simulatorBtn.parentElement.style.display = 'block';
      loginBtn.parentElement.style.display = 'none';

      // Show the logout button
      logoutNavItem.style.display = 'block';
      showPage(simulatorPage);

      // Retrieve and display the user's wallet data
      let walletData = JSON.parse(
        localStorage.getItem(`walletData_${user.id}`)
      );
      if (!walletData) {
        walletData = {
          balance: 1000000,
          currencies: {},
        };
        localStorage.setItem(
          `walletData_${user.id}`,
          JSON.stringify(walletData)
        );
      }

      walletBalanceElement.textContent = walletData.balance.toLocaleString();
      Object.entries(walletData.currencies).forEach(([coinId, quantity]) => {
        const coin = displayedCoinData.find((coin) => coin.id === coinId);
        if (coin) {
          addToCurrencyList(coin, quantity);
        }
      });

      // showPage(homePage);
    }

    function logoutUser() {
      // Remove the logged-in user information from localStorage
      localStorage.removeItem('loggedInUser');

      // Hide the simulator button and show the login button
      simulatorBtn.parentElement.style.display = 'none';
      loginBtn.parentElement.style.display = 'block';

      // Hide the logout button
      logoutNavItem.style.display = 'none';

      // Additional logout actions if necessary

      showPage(homePage);
    }

    // Attach the logoutUser() function to the logout button click event
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logoutUser);
  }

  function createRegistrationForm() {
    const registrationForm = document.createElement('form');
    registrationForm.innerHTML = `
    <div class="form-container">
    <div class="LoginRegistercard">
      <div class="LoginRegistercard-body">
        <h5 class="LoginRegistercard-title">Registration</h5>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email address</label>
          <input type="email" class="form-control" id="emailInput" required>
        </div>
        <div class="mb-3">
          <label for="passwordInput" class="form-label">Password</label>
          <input type="password" class="form-control" id="passwordInput" required>
        </div>
        <div class="mb-3">
          <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="confirmPasswordInput" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <p class="mt-3">Already registered? <a href="#" id="loginLink">Click here to login</a></p>
      </div>
    </div>
    </div>

    `;

    registrationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      const confirmPassword = document.getElementById(
        'confirmPasswordInput'
      ).value;

      // Check if the password meets the requirements
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        alert(
          'Password must be 6 characters long and contain at least 1 capital letter, 1 number, and 1 special character.'
        );
        return;
      }

      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Check if the user already exists
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((u) => u.email === email);
      if (userExists) {
        alert('User with this email already exists.');
        return;
      }

      // Add the new user to the array and store in localStorage
      const newUser = { email: email, password: password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('You have successfully registered.');

      // After successful registration, redirect to the login page
      createLoginForm();
    });

    loginFormContainer.innerHTML = '';
    loginFormContainer.appendChild(registrationForm);

    const loginLink = document.getElementById('loginLink');
    loginLink.addEventListener('click', function (e) {
      e.preventDefault();
      createLoginForm();
    });
  }

  createLoginForm();
  function populateHomePage() {
    // Check if the home page content already exists
    const existingContent = document
      .getElementById('homePageHero')
      .querySelector('.hero');
    if (existingContent) {
      return; // Exit the function if the content already exists
    }

    // Create the home page content
    const homePageHero = document.getElementById('homePageHero');
    const contentDiv = document.createElement('div');
    contentDiv.className = 'hero';

    contentDiv.innerHTML = `
    <div class="test">
    <div
      class="content"
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="50000"
    >
      <h1 class="pb-5 aos-init aos-animate">
        New and modern buying and trading crypto exchange!
      </h1>
      <p>
        Welcome to our new and modern buying and trading crypto exchange platform! We provide a seamless and secure environment for you to invest, trade, and manage your cryptocurrencies. With our user-friendly interface and advanced features, you can stay ahead in the ever-evolving world of cryptocurrencies. Whether you're a beginner or an experienced trader, we've got you covered. Start exploring the exciting possibilities of crypto trading with us today!
      </p>
    </div>
    <div
      class="hero-img-desc"
      data-aos="fade-up"
      data-aos-delay="500"
      data-aos-duration="900"
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 256 417"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          fill="#343434"
          d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
        />
        <path
          fill="#8C8C8C"
          d="M127.962 0L0 212.32l127.962 75.639V154.158z"
        />
        <path
          fill="#3C3C3B"
          d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
        />
        <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
        <path
          fill="#141414"
          d="M127.961 287.958l127.96-75.637-127.96-58.162z"
        />
        <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" />
      </svg>
    </div>
  </div>
    `;

    homePageHero.appendChild(contentDiv);
    const sectionItems = document.createElement('div');
    sectionItems.classList = 'main-section';
    sectionItems.innerHTML = `
    <div class="container">
    <div class="row aos-init aos-animate">
        <h1 class="main-section-header" data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="500">
        Buy and trade the most popular coins instantly!</h1>
      </div>
      <div class="card-group" data-aos="fade-up"
      data-aos-delay="500"
      data-aos-duration="900">
        <div class="card text-center align-items-center card-borders">
            <img src="/public/bitcoin-logo-svgrepo-com.svg" alt="" class="card-img-top svg-card">
            <div class="card-body">
              <h5 class="card-title">Bitcoin</h5>
              <p class="card-text mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quibusdam corporis consequatur nisi numquam est.</p>
              <button class="btn btn-primary">Info</button>
            </div>
        </div>
        <div class="card text-center align-items-center card-borders">
          <img src="/public/ethereum-1.svg" alt="" class="card-img-top svg-card">
          <div class="card-body">
            <h5 class="card-title">Ethereum</h5>
            <p class="card-text mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quibusdam corporis consequatur nisi numquam est.</p>
            <button class="btn btn-primary">Info</button>
          </div>
      </div>
      <div class="card text-center align-items-center card-borders">
        <img src="/public/tether-seeklogo.com.svg" alt="" class="card-img-top svg-card">
        <div class="card-body">
          <h5 class="card-title">Tether USD</h5>
          <p class="card-text mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quibusdam corporis consequatur nisi numquam est.</p>
          <button class="btn btn-primary">Info</button>
        </div>
    </div>
      </div>
    </div>
    `;
    homePageHero.appendChild(sectionItems);
  }

  homeBtn.addEventListener('click', function () {
    showPage(homePage);

    populateHomePage();
  });

  statisticsBtn.addEventListener('click', function () {
    showPage(statisticsPage);
  });

  simulatorBtn.addEventListener('click', function () {
    showPage(simulatorPage);
    populateSimulatorPage();
  });

  infoBtn.addEventListener('click', function () {
    showPage(infoPage);
    loadInfoCenterData();
  });

  loginBtn.addEventListener('click', function () {
    showPage(loginPage);
    createLoginForm();
  });
  function populateSimulatorPage() {
    const simulatorPageContent = `
      <h2>Crypto Simulator</h2>
      <div id="walletInfo">
        <h3 class="mb-5">Wallet Balance: $<span id="walletBalance">1,000,000</span></h3>
        <div id="cryptoList"></div>
        <div id="walletStats">
          <h4>Wallet Statistics:</h4>
          <p class="text-dark">Profit/Loss: $<span id="profitLoss">0</span></p>
          <p class="text-dark">Oscillation: <span id="oscillation">0%</span></p>
        </div>
        <div id="walletCurrencies">
        <h4>Owned Currencies:</h4>
        <table id="currencyList" class="mb-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      </div>
      
      </div>
    `;

    simulatorPage.innerHTML = simulatorPageContent;

    // Get references to the elements on the Crypto Simulator page
    const walletBalanceElement = document.getElementById('walletBalance');
    const cryptoListElement = document.getElementById('cryptoList');
    const profitLossElement = document.getElementById('profitLoss');
    const oscillationElement = document.getElementById('oscillation');
    const currencyListElement = document.getElementById('currencyList');

    // Get the coinData from localStorage
    const storedData = localStorage.getItem('coinData');
    let coinData = [];

    if (storedData) {
      coinData = JSON.parse(storedData);
    }

    // Display the list of cryptocurrencies with input fields to select quantities
    const cryptoQuantityInputs = [];

    // Show only the first 9 cryptocurrencies
    const displayedCoinData = coinData.slice(0, 9);

    displayedCoinData.forEach((coin) => {
      const cryptoListItem = document.createElement('div');
      cryptoListItem.classList.add('crypto-list-item');
      cryptoListItem.innerHTML = `
        <div class="crypto-card">
          <img src="${coin.image}" alt="${coin.name}">
          <div class="crypto-info">
            <h4><span class="bold">${coin.name}<span></h4>
            <p id="Price">Price: $${coin.current_price}</p>
            <div class="quantity-input">
              <span>Quantity:</span>
              <input type="number" class="crypto-quantity-input" min="0" step="1" value="0">
            </div>
          </div>
        </div>
      `;
      cryptoListElement.appendChild(cryptoListItem);

      // Add input field reference to array for later use
      const quantityInput = cryptoListItem.querySelector(
        '.crypto-quantity-input'
      );
      cryptoQuantityInputs.push(quantityInput);
    });

    // Add Buy button at the bottom of the cryptocurrency list
    const buyButton = document.createElement('button');
    buyButton.classList.add('buy-button');
    buyButton.textContent = 'Buy';
    cryptoListElement.appendChild(buyButton);

    // Add event listener for Buy button
    buyButton.addEventListener('click', () => {
      const quantities = Array.from(cryptoQuantityInputs).map((input) =>
        parseInt(input.value, 10)
      );
      const prices = displayedCoinData.map((coin) => coin.current_price);
      let walletBalance = parseInt(
        walletBalanceElement.textContent.replace(/,/g, ''),
        10
      );

      const canBuy = quantities.every(
        (quantity, index) => quantity * prices[index] <= walletBalance
      );

      if (canBuy) {
        // Update wallet balance and owned currencies
        quantities.forEach((quantity, index) => {
          const coin = displayedCoinData[index];
          const price = coin.current_price;
          walletBalance -= quantity * price;
          addToCurrencyList(coin, quantity);
        });
        walletBalanceElement.textContent = walletBalance.toLocaleString();
        calculateWalletStatistics();
      } else {
        alert('Insufficient funds. You do not have enough balance to buy.');
      }
    });

    // Function to add the purchased currency to the currency list
    function addToCurrencyList(coin, quantity) {
      const currencyRow = currencyListElement.querySelector(
        `tr[data-coin='${coin.id}']`
      );
      const walletBalance = parseInt(
        walletBalanceElement.textContent.replace(/,/g, ''),
        10
      );

      if (quantity > 0) {
        if (currencyRow) {
          const quantityCell = currencyRow.querySelector('.currency-quantity');
          quantityCell.textContent = quantity.toString();
          const valueCell = currencyRow.querySelector('.currency-value');
          const value = (quantity * coin.current_price).toLocaleString(
            undefined,
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          );
          valueCell.textContent = `$${value}`;
        } else {
          const newRow = document.createElement('tr');
          newRow.dataset.coin = coin.id;
          newRow.innerHTML = `
            <td>${coin.name}</td>
            <td class="currency-symbol"><img src="${coin.image}" alt="${
            coin.name
          }">${coin.symbol}</td>
            <td class="currency-quantity">${quantity}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td class="currency-value">$${(
              quantity * coin.current_price
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}</td>
          `;
          currencyListElement.querySelector('tbody').appendChild(newRow);
        }
      } else {
        if (currencyRow) {
          currencyRow.remove();
        }
      }

      // Update wallet balance
      const updatedBalance = walletBalance - quantity * coin.current_price;
      walletBalanceElement.textContent = updatedBalance.toLocaleString();

      // Update wallet statistics
      calculateWalletStatistics();
    }

    // Function to calculate and update the wallet statistics
    function calculateWalletStatistics() {
      const walletBalance = parseInt(
        walletBalanceElement.textContent.replace(/,/g, ''),
        10
      );
      const profitLoss = walletBalance - 1000000;
      const oscillation = ((profitLoss / 1000000) * 100).toFixed(2);

      profitLossElement.textContent = profitLoss.toLocaleString();
      oscillationElement.textContent = `${oscillation}%`;
    }

    // Add event listener for quantity inputs
    cryptoQuantityInputs.forEach((input) => {
      input.addEventListener('change', () => {
        calculateWalletStatistics();
      });
    });

    // Initialize wallet statistics
    calculateWalletStatistics();
  }
});

function formatPrice(price) {
  const parts = price.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  return `${integerPart},${decimalPart}`;
}

function loadInfoCenterData() {
  const infoContent = document.getElementById('infoContent');
  infoContent.innerHTML = ''; // Clear existing content

  const infoPageNew = document.createElement('div');
  infoPageNew.classList.add('infoCenter');
  infoPageNew.classList.add('mb-5');
  infoPageNew.innerHTML = `
  <div class="container">
    <h2 class="mb-5 info-title-border">Information Center Page</h2>

    <div class="items">
      <h4 class="info-h4">
        What does our <span class="bold">CryptoApp</span> offer?
      </h4>
      <p class="info-p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Exercitationem quia ipsum blanditiis eligendi, fuga ab, ipsam, at
        harum quod ratione assumenda dolores accusantium asperiores sequi
        ducimus atque nobis error numquam.
      </p>
    </div>

    <div class="items">
      <h4 class="info-h4">
        What is a <span class="bold">Cryptocurrency?</span>
      </h4>
      <p class="info-p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        fugiat soluta inventore, repudiandae atque assumenda mollitia, et
        quo beatae laborum natus, modi repellendus libero incidunt odio
        corrupti culpa minus iure.
      </p>
    </div>

    <div class="items">
      <h4 class="info-h4">
        How does a <span class="bold">Blockchain</span> work?
      </h4>
      <p class="info-p">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit cumque
        incidunt sunt provident voluptatem quis quam cupiditate mollitia
        blanditiis consequatur saepe qui possimus cum, laboriosam labore
        unde, minus, neque deleniti! Sit repellat atque alias suscipit odio
        laudantium voluptatem totam ex incidunt, quasi est nostrum optio
        debitis itaque facilis soluta similique?
      </p>
    </div>
  </div>
`;

  infoContent.appendChild(infoPageNew);

  // Sample data for Bitcoin, Ethereum, and Litecoin
  // const data = [
  //   {
  //     title: 'Bitcoin (BTC)',
  //     color: '#FF9900',
  //     overview:
  //       'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.',
  //     details: [
  //       'Symbol: BTC',
  //       'Market Cap: $700 billion',
  //       'Algorithm: SHA-256',
  //       'Genesis Date: January 3, 2009',
  //     ],
  //   },
  //   {
  //     title: 'Ethereum (ETH)',
  //     color: '#3C3C3D',
  //     overview:
  //       'Ethereum is an open-source, blockchain-based platform that enables the creation of smart contracts and decentralized applications (DApps). It has its native cryptocurrency called Ether (ETH).',
  //     details: [
  //       'Symbol: ETH',
  //       'Market Cap: $300 billion',
  //       'Blockchain: Ethereum',
  //       'Genesis Date: July 30, 2015',
  //     ],
  //   },
  //   {
  //     title: 'Litecoin (LTC)',
  //     color: '#838383',
  //     overview:
  //       'Litecoin is a peer-to-peer cryptocurrency that enables instant, near-zero cost payments to anyone in the world. It is an open-source project released under the MIT/X11 license.',
  //     details: [
  //       'Symbol: LTC',
  //       'Market Cap: $10 billion',
  //       'Algorithm: Scrypt',
  //       'Genesis Date: October 7, 2011',
  //     ],
  //   },
  //   {
  //     title: 'Cardano (ADA)',
  //     color: '#4AADA5',
  //     overview:
  //       'Cardano is a blockchain platform that aims to provide a more secure and sustainable platform for the development and execution of smart contracts and decentralized applications. It emphasizes a research-driven approach and aims to provide a more balanced and inclusive ecosystem for cryptocurrencies.',
  //     details: [
  //       'Symbol: ADA',
  //       'Market Cap: $5 billion',
  //       'Consensus Algorithm: Ouroboros',
  //       'Genesis Date: 2017',
  //     ],
  //   },
  //   {
  //     title: 'Polkadot (DOT)',
  //     color: '#E6007A',
  //     overview:
  //       'Polkadot is a multi-chain platform that enables the interoperability of various blockchains. It aims to provide a scalable and secure infrastructure for the development of decentralized applications and services. Polkadot allows different blockchains to communicate and share information, creating a more connected and efficient ecosystem.',
  //     details: [
  //       'Symbol: DOT',
  //       'Market Cap: $2 billion',
  //       'Consensus Algorithm: Nominated Proof-of-Stake (NPoS)',
  //       'Genesis Date: 2020',
  //     ],
  //   },
  //   {
  //     title: 'Binance Coin (BNB)',
  //     color: '#F3BA2F',
  //     overview:
  //       'Binance Coin (BNB) is the native cryptocurrency of the Binance exchange, one of the largest cryptocurrency exchanges in the world. BNB is used for various purposes within the Binance ecosystem, including trading fee discounts, participation in token sales, and more.',
  //     details: [
  //       'Symbol: BNB',
  //       'Market Cap: $50 billion',
  //       'Blockchain: Binance Chain',
  //       'Genesis Date: July 2017',
  //     ],
  //   },
  //   {
  //     title: 'Chainlink (LINK)',
  //     color: '#2A5ADA',
  //     overview:
  //       'Chainlink is a decentralized oracle network that enables smart contracts on various blockchains to securely connect with real-world data, APIs, and traditional payment systems. It aims to bridge the gap between blockchain-based smart contracts and real-world applications.',
  //     details: [
  //       'Symbol: LINK',
  //       'Market Cap: $15 billion',
  //       'Oracle Network: Chainlink',
  //       'Genesis Date: September 2017',
  //     ],
  //   },
  //   {
  //     title: 'Stellar (XLM)',
  //     color: '#272D63',
  //     overview:
  //       'Stellar is an open-source, decentralized blockchain platform designed to facilitate fast, low-cost international money transfers and facilitate the issuance and exchange of digital assets. Stellar aims to provide an inclusive financial infrastructure that enables individuals, businesses, and financial institutions to transact seamlessly across borders.',
  //     details: [
  //       'Symbol: XLM',
  //       'Market Cap: $4 billion',
  //       'Consensus Algorithm: Stellar Consensus Protocol (SCP)',
  //       'Genesis Date: July 2014',
  //     ],
  //   },
  // ];

  // data.forEach(function (coin) {
  //   const card = document.createElement('div');
  //   card.classList.add('card');
  //   card.innerHTML = `
  //     <div class="card-body">
  //       <h5 class="card-title">${coin.title}</h5>
  //       <p class="card-text">${coin.overview}</p>
  //       <ul class="list-group list-group-flush">
  //         ${coin.details
  //           .map((detail) => `<li class="list-group-item">${detail}</li>`)
  //           .join('')}
  //       </ul>
  //     </div>
  //   `;
  //   // card.style.backgroundColor = coin.color;

  //   infoContent.appendChild(card);
  // });
}
