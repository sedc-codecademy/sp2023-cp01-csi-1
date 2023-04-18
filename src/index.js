let display = document.getElementById("display");

let statistics = document.getElementById("stats");
statistics.addEventListener("click",function(){
    display.innerHTML = 
    `<div>
    <h1>Growth in comparison to future</h1>
    <h1>Best Growing</h1>
    <h1>Best Falling</h1>
    </div>`;
    
});

let simulator= document.getElementById("sim");
simulator.addEventListener("click",function(){
    display.innerHTML = 
    `<div>
    <h1>CryptoCoinWallet</h1>
    </div>`;
    
});

let info = document.getElementById("info");
info.addEventListener("click",function(){
    display.innerHTML = 
    `<div>
    <h1>How cryptocurrency works?</h1>
    <h1>What is cryptocurrency?</h1>
    </div>`;
});