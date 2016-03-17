angular.module('app').service('ticker',function($interval,$http,$q,constants){

	if(blockchain.env==='production'){
		var Infosphere = web3.eth.contract(contracts.Infosphere.abi).at("0xaf527686227cc508ead0d69c7f8a98f76b63e191")
			,tickerAddress = '0xdc99b79555385ab2fe0ff28c3c954a07b28aac5e'
	}else{
		var Infosphere = web3.eth.contract(contracts.Infosphere.abi).at(contracts.Infosphere.address)
			,tickerAddress = deployer
	}

	var symbols = ['CMC:TETH:USD','CMC:TETH:EUR','CMC:TETH:CNY','CMC:TETH:CAD','CMC:TETH:RUB','CMC:TETH:BTC'];
	var rates = {'ETH': (web3.toBigNumber('1'))};

	symbols.forEach(function(symbol) {
		var currency = _.last(symbol.split(':'))
			,rate = Infosphere.getUint(tickerAddress, symbol)
		
		rates[currency] = rate.div(constants.tera)
	})

	rates['WEI'] = rates.ETH.times('1000000000000000000')

	this.rates = rates
});
