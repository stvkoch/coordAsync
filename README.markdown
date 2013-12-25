# Simple coordinate async calls


[![Build Status coordAsync stvkoch by travis-ci](https://api.travis-ci.org/stvkoch/coordAsync.png)]



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


Another example

    var assert = require("assert")
    , db       = require('../models')
    , config   = require('./config/test.js')
    , Faker = require('Faker')
    , CoordAsync = require("coordAsync");

    describe('Connect:', function(){

      this.timeout(15000);

      before(function(done){
        db.connect(config.database).complete(done);
      });

      beforeEach(function(done){

        var coordAsyncObj = new CoordAsync(function(){done();}).waitFor(5*5);

        for (var i = 0; i < 5; i++) {
          var userData = {
            hash: Faker.Internet.userName(),
            hashType: 'facebook',
            image: 'http://www.gravatar.com/avatar/0000000000000000000000000'+Faker.random.number(1000000)+'?d=identicon&f=y',
            name: Faker.Name.findName()
          };

          db.User.create(userData, Object.keys(userData)).success(function(user){
            for (var i = 0; i < 5; i++) {
              var itemData = {
                description: Faker.Lorem.sentence(7),
                name: Faker.Lorem.sentence(),
                price: Faker.random.number(100),
                views: Faker.random.number(10000)
              };
              db.Item.create(itemData, Object.keys(itemData)).success(function(item){
                user.addItem(item);
                coordAsyncObj.add()();
              });
            };
          });
        };

      });

      describe('Models:', function(){
        it('Find:', function(done){
          db.Item.findAll().success(function(data){
            assert.....

            done();
          });
        });
      });

    });





Test
	
	mocha

Any question please, Steven Koch <steven.koch@gmail.com>
