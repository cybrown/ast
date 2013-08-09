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
  = Number

Number
  = ConstFloat32
  / ConstFloat64
  / ConstInt64
  / ConstInt32
  / "(" _ expression:expression _ ")" { console.log("expression"); }

ConstFloat64
  = digits:([0-9]+ "." [0-9]*) [dD]? { console.log("ConstFloat64:" + digits); }
  
ConstInt32
  = digits:[0-9]+ { console.log("ConstInt32:" + digits); }

ConstInt64
  = digits:[0-9]+ [lL] { console.log("ConstInt64:" + digits); }

ConstFloat32
  = digits:([0-9]+ "." [0-9]*) [fF] { console.log("ConstFloat32:" + digits); }

_
  = [\t\r\n]*
