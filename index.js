/**
* @example
*
* var managerAsync = new coordAsync(function(r1, r2, r3){
*    ...}).waitFor(3);
* Mysql.query(sql1, managerAsync.add()); //resultAsync1
* Mysql.query(sql2, managerAsync.add()); //resultAsync2
* setTimeout( function(){Mysql.query(sql3, managerAsync.add());}, Math.random()*100 + 500); //resultAsync3
*
*
* Any question, please email-me Steven Koch <stvkoch@gmail.com>
*
*/
function coordAsync(callback) {
  this.callback = callback; // callback that run after all asyncs calls
  this.waitForCalls = 0; //config asyncs call
  this.returned = 0; //check if total returns is equal to total asyncs calls
  this.added = 0;//determine order of results
  this.results = []; //container of results
}

coordAsync.prototype = {
  waitFor: function(totalAsyncCalls){
    this.waitForCalls = totalAsyncCalls;
    return this;
  },
  add: function ( index ) {
    var self = this,
    id = this.added++;
    return function () {
      self.check(id, arguments);
    };
  },
  check: function (id, arg) {
    this.results[id] = this.values(arg);
    this.returned++;
    if (this.returned == this.waitForCalls) {
      this.callback.apply(this, this.results);
    }
  },
  // Retrieve the values of an object's properties.
  values : function(obj) {
    var keys = Object.keys(obj);
    if(keys.length==1) return obj[keys[0]];
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  }
};

exports = module.exports = coordAsync;
