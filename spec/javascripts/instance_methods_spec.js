describe("instance methods", function() {
  
  var User, user;
  
  afterEach(function() {
    User.reset();
    user = undefined;
    user = undefined;
  }); // end after
  
  describe("valid", function() {
    
    describe("callbacks", function() {
      
      beforeEach(function() {
        User = Model('user');
        user = new User();
        new Mock(User);
      }); // end before
      
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
    
    beforeEach(function() {
      User = Model('user');
      user  = new User({ name: 'user1'});
      user2 = new User({ name: 'user2'});
    }); // end before
    
    it("should remove the record", function() {
      expect(User.all().length).toEqual(2);
      user.remove();
      expect(User.all().length).toEqual(1);
    }); // end it
    
    it("should return the deleted record", function() {
      expect(User.first()).toEqual(user);
      expect(user.remove()).toEqual(user);
      expect(User.first()).toNotEqual(user);
    }); // end it
    
  }); // end describe
  
  describe("update", function() {
    
  }); // end describe
  
  describe("save", function() {
    
  }); // end describe
  
  describe("flatten", function() {
    
  }); // end describe
  
}); // end describe