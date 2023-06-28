let display = document.getElementById("display");

// Statistic page


const bestGrowingCryptoCards = document.querySelector('.best-growing-crypto-cards');
const worstGrowingCryptoCards = document.querySelector('.worst-growing-crypto-cards');
const switchBtnContainer = document.querySelector('.card-switch-btn-container');

let stats = document.querySelector('#stats');
stats.addEventListener('click', () => {
  display.innerHTML = `
    <div class="statistics">
    <h1 class="table-stat-title">Growth in comparison to the future</h1>
    <br>
    <table class="growth-table">
    <thead>
      <tr>
        <th>Currency</th>
        <th>Year</th>
        <th>Price</th>
        <th>Peak year</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="stats-td">Bitcoin (BTC)</td>
        <td>2009</td>
        <td>$0.0009</td>
        <td>2021</td>
        <td>$64,000 5</td>
      </tr>
      <tr>
        <td class="stats-td">Etherium (ETH)</td>
        <td>2013</td>
        <td>$1</td>
        <td>2021</td>
        <td>$4,815.01</td>
      </tr>
      <tr>
        <td class="stats-td">Ripple (XRP)</td>
        <td>2012</td>
        <td>$$0.000853</td>
        <td>2018</td>
        <td>$3.84</td>
      </tr>
      <tr>
        <td class="stats-td">Litecoin (LTC)</td>
        <td>2011</td>
        <td>$0.30</td>
        <td>2017</td>
        <td>$375</td>
      </tr>
      <tr>
        <td class="stats-td">Binance Coin (BNB)</td>
        <td>2017</td>
        <td>$0.19</td>
        <td>2021</td>
        <td>$686</td>
      </tr>
      <tr>
        <td class="stats-td">Cardano (ADA)</td>
        <td>2015</td>
        <td>$0.02</td>
        <td>2021</td>
        <td>$2.45</td>
      </tr>
    </tbody>
  </table>
  <br>
  <br>
  <br>
</div>`;

  const bestCardsData = [
    { image: './img/link-logo.png', title: 'LINK/USD', stat: '4.55%', price: '$7.69' },
    { image: './img/ada-logo.png', title: 'ADA/USA', stat: '2.81%', price: '$0.32' },
    { image: './img/dot-logo.png', title: 'DOT/USD', stat: '2.25%', price: '$5.46' },
    { image: './img/bch-logo.png', title: 'BCH/USD', stat: '1.98%', price: '$113.40' },
    { image: './img/bnb-logo.png', title: 'BNB/USD', stat: '1.18%', price: '$300.20' },
    { image: './img/xlm-logo.png', title: 'XLM/USD', stat: '1.01%', price: '$0.0899' },
    { image: './img/omg-logo.png', title: 'OMG/USD', stat: '0.17%', price: '$0.802' },
    { image: './img/btc-logo.webp', title: 'BTC/USD', stat: '0.09%', price: '$26.943' }
  ];

  const worstCardsData = [
    { image: './img/dsh-logo.png', title: 'DSH/USD', stat: '-1.55%', price: '$43.95' },
    { image: './img/neo-logo.png', title: 'NEO/USA', stat: '-0.96%', price: '$9.407' },
    { image: './img/xmr-logo.png', title: 'XMR/USD', stat: '-0.57%', price: '$150.99' },
    { image: './img/ltc-logo.png', title: 'LTC/USD', stat: '-0.36%', price: '$91.97' },
    { image: './img/xpr-logo.png', title: 'XPR/USD', stat: '-0.24%', price: '$0.466' },
    { image: './img/eos-logo.png', title: 'EOS/USD', stat: '-0.20%', price: '$0.88' },
    { image: './img/dgb-logo.png', title: 'DGB/USD', stat: '-0.07%', price: '$0.008071' },
    { image: './img/tube-logo.png', title: 'TUBE/USD', stat: '-0.01%', price: '$0.0004' }
  ];

  bestGrowingCryptoCards.innerHTML = '';
  worstGrowingCryptoCards.innerHTML = '';

  bestCardsData.forEach((card => {
    const newCard = document.createElement('div');
    newCard.classList.add('best-growing');

    // const bestWorstH2 = document.createElement('h2');
    // bestWorstH2.textContent = 'Best Growing';
    // newCard.appendChild(bestWorstH2);

    const imageElement = document.createElement('img');
    imageElement.classList.add('best-card-img');
    imageElement.src = `${card.image}`;
    newCard.appendChild(imageElement);

    const titleElement = document.createElement('h2');
    titleElement.classList.add('best-card-title');
    titleElement.textContent = card.title;
    newCard.appendChild(titleElement);

    const statElement = document.createElement('p');
    statElement.classList.add('best-stat');
    statElement.textContent = card.stat;
    newCard.appendChild(statElement);

    const priceElement = document.createElement('p');
    priceElement.classList.add('best-price');
    priceElement.textContent = card.price;
    newCard.appendChild(priceElement);

    bestGrowingCryptoCards.append(newCard);
  }));

  worstCardsData.forEach((card => {
    const newCard = document.createElement('div');
    newCard.classList.add('worst-growing');

    const imageElement = document.createElement('img');
    imageElement.classList.add('worst-card-img');
    imageElement.src = `${card.image}`;
    newCard.appendChild(imageElement);

    const titleElement = document.createElement('h2');
    titleElement.classList.add('worst-card-title');
    titleElement.textContent = card.title;
    newCard.appendChild(titleElement);

    const statElement = document.createElement('p');
    statElement.classList.add('worst-stat');
    statElement.textContent = card.stat;
    newCard.appendChild(statElement);

    const priceElement = document.createElement('p');
    priceElement.classList.add('worst-price');
    priceElement.textContent = card.price;
    newCard.appendChild(priceElement);

    worstGrowingCryptoCards.append(newCard);
  }));

  const switchBtn = document.querySelector('.card-switch-btn');
  const switchBtnContainer = document.querySelector('.card-switch-btn-container');

  switchBtnContainer.classList.add('visible');

  let isBestCardsVisible = true;

  switchBtn.addEventListener('click', () => {
    if (isBestCardsVisible) {
      switchBtn.style.backgroundColor = 'red';
      switchBtn.textContent = 'Worst Growing';
      bestGrowingCryptoCards.classList.add('hidden');
      worstGrowingCryptoCards.classList.add('visible');
      isBestCardsVisible = false;
    } else {
      switchBtn.style.backgroundColor = 'green';
      switchBtn.textContent = 'Best Growing';
      worstGrowingCryptoCards.classList.remove('visible');
      bestGrowingCryptoCards.classList.remove('hidden');
      isBestCardsVisible = true;
    };
  });
});

