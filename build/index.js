!function(){window.app=angular.module("myApp",[])}(),function(){window.app.controller("myCtrl",function(n){n.currencyFromAmmount=0,n.currencyToAmmount="",n.compute=function(){console.log(n.currencyFromAmmount*n.currencyToAmmount)},n.currencyList=["USD","EUR","UAH"],n.currency="Currency",n.changeTargetCurrency=function(c){n.currency=c}})}();