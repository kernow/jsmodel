/*global Model: false */

describe("class Storage", function() {
  
  var User;
  
  beforeEach(function() {
    User = undefined;
  }); // end before
  
  describe("specifying the storage backend", function() {
    
    describe("default", function() {
      
      beforeEach(function() {
        User = Model('user');
        new Mock(Model.Storage.Memory);
      }); // end before
      
      it("should use the memory storage", function() {
        Model.Storage.Memory.expects('setItem');
        var user = new User();
      }); // end it
    }); // end describe
    
    if(Model.Storage.Session.supported()){
    
      describe("session", function() {
      
        beforeEach(function() {
          User = Model('user', { storage: Model.Storage.Session });
          new Mock(Model.Storage.Session);
        }); // end before
      
        it("should use the session storage", function() {
          Model.Storage.Session.expects('setItem');
          var user = new User();
        }); // end it
      }); // end describe
    
    }
    
    describe("cookie", function() {
      
      beforeEach(function() {
        User = Model('user', { storage: Model.Storage.Cookie });
        new Mock(Model.Storage.Cookie);
      }); // end before
      
      it("should use the cookie storage", function() {
        Model.Storage.Cookie.expects('setItem');
        var user = new User();
      }); // end it
    }); // end describe
    
    describe("using fallback backends", function() {
      
      beforeEach(function() {
        new Mock(Model.Storage.Cookie);
        new Mock(Model.Storage.Session);
        Model.Storage.Session.expects('supported').returns(false);
        User = Model('user', { storage: [Model.Storage.Session, Model.Storage.Cookie] });
      }); // end before
      
      it("should use the cookie storage", function() {
        Model.Storage.Cookie.expects('setItem');
        var user = new User();
      }); // end it
    }); // end describe
    
  }); // end describe
  
  describe("Session backend", function() {
    
    var user1, user2, user3;

    beforeEach(function() {
      User = Model('user', { storage: Model.Storage.Session });
    });

    describe("loading", function() {

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

      it("should raise an after_load event for each record loaded", function() {
        var user_mock = new Mock(User);
        User.expects('trigger').passing('after_load', Match.an_array).times(3);
        User.load();
      }); // end it

    }); // end describe
    
  }); // end describe
  
}); // end describe
