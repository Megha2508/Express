var events=require('events');
function Account(){
    this.balance=0;
    events.EventEmitter.call(this);
    this.deposit=function(amount){
        this.balance+=amount;
        this.emit('Balance Changed');
    };
    this.withdraw=function(amount){
        this.balance-=amount;
        this.emit('Balance Changed');
    };
}
Account.prototype.__proto = events.EventEmitter.prototype;
function displayBalance(){
    console.log("Account Balance: %d", this.balance);
}
function checkOverdraw(){
    if(this.balance<0){
        console.log("Account overdrawn!!");
    }
}
function checkGoal(acc,goal){
    if(acc.balance>goal){
        console.log("Goal Achieved!!");
    }
}
var account = new Account();
account.on("Balance Changed", displayBalance);
account.on("Balance Changed", checkOverdraw);
account.on("Balance Changed", function(){
    checkGoal(this,1000);
});
account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withdraw(1200)