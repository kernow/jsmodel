describe("associations", function() {
  
  var User, Room, user1, user2, user3, room1, room2;
  
  afterEach(function() {
    User.reset();
    Room.reset();
    User = undefined;
    Room = undefined;
  }); // end after
  
  describe("belongs_to", function() {

    beforeEach(function() {
      User = Model('user', {
        belongs_to: ['room']
      });
      Room = Model('room');
      
      user1 = new User({ name: 'Jamie Dyer' });
      user2 = new User({ name: 'Frank Spencer' });
      user3 = new User({ name: 'Eddie Vedder' });
      
      room1 = new Room({ name: 'Pearl Jam concert' });
      room2 = new Room({ name: 'DIY Enthusiasts' });
    });
    
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
  
  describe("has_many", function() {
    
    beforeEach(function() {
      User = Model('user', {
        default_attrs: ['room_id']
      });
      Room = Model('room', {
        has_many: ['users']
      });
      
      user1 = new User({ name: 'Jamie Dyer' });
      user2 = new User({ name: 'Frank Spencer' });
      user3 = new User({ name: 'Eddie Vedder' });
      
      room1 = new Room({ name: 'Pearl Jam concert' });
      room2 = new Room({ name: 'DIY Enthusiasts' });
    });
    
    it("should return an emptry array when no users are associated with the room", function() {
      expect(room1.get_users()).toEqual([]);
      expect(room2.get_users()).toEqual([]);
    }); // end it
    
    it("should return a list of users associated with a room", function() {
      room1.add_users([user1, user3]);
      room2.add_users([user2]);
      
      expect(room1.get_users().length).toEqual(2);
      expect(room2.get_users().length).toEqual(1);
      
      expect(room1.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(room1.get_users()[1].get_name()).toEqual('Eddie Vedder');
      expect(room2.get_users()[0].get_name()).toEqual('Frank Spencer');
    }); // end it
    
    it("should be able to change the user associated with a room", function() {
      room1.add_users([user1, user3]);
      room2.add_users([user2]);
      expect(room1.get_users().length).toEqual(2);
      expect(room2.get_users().length).toEqual(1);
      
      room1.add_users([user1, user2, user3]);
      expect(room1.get_users().length).toEqual(3);
      expect(room2.get_users().length).toEqual(0);
      
      expect(room1.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(room1.get_users()[1].get_name()).toEqual('Frank Spencer');
      expect(room1.get_users()[2].get_name()).toEqual('Eddie Vedder');
    }); // end it
    
    it("should be able to add a user association to a room", function() {
      room1.add_users([user1, user3]);
      expect(room1.get_users().length).toEqual(2);
      
      room1.add_users([user2]);
      expect(room1.get_users().length).toEqual(3);
    }); // end it
    
    it("should be able to remove a user association to a room", function() {
      room1.add_users([user1, user2, user3]);
      expect(room1.get_users().length).toEqual(3);
      
      room1.remove_users([user2]);
      expect(room1.get_users().length).toEqual(2);
      
      // try to remove a user that's not in the room
      room1.remove_users([user2]);
      expect(room1.get_users().length).toEqual(2);
      
      room1.remove_users([user1]);
      expect(room1.get_users().length).toEqual(1);
      
      room1.remove_users([user3]);
      expect(room1.get_users().length).toEqual(0);
      
      // try to remove a user that's not in the room
      room1.remove_users([user3]);
      expect(room1.get_users().length).toEqual(0);
    }); // end it
    
    it("should be able to replace users associated with a room", function() {
      room1.set_users([user1, user2, user3]);
      expect(room1.get_users().length).toEqual(3);
      
      room1.set_users([]);
      expect(room1.get_users().length).toEqual(0);
    }); // end it
    
  }); // end describe
  
}); // end describe
