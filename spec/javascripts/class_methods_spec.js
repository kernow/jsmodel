describe("class methods", function() {
  
  var User, user1, user2, user3;
  
  beforeEach(function() {
    User = Model('user');
  });
  
  afterEach(function() {
    User.reset();
  }); // end after
  
  describe("all", function() {
    
    beforeEach(function() {
      user1 = new User({ name: 'Bill' });
      user2 = new User({ name: 'Ben' });
      user3 = new User({ name: 'Bob' });
    }); // end before
    
    it("should return all model records", function() {
      expect(User.all().length).toEqual(3);
      
      expect(User.all()[0].get_name()).toEqual('Bill');
      expect(User.all()[1].get_name()).toEqual('Ben');
      expect(User.all()[2].get_name()).toEqual('Bob');
    }); // end it
  }); // end describe
  
  describe("find", function() {
    
    beforeEach(function() {
      user1 = new User({ name: 'Bill',  age: 12 });
      user2 = new User({ name: 'Ben',   age: 12 });
      user3 = new User({ name: 'Bob',   age: 99 });
    }); // end before
    
    it("should find the user Bill", function() {
      var users = User.find({ name: 'Bill' });
      expect(users.length).toEqual(1);
      expect(users[0].get_name()).toEqual('Bill');
    });
    
    it("should find the user Bob", function() {
      var users = User.find({ name: 'Bob' });
      expect(users.length).toEqual(1);
      expect(users[0].get_name()).toEqual('Bob');
    });
    
    it("should find users who are 12", function() {
      var users = User.find({ age: 12 });
      expect(users.length).toEqual(2);
      expect(users[0].get_name()).toEqual('Bill');
      expect(users[1].get_name()).toEqual('Ben');
    });
    
    it("should not find any users who are 16", function() {
      var users = User.find({ age: 16 });
      expect(users.length).toEqual(0);
    });
  }); // end describe
  
  describe("first", function() {
    
    afterEach(function() {
      User.reset();
    }); // end after
    
    describe("when items exist", function() {
      
      beforeEach(function() {
        user1 = new User({ name: 'Bill',  age: 12 });
        user2 = new User({ name: 'Ben',   age: 12 });
        user3 = new User({ name: 'Bob',   age: 99 });
      }); // end before
      
      it("should return the first record", function() {
        expect(User.first().get_name()).toEqual('Bill');
      }); // end it
      
    }); // end describe
    
    describe("when no items exist", function() {
      
      it("should return undefined", function() {
        expect(User.first()).toBeUndefined();
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
  describe("reset", function() {
    
    beforeEach(function() {
      user1 = new User({ name: 'Bill' });
      user2 = new User({ name: 'Ben' });
      user3 = new User({ name: 'Bob' });
    });
    
    it("should remove all records", function() {
      expect(User.all().length).toEqual(3);
      User.reset();
      expect(User.all().length).toEqual(0);
    });
    
  }); // end describe
  
  describe("load", function() {
    
    beforeEach(function() {
      user1 = new User({ name: 'Bill' });
      user2 = new User({ name: 'Ben' });
      user3 = new User({ name: 'Bob' });
    }); // end before
    
    it("should load records from local storage", function() {
      // clear the records from memory but not local storage
      User._model_items = [];
      User.load();
      
      expect(User.all().length).toEqual(3);
    }); // end it
    
    it("should clear records from memory before loading", function() {
      User.load();
      expect(User.all().length).toEqual(3);
    }); // end it
    
  }); // end describe
  
  xdescribe("write_to_store", function() {
    
  }); // end describe
}); // end describe