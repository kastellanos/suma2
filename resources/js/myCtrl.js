app.controller("myCtrl", function($scope,Converter) {
	$scope.latest_ops = []
    $scope.firstNumber = "";
    $scope.secondNumber = "";
    $scope.number1_invalid = false;
	$scope.number2_invalid = false;
	Converter.init();
	$scope.sum = function(){
		number1 = Converter.convertToNum($scope.firstNumber);
		number2 = Converter.convertToNum($scope.secondNumber);
		if((number1==0 && $scope.firstNumber != "zero") ){
			$scope.number1_invalid = "Número invalido";
		}else{
			$scope.number1_invalid = false;
		}
		if((number2==0 && $scope.secondNumber != "zero") ){
			$scope.number2_invalid = "Número invalido";
		}else{
			$scope.number2_invalid = false;
		}
		if($scope.number1_invalid==false && $scope.number2_invalid==false){
			$scope.result = Converter.convertToWord( number1 + number2 );
			if($scope.latest_ops.length == 5){
				$scope.latest_ops.reverse();
				$scope.latest_ops.pop();
				$scope.latest_ops.reverse();
			}
			str_res = {op:number1.toString()+" + "+number2.toString(),res: (number1+number2).toString()};
			if($scope.latest_ops.length > 0 && str_res["op"] != $scope.latest_ops[$scope.latest_ops.length-1]["op"]){
				$scope.latest_ops.push(str_res);
			}else if($scope.latest_ops.length == 0){
				$scope.latest_ops.push(str_res);
			}
		}
	}			

});
