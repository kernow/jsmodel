/*global Model: false */

describe("dirty", function() {
  
  var User, user;
  
  afterEach(function() {
    User.reset();
    User = undefined;
    user = undefined;
  }); // end after
  
  describe("simple models", function() {
    
    beforeEach(function() {
      User = Model('user', {
        attributes:  ['name', 'age', 'weight']
      });
      user = new User({ name: 'Jamie', age: 12, weight: 'nothing' });
    }); // end before
    
    it("should keep track of changed attributes", function() {
      expect(user.changed()).toBeFalsy();
      user.set_name('Jamie');
      expect(user.changed()).toBeFalsy();
      user.set_name('Barry');
      expect(user.changed()).toBeTruthy();
    }); // end it

    it("should reset the changed attributes when saved", function() {
      expect(user.changed()).toBeFalsy();
      user.set_name('Barry');
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  describe("models with belongs_to associations", function() {
    
    var Room, room;
    
    beforeEach(function() {
      User = Model('user', {
        attributes:  ['name', 'age', 'weight'],
        belongs_to: 'room'
      });
      
      Room = Model('room', {
        attributes:  ['name', 'number'],
        has_many: 'users'
      });
      
      user = new User({ name: 'Jamie', age: 33, weight: 'nothing' });
      room = new Room({ name: 'Penthouse', number: 12 });
    }); // end before
    
    afterEach(function() {
      Room.reset();
      Room = undefined;
      room = undefined;
    }); // end after
    
    it("keep track of association changes", function() {
      expect(user.changed()).toBeFalsy();
      user.set_room(room);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association id changes", function() {
      expect(user.changed()).toBeFalsy();
      user.set_room_id(room.id());
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  describe("models with HABTM associations", function() {
    
    var Room, room;
    
    beforeEach(function() {
      User = Model('user', {
        attributes:  ['name', 'age', 'weight'],
        has_and_belongs_to_many: 'rooms'
      });
      
      Room = Model('room', {
        attributes:  ['name', 'number'],
        has_and_belongs_to_many: 'users'
      });
      
      user = new User({ name: 'Jamie', age: 33, weight: 'nothing' });
      room = new Room({ name: 'Penthouse', number: 12 });
    }); // end before
    
    afterEach(function() {
      Room.reset();
      Room = undefined;
      room = undefined;
    }); // end after
    
    it("keep track of association changes using set_rooms()", function() {
      expect(user.changed()).toBeFalsy();
      user.set_rooms([room]);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association changes using set_rooms_ids()", function() {
      expect(user.changed()).toBeFalsy();
      user.set_rooms_ids([room.id()]);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association changes using add_rooms()", function() {
      expect(user.changed()).toBeFalsy();
      user.add_rooms([room]);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association id changes using add_rooms_id()", function() {
      expect(user.changed()).toBeFalsy();
      user.add_rooms_id(room.id());
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association id changes using remove_rooms()", function() {
      user.set_rooms([room]);
      user.save();
      expect(user.changed()).toBeFalsy();
      user.remove_rooms([room]);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
    it("keep track of association id changes using remove_rooms_ids()", function() {
      user.set_rooms([room]);
      user.save();
      expect(user.changed()).toBeFalsy();
      user.remove_rooms_ids([room.id()]);
      expect(user.changed()).toBeTruthy();
      user.save();
      expect(user.changed()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
}); // end describe
