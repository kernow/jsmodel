describe("instance methods", function() {
  
  describe("valid", function() {
    
    describe("callbacks", function() {
      
      var User, user;
      
      beforeEach(function() {
        User = Model('user');
        user = new User();
        new Mock(User);
      }); // end before
      
      afterEach(function() {
        User.reset();
        user = undefined;
        user = undefined;
      }); // end after
      
      it("should not be triggered when the skip_callbacks options is passed", function() {
        User.expects('trigger').never();
        user.valid({ skip_callbacks: true });
      }); // end it
      
      it("should be triggers when no options passed", function() {
        User.expects('trigger').twice();
        user.valid();
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
  describe("remove", function() {
    
  }); // end describe
  
  describe("update", function() {
    
  }); // end describe
  
  describe("save", function() {
    
  }); // end describe
  
  describe("flatten", function() {
    
  }); // end describe
  
}); // end describe