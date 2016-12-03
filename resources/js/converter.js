(function() {
	
	
	angular.module('api.converter',[])
	.factory('Converter', function() {
		var Converter = {};
		
		Converter.units = 
				[
					"zero","one","two","three","four","five","six","seven","eight","nine","ten",
					"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"
				];
	Converter.tens = 
				[
					"twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"
				];
	Converter.rest_units= 
				[
					"hundred","thousand","million","billion","trillion"
				];
	Converter.word2num = {};
	Converter.num2word = {};
	Converter.num_list = [];
	Converter.init = function (){

		for(var i = 0; i < Converter.units.length; i++ ){

			var numValue = [];
			numValue.push(i);
			numValue.push('u');
			Converter.word2num[Converter.units[i]] = numValue;
			Converter.num2word[numValue[0]] = Converter.units[i];
			Converter.num_list.push(numValue[0]);
		}
		for(var i = 0; i < Converter.tens.length; i++ ){
			numValue = [];
			numValue.push((i+2)*10);
			numValue.push('d');
			Converter.word2num[Converter.tens[i]] = numValue;
			Converter.num2word[numValue[0]] = Converter.tens[i];
			Converter.num_list.push(numValue[0]);
		}
		for(var i = 0; i < Converter.rest_units.length; i++ ){
			numValue = [];
			if(i == 0){
				numValue.push(Math.pow(10,2));
			}
			else{
				numValue.push(Math.pow(10,(i*3)));
			}
			numValue.push('r');
			Converter.word2num[Converter.rest_units[i]] = numValue;
			Converter.num2word[numValue[0]] = Converter.rest_units[i];
			Converter.num_list.push(numValue[0]);
		}
	
	}
	Converter.convertToNum = function(word_number){
		number = 0;
		words = word_number.split(" ");
		temp = [];
		value = 0;
		correction = 0;
		for(var i=0; i < words.length; i++){
			numValue = Converter.word2num[words[i]];
			if (numValue == null) {
				return 0;
			}
			if(numValue[1]=='r' ) {
				
				correction = correction * numValue[0];
				if(numValue[0] > 100 ){
						value += correction;
						correction = 0;
				}
			}else{
				correction += numValue[0];
			}
		}

		return value + correction;
	}	
	Converter.calculator = function(number){
		var result = [];
		if( number < 20){
			if(number == 0) return result;
			result.push(Converter.num2word[number]);
		}else if( number < 100){
			result.push(Converter.num2word[number-(number%10)]);
			if(number%10 !=0 ) {
			result.push(Converter.num2word[number%10]);
			}
		}else{
			
			temp = Converter.calculator(Math.floor(number/100));
			for(var j=0;j<temp.length;j++ ){
				result.push(temp[j]);
			}
			result.push(Converter.num2word[100]);
			temp1 =Converter.calculator(number%100);
			for(var j=0;j<temp1.length;j++ ){
				result.push(temp1[j]);
			}
		}
		return result;
	}
	Converter.convertToWord = function(number){
		separate =  [];
		result1 = [];
		if(number<=0 || isNaN(number)==true)
			return "zero"
		while(number > 0 ){
			separate.push(number % 1000);
			number = Math.floor(number /1000);
		}
		separate.reverse();
		for(var i=0; i<separate.length;i++){
			if(i>0){
				result1.push(Converter.rest_units[separate.length-i]);
			}
			if(separate[i]!=0){
			temp = Converter.calculator(separate[i]);
			for(var j=0;j<temp.length;j++ ){
			result1.push(temp[j]);
			}
			}
			
		}
		return result1.join(" ");
		
	}
	return Converter;
	});
})();
 
