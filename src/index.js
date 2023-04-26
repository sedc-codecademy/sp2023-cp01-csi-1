let display = document.getElementById("display");

let statistics = document.getElementById("stats");
statistics.addEventListener("click", function () {
    display.innerHTML =
        `<div>
    <h1>Growth in comparison to future</h1>
    <h1>Best Growing</h1>
    <h1>Best Falling</h1>
    </div>`;

});

let simulator = document.getElementById("sim");
simulator.addEventListener("click", function () {
    display.innerHTML =
        `<div>
    <h1>CryptoCoinWallet</h1>
    </div>`;

});

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

    <div class="info"><div class="coins_logo"><img class="cry_img" src="./img/Litecoin.png" alt=""></div>
    <div class="cry_text"><p>This currency is most similar to bitcoin but has moved more quickly to develop new innovations, including faster payments and processes to allow more transactions.</p></div></div>

    

    <h1>Ripple</h1>

    <div class="info"><div class="coins_logo"><img class="cry_img" src="./img/ripple.png" alt=""></div>
    <div class="cry_text"><p>Ripple is a distributed ledger system that was founded in 2012. Ripple can be used to track different kinds of transactions, not just cryptocurrency. The company behind it has worked with various banks and financial institutions.</p></div></div>

    

    </div>`;
});

let login = document.getElementById("login");
login.addEventListener("click", function(){
    display.innerHTML =
    `<div><div id="login_page">
    <label for="username">Username: </label>
    <input id="username" type="text">

    <label for="password">Password: </label>
    <input id="password" type="text">
    </div></div>`;

})

let register = document.getElementById("reg");
register.addEventListener("click", function(){
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

})