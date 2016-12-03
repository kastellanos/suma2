var units = 
				[
					"one","two","three","four","five","six","seven","eight","nine","ten",
					"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"
				];
var tens = 
				[
					"twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"
				];
var rest_units= 
				[
					"hundred","thousand","million","billion","trillion"
				];
var word2num = {};
var num2word = {};
var num_list = [];
function init(){

	for(var i = 0; i< units.length; i++ ){
		numValue = []
		numValue.push(i+1);
		numValue.push('u');
		word2num[units[i]] = numValue;
		num2word[numValue[0]] = units[i];
		num_list.push(numValue[0]);
	}
	for(var i = 0; i< tens.length; i++ ){
		numValue = []
		numValue.push((i+2)*10);
		numValue.push('d');
		word2num[tens[i]] = numValue;
		num2word[numValue[0]] = tens[i];
		num_list.push(numValue[0]);
	}
	for(var i = 0; i< rest_units.length; i++ ){
		numValue = []
		if(i == 0){
			numValue.push(Math.pow(10,2));
		}
		else{
			numValue.push(Math.pow(10,(i*3)));
		}
		numValue.push('r');
		word2num[rest_units[i]] = numValue;
		num2word[numValue[0]] = rest_units[i];
		num_list.push(numValue[0]);
	}
	
}
function calculator(number){
	var result = [];
	if( number < 20){
		if(number ==0) return result;
		result.push(num2word[number]);
	}else if( number < 100){
		result.push(num2word[number-(number%10)]);
		if(number%10 !=0 ) {
		result.push(num2word[number%10]);
		}
	}else{
		
		temp = calculator(Math.floor(number/100));
		for(var j=0;j<temp.length;j++ ){
			result.push(temp[j]);
		}
		result.push(num2word[100]);
		temp1 =calculator(number%100);
		for(var j=0;j<temp1.length;j++ ){
			result.push(temp1[j]);
		}
	}
	return result;
}
function convertToWord(number){
	separate =  [];
	var result1 = [];
	//alert(number);
	while(number > 0 ){
		separate.push(number % 1000);
		number = Math.floor(number /1000);
	}
	separate.reverse();
	//alert(separate);

	
	for(var i=0; i<separate.length;i++){
		//alert("i: "+i);
		if(i>0){
			result1.push(rest_units[separate.length-i]);
			
		}
		if(separate[i]!=0){
		temp = calculator(separate[i]);
		for(var j=0;j<temp.length;j++ ){
		result1.push(temp[j]);
		}
		}
		
	}
	return result1;
	
}

function convertToNum(word_number){
	number = 0;
	words = word_number.split(" ");
	temp = [];
	value = 0;
	correction = 0;
	for(var i=0; i < words.length; i++){
		numValue = word2num[words[i]];
		//alert(numValue);
		if (numValue == null) {
			return 0;
		}
		
		
			if(numValue[1]=='r' ) {
				
				correction = correction * numValue[0];
				if(numValue[0] > 100 ){
						value += correction
						correction = 0;
				}
			}else{
				correction += numValue[0]
			}
		

	}
	/*otro = temp.sort();
	while( otro.length > 0 ){
		i = otro.indexOf(otro.length-1);
		for()
	}*/

	return value + correction;
	if( temp.length > 0 ){
		accum = 0;
		for(var i=0; i< temp.length; i++){
			accum += temp[i][0];
		}
		alert(accum);
	}

}				

function sumar(){
number1 = document.getElementById("number_1").value;
number2 = document.getElementById("number_2").value;
result = convertToNum(number1) + convertToNum(number2);
document.getElementById("resultado").innerHTML = result;
}