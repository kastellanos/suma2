describe('Converter service', function() {
  var Converter;
  
  var units = 
				[
					"zero","one","two","three","four","five","six","seven","eight","nine","ten",
					"eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"
				];
  beforeEach(angular.mock.module('api.converter'));
  
  beforeEach(inject(function(_Converter_){
    Converter = _Converter_;
    Converter.init();
  }));
   
  it('should exist', function() {
    // An intentionally failing test. No code within expect() will never equal 4.
    expect(Converter).toBeDefined();
  });
  
  
  describe('.init()',function(){
	  it('should exist', function(){
		expect(Converter.init).toBeDefined();
	  });
	  it('should return a list of english units numbers', function(){
		  
		  expect(Converter.units).toEqual(units);
		
	  });
  });
  
  describe('.convertToNum()',function(){
	  
	  it('should exist', function(){
		expect(Converter.convertToNum).toBeDefined();
	  });
	  it('should return Word number converted to number',function(){
		expect(Converter.convertToNum("one")).toEqual(1);
	  });
	  it('should return 0 because there is not valid word number',function(){
		expect(Converter.convertToNum("hundred veinte")).toEqual(0);
	  });
	  it('should return a well converted number for that large word',function(){
		expect(Converter.convertToNum("eighty nine million seven hundred twelve thousand three hundred twelve")).toEqual(89712312);
	  });
	  
  });
  describe('.convertToWord()',function(){
	  it('should exist', function(){
		 
		expect(Converter.convertToWord).toBeDefined();
	  });
	  it('should return a number converted to english word number',function(){
		expect(Converter.convertToWord(1)).toEqual("one");
	  });
	  it('should return zero because there is not valid number',function(){
		expect(Converter.convertToWord("hola Mundo")).toEqual("zero");
	  });
	  it('should return a well converter word from a random number',function(){
		expect(Converter.convertToWord(5671364)).toEqual("five million six hundred seventy one thousand three hundred sixty four");
	  });
  });
});
