beforeEach(function() {
  this.addMatchers({
    verify_expectations: function() {
      if(this.actual.jsmocha.verify()){
        this.actual.jsmocha.teardown();
        return true;
      }else{
        this.message = function() {
          return this.actual.jsmocha.report();
        };
        return false;
      }
    }
  });
});
