/*global Model: false */

describe('Model', function () {
  
  var User;
  var user;
  
  afterEach(function() {
    User.reset();
    User = undefined;
    user = undefined;
  }); // end after
  
  describe("attributes", function() {
    
    beforeEach(function() {
      User = Model('user', {
        attributes:  ['full_name', 'title', 'age', 'height', 'weight'],
        class_methods: {
          define_getters_setters: function(model){
            model.get_first_name  = function() { return model.attrs.full_name.split(' ')[0]; };
            model.get_last_name   = function() { return model.attrs.full_name.split(' ')[1]; };
            
            model.set_first_name  = function(val) {
              var last_name = model.attrs.full_name.split(' ')[1];
              model.attrs.full_name = val + ' ' + last_name;
            };
            model.set_last_name   = function(val) {
              var first_name = model.attrs.full_name.split(' ')[0];
              model.attrs.full_name = first_name + ' ' + val;
            };
          }
        }
      });
    }); // end before

    describe("getting and setting", function() {

      beforeEach(function() {
        user = new User({ full_name: 'Jamie Dyer', title: 'Mr', age: 32 });
      }); // end before

      it("should define getters", function() {
        expect(user.get_full_name() ).toEqual('Jamie Dyer');
        expect(user.get_title()     ).toEqual('Mr');
        expect(user.get_age()       ).toEqual(32);
      }); // end it

      it("should define setters", function() {
        user.set_full_name('Rachel Billing');
        user.set_title('Mrs');
        user.set_age(19);

        expect(user.get_full_name() ).toEqual('Rachel Billing');
        expect(user.get_title()     ).toEqual('Mrs');
        expect(user.get_age()       ).toEqual(19);
      }); // end it

      it("should define getters and setter when no data passed to the constructor", function() {
        var invalid_user = new User();

        expect(invalid_user.get_full_name() ).toBeUndefined();
        expect(invalid_user.get_title()     ).toBeUndefined();
        expect(invalid_user.get_age()       ).toBeUndefined();
      }); // end it

    }); // end describe
    
    describe("custom", function() {
      
      beforeEach(function() {
        user = new User({ full_name: 'Jamie Dyer', title: 'Mr', age: 32 });
      }); // end before
      
      it("should define getters", function() {
        expect(user.get_first_name()).toEqual('Jamie');
        expect(user.get_last_name() ).toEqual('Dyer');
      }); // end it
      
      it("should define setters", function() {
        user.set_first_name('Rachel');
        expect(user.get_full_name()).toEqual('Rachel Dyer');
        
        user.set_last_name('Billing');
        expect(user.get_full_name()).toEqual('Rachel Billing');
      }); // end it
      
    }); // end describe

  }); // end describe
  
  describe("defining multiple models", function() {
    
    var Book;
    var book;
    var Car;
    var car;
    
    beforeEach(function() {
      User = Model('user', {
        attributes: ['full_name', 'title', 'age'],
        validates_presence_of: ['full_name', 'title', 'age']
      });
      
      Book = Model('book', {
        attributes: ['title', 'author'],
        validates_presence_of: ['title', 'author']
      });
      
      Car = Model('car', {
        attributes: ['make'],
        validates_presence_of: 'make'
      });
    }); // end before
    
    afterEach(function() {
      User.reset();
      user = undefined;
      user = undefined;
      
      Book.reset();
      Book = undefined;
      book = undefined;
      
      Car.reset();
      Car = undefined;
      car = undefined;
    }); // end after
    
    it("should have the correct errors for each model", function() {
      
      user = new User();
      book = new Book();
      car  = new Car();
      
      expect(user.valid()).toBeFalsy();
      expect(book.valid()).toBeFalsy();
      expect(car.valid() ).toBeFalsy();
      
      expect(user.errors.length).toEqual(3);
      expect(book.errors.length).toEqual(2);
      expect(car.errors.length ).toEqual(1);
      
      expect(user.errors[0].full_name).toEqual('is required');
      expect(user.errors[1].title    ).toEqual('is required');
      expect(user.errors[2].age      ).toEqual('is required');
      
      expect(book.errors[0].title    ).toEqual('is required');
      expect(book.errors[1].author   ).toEqual('is required');
      
      expect(car.errors[0].make      ).toEqual('is required');
      
    }); // end it
    
  }); // end describe
  
  describe("storeage option", function() {
    
    describe("in memory storage", function() {
      
      beforeEach(function() {
        User = Model('user', { storage: Model.Storage.Default });
        new Mock(Model.Storage.Default);
      }); // end before
      
      it("should not call write_to_store when creating a model", function() {
        Model.Storage.Default.expects('setItem').once();
        user = new User({ full_name: 'Jamie Dyer', title: 'Mr', age: 32 });
        // verify the expectations manually here because the User.reset() in the
        // after block causes the stogare engine to be run twice
        expect(Model.Storage.Default).verify_expectations();
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
}); // end describe