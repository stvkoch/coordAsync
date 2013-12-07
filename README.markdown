# Simple coordinate async calls



Example
	
	var coordAsync = require("coordAsync");
	var coordAsyncObj = new coordAsync(function (resSql1, resSql2, resSql3) {
      var errorSql1 = resSql1[0];
      var dataSql1 = resSql1[1];
      ...
    }).waitFor(3);

    Mysql.query( $sql1, coordAsyncObj.add() );
    Mysql.query( $sql2, coordAsyncObj.add() );
    Mysql.query( $sql3, coordAsyncObj.add() );

    // even async registers
    //setTimeout( function(){ Mysql.query( $sql3, coordAsyncObj.add() ); }, Math.random()*100);


Test
	
	mocha

Any question please, Steven Koch <steven.koch@gmail.com>