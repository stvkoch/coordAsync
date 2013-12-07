/*
* Tests and demostrations
*
* any questions please send me email. stvkoch
*/
var should = require('should');
var coordAsync = require("../");

/*
  asyncRun1Arg('hello', coordAsyncObj.add() );
*/
function asyncRun1Arg( arg, callback ){
  setTimeout( function(){callback(arg)}, 0);
}
/*
  simulate normal async function that receive two args and on callback to success
  transfer your two argument received to callback
*/
function asyncRun2Arg( arg1, arg2, callback ){
  setTimeout( function(){callback(arg1, arg2)}, 0);
}


describe('#coordenateAsyncs:', function(){
  it('callback with 1 arg run after all async functions', function(done){
    this.timeout(5000);
    var coordAsyncObj = new coordAsync(function (res1, res2, res3) {
      should.equal(res1, 'foo');
      should.equal(res2, 'bar');
      should.equal(res3, 'test');
      done();
    }).waitFor(3);

    asyncRun1Arg('foo', coordAsyncObj.add() );
    asyncRun1Arg('bar', coordAsyncObj.add() );
    asyncRun1Arg('test', coordAsyncObj.add() );

  });

  it('callback with 2 arg run after all async functions', function(done){
    this.timeout(5000);
    var coordAsyncObj = new coordAsync(function (res1, res2, res3) {
      should.equal(res1[0], 'foo1');
      should.equal(res1[1], 'foo2');
      should.equal(res2[0], 'bar1');
      should.equal(res2[1], 'bar2');
      should.equal(res3[0], 'test1');
      should.equal(res3[1], 'test2');
      done();
    }).waitFor(3);

    asyncRun2Arg('foo1', 'foo2', coordAsyncObj.add() );
    asyncRun2Arg('bar1', 'bar2', coordAsyncObj.add() );
    asyncRun2Arg('test1', 'test2', coordAsyncObj.add() );

    // setTimeout( function(){ asyncRun('test', coordAsyncObj.add() ) }, 0);

  });

  it('mix callback with 1 and 2 arg run after all async functions', function(done){
    this.timeout(5000);
    var coordAsyncObj = new coordAsync(function (argWith1, argWith2) {
      should.equal(argWith1, 'foo');
      should.equal(argWith2[0], 'error');
      should.equal(argWith2[1], 'result');
      done();
    }).waitFor(2);

    asyncRun1Arg('foo', coordAsyncObj.add() );
    asyncRun2Arg('error', 'result', coordAsyncObj.add() );

  });
});