describe("instance methods", function() {
  
  var User, user;
  
  afterEach(function() {
    User.reset();
    User = undefined;
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
    
    var user2
    
    beforeEach(function() {
      User = Model('user');
      user  = new User({ name: 'user1'});
      user2 = new User({ name: 'user2'});
    }); // end before
    
    afterEach(function() {
      user2 = undefined;
    }); // end after
    
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
    
    var user2
    
    beforeEach(function() {
      User = Model('user');
      user  = new User({ name: 'user1', age: 99, sex: 'male' });
      user2 = new User({ name: 'user2', age: 20, sex: 'female' });
    }); // end before
    
    afterEach(function() {
      user2 = undefined;
    }); // end after
    
    it("should update the attributes", function() {
      expect(user.get_name()).toEqual('user1');
      expect(user.get_age()).toEqual(99);
      expect(user.get_sex()).toEqual('male');
      user.update({ name: 'Roger' });
      expect(user.get_name()).toEqual('Roger');
      user.update({ sex: 'unknown', age: 28 });
      expect(user.get_age()).toEqual(28);
      expect(user.get_sex()).toEqual('unknown');
      
      expect(user2.get_name()).toEqual('user2');
      expect(user2.get_age()).toEqual(20);
      expect(user2.get_sex()).toEqual('female');
      user2.update({ name: 'Sam', age: 45, sex: 'changed' });
      expect(user2.get_name()).toEqual('Sam');
      expect(user2.get_age()).toEqual(45);
      expect(user2.get_sex()).toEqual('changed');
    }); // end it
    
  }); // end describe
  
  describe("save", function() {
    
  }); // end describe
  
  describe("flatten", function() {
    
    var user2
    
    beforeEach(function() {
      User = Model('user');
      user  = new User({ name: 'user1', age: 99, sex: 'male' });
      user2 = new User({ name: 'user2', age: 20, sex: 'female' });
    }); // end before
    
    afterEach(function() {
      user2 = undefined;
    }); // end after
    
    it("should return a flattened representation of the model", function() {
      expect(user.flatten() ).toEqual({ id: 0, name: 'user1', age: 99, sex: 'male' });
      expect(user2.flatten()).toEqual({ id: 1, name: 'user2', age: 20, sex: 'female' });
    }); // end it
    
  }); // end describe
  
}); // end describe