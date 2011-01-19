describe("associations", function() {
  
  describe("belongs_to", function() {
    
    var User, Room, user1, user2, user3, room1, room2;

    beforeEach(function() {
      User = Model('user', {
        belongs_to: ['room']
      });
      Room = Model('room', {
        has_many: ['users']
      });
      
      user1 = new User({ full_name: 'Jamie Dyer' });
      user2 = new User({ full_name: 'Frank Spencer' });
      user3 = new User({ full_name: 'Eddie Vedder' });
      
      room1 = new Room({ name: 'Pearl Jam concert' });
      room2 = new Room({ name: 'DIY Enthusiasts' });
    });

    afterEach(function() {
      User.reset();
      Room.reset();
      User = undefined;
      Room = undefined;
    }); // end after
    
    it("should return undefined for the for the room a user belongs to", function() {
      expect(user1.get_room()).toBeUndefined();
      expect(user2.get_room()).toBeUndefined();
      expect(user3.get_room()).toBeUndefined();
    }); // end it
    
    it("should return the room a user belongs to", function() {
      user1.set_room(room1);
      user3.set_room(room1);
      expect(user1.get_room().get_name()).toEqual('Pearl Jam concert');
      expect(user3.get_room().get_name()).toEqual('Pearl Jam concert');
      expect(user2.get_room()).toBeUndefined();
      user2.set_room(room2);
      expect(user2.get_room().get_name()).toEqual('DIY Enthusiasts');
    }); // end it
    
    it("should be able to change the room a user belongs to", function() {
      user1.set_room(room1);
      expect(user1.get_room().get_name()).toEqual('Pearl Jam concert');
      user1.set_room(room2);
      expect(user1.get_room().get_name()).toEqual('DIY Enthusiasts');
    }); // end it
    
    describe("at creation", function() {
      
      var sandy;
      
      beforeEach(function() {
        sandy = new User({ name: 'Sandy', room: room1 });
      }); // end before
      
      it("should be able to set the room when creating a user", function() {
        expect(sandy.get_room().get_name()).toEqual('Pearl Jam concert');
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
}); // end describe
