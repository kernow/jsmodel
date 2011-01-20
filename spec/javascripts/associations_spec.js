describe("associations", function() {
  
  var User, Room, jamie, frank, eddie, pjc_room, diy_room;
  
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
      
      jamie = new User({ name: 'Jamie Dyer' });
      frank = new User({ name: 'Frank Spencer' });
      eddie = new User({ name: 'Eddie Vedder' });
      
      pjc_room = new Room({ name: 'Pearl Jam concert' });
      diy_room = new Room({ name: 'DIY Enthusiasts' });
    });
    
    it("should return undefined for the for the room a user belongs to", function() {
      expect(jamie.get_room()).toBeUndefined();
      expect(frank.get_room()).toBeUndefined();
      expect(eddie.get_room()).toBeUndefined();
    }); // end it
    
    it("should return the room a user belongs to", function() {
      jamie.set_room(pjc_room);
      eddie.set_room(pjc_room);
      expect(jamie.get_room().get_name()).toEqual('Pearl Jam concert');
      expect(eddie.get_room().get_name()).toEqual('Pearl Jam concert');
      expect(frank.get_room()).toBeUndefined();
      frank.set_room(diy_room);
      expect(frank.get_room().get_name()).toEqual('DIY Enthusiasts');
    }); // end it
    
    it("should be able to change the room a user belongs to", function() {
      jamie.set_room(pjc_room);
      expect(jamie.get_room().get_name()).toEqual('Pearl Jam concert');
      jamie.set_room(diy_room);
      expect(jamie.get_room().get_name()).toEqual('DIY Enthusiasts');
    }); // end it
    
    describe("at creation", function() {
      
      var sandy;
      
      beforeEach(function() {
        sandy = new User({ name: 'Sandy', room: pjc_room });
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
      
      jamie = new User({ name: 'Jamie Dyer' });
      frank = new User({ name: 'Frank Spencer' });
      eddie = new User({ name: 'Eddie Vedder' });
      
      pjc_room = new Room({ name: 'Pearl Jam concert' });
      diy_room = new Room({ name: 'DIY Enthusiasts' });
    });
    
    it("should return an emptry array when no users are associated with the room", function() {
      expect(pjc_room.get_users()).toEqual([]);
      expect(diy_room.get_users()).toEqual([]);
    }); // end it
    
    it("should return a list of users associated with a room", function() {
      pjc_room.add_users([jamie, eddie]);
      diy_room.add_users([frank]);
      
      expect(pjc_room.get_users().length).toEqual(2);
      expect(diy_room.get_users().length).toEqual(1);
      
      expect(pjc_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(pjc_room.get_users()[1].get_name()).toEqual('Eddie Vedder');
      expect(diy_room.get_users()[0].get_name()).toEqual('Frank Spencer');
    }); // end it
    
    it("should be able to change the user associated with a room", function() {
      pjc_room.add_users([jamie, eddie]);
      diy_room.add_users([frank]);
      expect(pjc_room.get_users().length).toEqual(2);
      expect(diy_room.get_users().length).toEqual(1);
      
      pjc_room.add_users([jamie, frank, eddie]);
      expect(pjc_room.get_users().length).toEqual(3);
      expect(diy_room.get_users().length).toEqual(0);
      
      expect(pjc_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(pjc_room.get_users()[1].get_name()).toEqual('Frank Spencer');
      expect(pjc_room.get_users()[2].get_name()).toEqual('Eddie Vedder');
    }); // end it
    
    it("should be able to add a user association to a room", function() {
      pjc_room.add_users([jamie, eddie]);
      expect(pjc_room.get_users().length).toEqual(2);
      
      pjc_room.add_users([frank]);
      expect(pjc_room.get_users().length).toEqual(3);
    }); // end it
    
    it("should be able to remove a user association to a room", function() {
      pjc_room.add_users([jamie, frank, eddie]);
      expect(pjc_room.get_users().length).toEqual(3);
      
      pjc_room.remove_users([frank]);
      expect(pjc_room.get_users().length).toEqual(2);
      
      // try to remove a user that's not in the room
      pjc_room.remove_users([frank]);
      expect(pjc_room.get_users().length).toEqual(2);
      
      pjc_room.remove_users([jamie]);
      expect(pjc_room.get_users().length).toEqual(1);
      
      pjc_room.remove_users([eddie]);
      expect(pjc_room.get_users().length).toEqual(0);
      
      // try to remove a user that's not in the room
      pjc_room.remove_users([eddie]);
      expect(pjc_room.get_users().length).toEqual(0);
    }); // end it
    
    it("should be able to replace users associated with a room", function() {
      pjc_room.set_users([jamie, frank, eddie]);
      expect(pjc_room.get_users().length).toEqual(3);
      
      pjc_room.set_users([]);
      expect(pjc_room.get_users().length).toEqual(0);
    }); // end it
    
    describe("at creation", function() {
      
      var awesome_room;
      
      beforeEach(function() {
        awesome_room = new Room({ name: 'Awesome Room', users: [jamie, eddie] });
      }); // end before
      
      it("should be able to set the room when creating a user", function() {
        expect(awesome_room.get_users().length).toEqual(2);
        expect(awesome_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
        expect(awesome_room.get_users()[1].get_name()).toEqual('Eddie Vedder');
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
  describe("has_many and belongs_to", function() {
    
    var Keycard, pjc_key1, pjc_key2, diy_key1, diy_key2;
    
    beforeEach(function() {
      User = Model('user', {
        belongs_to: ['room'],
        has_many:   ['keycards']
      });
      Room = Model('room', {
        has_many: ['users', 'keycards']
      });
      Keycard = Model('keycard', {
        belongs_to: ['user', 'room']
      });
      
      jamie    = new User({ name: 'Jamie Dyer' });
      frank    = new User({ name: 'Frank Spencer' });
      eddie    = new User({ name: 'Eddie Vedder' });
      
      pjc_room = new Room({ name: 'Pearl Jam concert',  users: [jamie, eddie] });
      diy_room = new Room({ name: 'DIY Enthusiasts',    users: [frank] });
      
      pjc_key1 = new Keycard({ code: '1234', user: jamie, room: pjc_room });
      pjc_key2 = new Keycard({ code: '5678', user: eddie, room: pjc_room });
      pjc_key3 = new Keycard({ code: '5678',              room: pjc_room });
      diy_key1 = new Keycard({ code: '4321', user: frank, room: diy_room });
      diy_key2 = new Keycard({ code: '8765',              room: diy_room });
    });
    
    afterEach(function() {
      Keycard.reset();
      Keycard = undefined;
    }); // end after
    
    it("should support complex associations", function() {
      expect(jamie.get_room().get_name()).toEqual('Pearl Jam concert');
      expect(jamie.get_room().get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(jamie.get_room().get_keycards()[0].get_code()).toEqual('1234');
      expect(jamie.get_room().get_keycards().length).toEqual(3);
      expect(diy_room.get_keycards().length).toEqual(2);
      expect(diy_room.get_keycards()[0].get_user().get_name()).toEqual('Frank Spencer');
      expect(pjc_key2.get_user().get_name()).toEqual('Eddie Vedder');
      expect(pjc_key2.get_user().get_room().get_name()).toEqual('Pearl Jam concert');
    }); // end it
    
  }); // end describe
  
}); // end describe
