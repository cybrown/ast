start
  = expression

expression
  = BinAdditive

BinAdditive
  = left:BinMultiplicative _ "+" _ right:BinAdditive { console.log("+"); }
  / BinMultiplicative

BinMultiplicative
  = left:primary _ "*" _ right:BinMultiplicative { console.log("+"); }
  / primary

primary
  = ConstInteger
  / ConstLong
  / ConstFloat
  / ConstDouble
  / "(" _ expression:expression _ ")" { console.log("expression"); }

ConstInteger
  = ConstDecimalInteger

ConstLong
  = ConstDecimalLong

ConstDouble
  = digits:(Digit+ "." Digit*) [dD]? { console.log("ConstDouble:" + digits); }
  
ConstDecimalInteger
  = digits:Digit+ { console.log("ConstDecimalInteger:" + digits); }

ConstDecimalLong
  = digits:Digit+ [lL] { console.log("ConstDecimalLong:" + digits); }

ConstFloat
  = digits:Digit+ "." Digit* [fF] { console.log("ConstFloat:" + digits); }


Digit
  = [0-9]

_
  = [\t\r\n]*