function clearCardContainers() {
  bestGrowingCryptoCards.innerHTML = '';
  worstGrowingCryptoCards.innerHTML = '';
};

function clearCardBtn() {
  switchBtnContainer.classList.remove('visible');
};

// Simulator page

let simulator = document.getElementById("sim");
simulator.addEventListener("click", function () {
  display.innerHTML =
    `<div>
    <h1>CryptoCoinWallet</h1>
    </div>`;

  clearCardContainers();
  clearCardBtn();
});

// Info Page

let info = document.getElementById("info");
info.addEventListener("click", function () {
  display.innerHTML =
    `<div>
    <h1>What is cryptocurrency?</h1>

    <p>Cryptocurrency is a digital payment system that doesn't rely on banks to verify transactions. It’s a peer-to-peer system that can enable anyone anywhere to send and receive payments. Instead of being physical money carried around and exchanged in the real world, cryptocurrency payments exist purely as digital entries to an online database describing specific transactions. When you transfer cryptocurrency funds, the transactions are recorded in a public ledger. Cryptocurrency is stored in digital wallets.
    
    Cryptocurrency received its name because it uses encryption to verify transactions. This means advanced coding is involved in storing and transmitting cryptocurrency data between wallets and to public ledgers. The aim of encryption is to provide security and safety.
    
    The first cryptocurrency was Bitcoin, which was founded in 2009 and remains the best known today. Much of the interest in cryptocurrencies is to trade for profit, with speculators at times driving prices skyward.</p>

    <hr>

    <h1>How does cryptocurrency work?</h1>

    <p>Cryptocurrencies run on a distributed public ledger called blockchain, a record of all transactions updated and held by currency holders.
    
    Units of cryptocurrency are created through a process called mining, which involves using computer power to solve complicated mathematical problems that generate coins. Users can also buy the currencies from brokers, then store and spend them using cryptographic wallets.
    
    If you own cryptocurrency, you don’t own anything tangible. What you own is a key that allows you to move a record or a unit of measure from one person to another without a trusted third party.
    
    Although Bitcoin has been around since 2009, cryptocurrencies and applications of blockchain technology are still emerging in financial terms, and more uses are expected in the future. Transactions including bonds, stocks, and other financial assets could eventually be traded using the technology.</p>

    <hr>

    <h1>Cryptocurrency examples</h1>

    <p>There are thousands of cryptocurrencies. Some of the best known include:</p>


    <h1>Bitcoin</h1>

    <div class="info"><div class="coins_logo"><img class="cry_img" src="./img/bitcoin.png" alt=""></div>
    <div class="cry_text"><p>Founded in 2009, Bitcoin was the first cryptocurrency and is still the most commonly traded. The currency was developed by Satoshi Nakamoto – widely believed to be a pseudonym for an individual or group of people whose precise identity remains unknown.</p></div></div>

    

    <h1>Ethereum</h1>

    <div class="info"><div class="coins_logo"><img class="eth_img" src="./img/ethereum.png" alt=""></div>
    <div class="cry_text"><p>Developed in 2015, Ethereum is a blockchain platform with its own cryptocurrency, called Ether (ETH) or Ethereum. It is the most popular cryptocurrency after Bitcoin.</p></div></div>

 

    <h1>Litecoin</h1>

    <div class="info"><div class="coins_logo"><img class="cry_img" src="./img/ltc-logo.png" alt=""></div>
    <div class="cry_text"><p>This currency is most similar to bitcoin but has moved more quickly to develop new innovations, including faster payments and processes to allow more transactions.</p></div></div>

    

    <h1>Ripple</h1>

    <div class="info"><div class="coins_logo"><img class="cry_img" src="./img/ripple.png" alt=""></div>
    <div class="cry_text"><p>Ripple is a distributed ledger system that was founded in 2012. Ripple can be used to track different kinds of transactions, not just cryptocurrency. The company behind it has worked with various banks and financial institutions.</p></div></div>

    

    </div>`;

  clearCardContainers();
  clearCardBtn();
});

// Login

let login = document.getElementById("login");
login.addEventListener("click", function () {
  display.innerHTML =
    `<div><div id="login_page">
    <label for="username">Username: </label>
    <input id="username" type="text">

    <label for="password">Password: </label>
    <input id="password" type="text">
    </div></div>`;
  clearCardContainers();
  clearCardBtn()
});

// Register

let register = document.getElementById("reg");
register.addEventListener("click", function () {
  display.innerHTML =
    `<div><div id="register_page">
    <form action="post">
    <label for="firstName">First Name:</label>
    <input id="firstName" type="text">

    <label for="lastName">Last Name: </label>
    <input id="password" type="text">
    
    <label for="email">e-mail: </label>
    <input id="email" type="email">

    <button type="submit">Submit</button>
    </form>

    </div></div>`;

  clearCardContainers();
  clearCardBtn();
});