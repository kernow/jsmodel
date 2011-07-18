/*global Model: false */

describe("associations", function() {
  
  var User, Room, jamie, frank, eddie, pjc_room, diy_room;
  
  afterEach(function() {
    User.reset();
    Room.reset();
    User = undefined;
    Room = undefined;
  }); // end after
  
  describe("belongs_to", function() {
    
    describe("vanilla", function() {
      
      beforeEach(function() {
        User = Model('user', {
          belongs_to: { room: {}}
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
    
    describe("options", function() {
      
      describe("class_name", function() {
        
        beforeEach(function() {
          User = Model('user', {
            belongs_to: { cool_room: { class_name: 'room' }}
          });
          Room = Model('room');

          jamie = new User({ name: 'Jamie Dyer' });
          frank = new User({ name: 'Frank Spencer' });
          eddie = new User({ name: 'Eddie Vedder' });

          pjc_room = new Room({ name: 'Pearl Jam concert' });
          diy_room = new Room({ name: 'DIY Enthusiasts' });
        });

        it("should return undefined for the for the cool_room a user belongs to", function() {
          expect(jamie.get_cool_room()).toBeUndefined();
          expect(frank.get_cool_room()).toBeUndefined();
          expect(eddie.get_cool_room()).toBeUndefined();
        }); // end it

        it("should return the cool_room a user belongs to", function() {
          jamie.set_cool_room(pjc_room);
          eddie.set_cool_room(pjc_room);
          expect(jamie.get_cool_room().get_name()).toEqual('Pearl Jam concert');
          expect(eddie.get_cool_room().get_name()).toEqual('Pearl Jam concert');
          expect(frank.get_cool_room()).toBeUndefined();
          frank.set_cool_room(diy_room);
          expect(frank.get_cool_room().get_name()).toEqual('DIY Enthusiasts');
        }); // end it

        it("should be able to change the cool_room a user belongs to", function() {
          jamie.set_cool_room(pjc_room);
          expect(jamie.get_cool_room().get_name()).toEqual('Pearl Jam concert');
          jamie.set_cool_room(diy_room);
          expect(jamie.get_cool_room().get_name()).toEqual('DIY Enthusiasts');
        }); // end it

        describe("at creation", function() {

          var sandy;

          beforeEach(function() {
            sandy = new User({ name: 'Sandy', cool_room: pjc_room });
          }); // end before

          it("should be able to set the cool_room when creating a user", function() {
            expect(sandy.get_cool_room().get_name()).toEqual('Pearl Jam concert');
          }); // end it

        }); // end describe
        
      }); // end describe
      
      describe("foreign_key", function() {
        
        beforeEach(function() {
          User = Model('user', {
            belongs_to: { room: { foreigen_key: 'cool_room_id' }}
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
      
    }); // end describe
    
  }); // end describe
  
  describe("has_one", function() {
    
    describe("vanilla", function() {
      
      beforeEach(function() {
        User = Model('user', {
          attributes: ['room_id']
        });
        Room = Model('room', {
          has_one: { user: {}}
        });

        jamie = new User({ name: 'Jamie Dyer' });
        frank = new User({ name: 'Frank Spencer' });
        eddie = new User({ name: 'Eddie Vedder' });

        pjc_room = new Room({ name: 'Pearl Jam concert' });
        diy_room = new Room({ name: 'DIY Enthusiasts' });
      });

      it("should return undefined when no user is associated with the room", function() {
        expect(pjc_room.get_user()).toBeUndefined();
        expect(diy_room.get_user()).toBeUndefined();
      }); // end it

      it("should return the user associated with a room", function() {
        pjc_room.set_user(jamie);
        diy_room.set_user(frank);

        expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');
        expect(diy_room.get_user().get_name()).toEqual('Frank Spencer');
      }); // end it

      it("should be able to change the user associated with a room", function() {
        pjc_room.set_user(jamie);
        expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');

        pjc_room.set_user(eddie);
        expect(pjc_room.get_user().get_name()).toEqual('Eddie Vedder');
      }); // end it

      it("should be able to remove a user association to a room", function() {
        pjc_room.set_user(jamie);
        expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');

        pjc_room.set_user(undefined);
        expect(pjc_room.get_user()).toBeUndefined();
      }); // end it

      describe("at creation", function() {

        var awesome_room;

        beforeEach(function() {
          awesome_room = new Room({ name: 'Awesome Room', user: jamie });
        }); // end before

        it("should be able to set the room when creating a user", function() {
          expect(awesome_room.get_user().get_name()).toEqual('Jamie Dyer');
        }); // end it

      }); // end describe
      
    }); // end describe
    
    describe("options", function() {
      
      describe("class_name", function() {
        
        beforeEach(function() {
          User = Model('user', {
            attributes: ['room_id']
          });
          Room = Model('room', {
            has_one: { member: { class_name: 'user' }}
          });

          jamie = new User({ name: 'Jamie Dyer' });
          frank = new User({ name: 'Frank Spencer' });
          eddie = new User({ name: 'Eddie Vedder' });

          pjc_room = new Room({ name: 'Pearl Jam concert' });
          diy_room = new Room({ name: 'DIY Enthusiasts' });
        });

        it("should return undefined when no member is associated with the room", function() {
          expect(pjc_room.get_member()).toBeUndefined();
          expect(diy_room.get_member()).toBeUndefined();
        }); // end it

        it("should return the member associated with a room", function() {
          pjc_room.set_member(jamie);
          diy_room.set_member(frank);

          expect(pjc_room.get_member().get_name()).toEqual('Jamie Dyer');
          expect(diy_room.get_member().get_name()).toEqual('Frank Spencer');
        }); // end it

        it("should be able to change the member associated with a room", function() {
          pjc_room.set_member(jamie);
          expect(pjc_room.get_member().get_name()).toEqual('Jamie Dyer');

          pjc_room.set_member(eddie);
          expect(pjc_room.get_member().get_name()).toEqual('Eddie Vedder');
        }); // end it

        it("should be able to remove a member association to a room", function() {
          pjc_room.set_member(jamie);
          expect(pjc_room.get_member().get_name()).toEqual('Jamie Dyer');

          pjc_room.set_member(undefined);
          expect(pjc_room.get_member()).toBeUndefined();
        }); // end it

        describe("at creation", function() {

          var awesome_room;

          beforeEach(function() {
            awesome_room = new Room({ name: 'Awesome Room', member: jamie });
          }); // end before

          it("should be able to set the room when creating a member", function() {
            expect(awesome_room.get_member().get_name()).toEqual('Jamie Dyer');
          }); // end it

        }); // end describe
        
      }); // end describe
      
      describe("foreign_key", function() {
        
        beforeEach(function() {
          User = Model('user', {
            attributes: ['cool_room_id']
          });
          Room = Model('room', {
            has_one: { user: { foreign_key: 'cool_room_id' }}
          });

          jamie = new User({ name: 'Jamie Dyer' });
          frank = new User({ name: 'Frank Spencer' });
          eddie = new User({ name: 'Eddie Vedder' });

          pjc_room = new Room({ name: 'Pearl Jam concert' });
          diy_room = new Room({ name: 'DIY Enthusiasts' });
        });

        it("should return undefined when no user is associated with the room", function() {
          expect(pjc_room.get_user()).toBeUndefined();
          expect(diy_room.get_user()).toBeUndefined();
        }); // end it

        it("should return the user associated with a room", function() {
          pjc_room.set_user(jamie);
          diy_room.set_user(frank);

          expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');
          expect(diy_room.get_user().get_name()).toEqual('Frank Spencer');
        }); // end it

        it("should be able to change the user associated with a room", function() {
          pjc_room.set_user(jamie);
          expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');

          pjc_room.set_user(eddie);
          expect(pjc_room.get_user().get_name()).toEqual('Eddie Vedder');
        }); // end it

        it("should be able to remove a user association to a room", function() {
          pjc_room.set_user(jamie);
          expect(pjc_room.get_user().get_name()).toEqual('Jamie Dyer');

          pjc_room.set_user(undefined);
          expect(pjc_room.get_user()).toBeUndefined();
        }); // end it

        describe("at creation", function() {

          var awesome_room;

          beforeEach(function() {
            awesome_room = new Room({ name: 'Awesome Room', user: jamie });
          }); // end before

          it("should be able to set the room when creating a user", function() {
            expect(awesome_room.get_user().get_name()).toEqual('Jamie Dyer');
          }); // end it

        }); // end describe
        
      }); // end describe
      
    }); // end describe
    
  }); // end describe
  
  describe("has_many", function() {
    
    describe("vanilla", function() {
      
      beforeEach(function() {
        User = Model('user', {
          attributes: ['room_id']
        });
        Room = Model('room', {
          has_many: { users: {}}
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
    
    describe("options", function() {

      describe("class_name", function() {

        beforeEach(function() {
          User = Model('user', {
            attributes: ['room_id']
          });
          Room = Model('room', {
            has_many: { members: { class_name: 'user' }}
          });

          jamie = new User({ name: 'Jamie Dyer' });
          frank = new User({ name: 'Frank Spencer' });
          eddie = new User({ name: 'Eddie Vedder' });

          pjc_room = new Room({ name: 'Pearl Jam concert' });
          diy_room = new Room({ name: 'DIY Enthusiasts' });
        });

        it("should return an emptry array when no members are associated with the room", function() {
          expect(pjc_room.get_members()).toEqual([]);
          expect(diy_room.get_members()).toEqual([]);
        }); // end it

        it("should return a list of members associated with a room", function() {
          pjc_room.add_members([jamie, eddie]);
          diy_room.add_members([frank]);

          expect(pjc_room.get_members().length).toEqual(2);
          expect(diy_room.get_members().length).toEqual(1);

          expect(pjc_room.get_members()[0].get_name()).toEqual('Jamie Dyer');
          expect(pjc_room.get_members()[1].get_name()).toEqual('Eddie Vedder');
          expect(diy_room.get_members()[0].get_name()).toEqual('Frank Spencer');
        }); // end it

        it("should be able to change the user associated with a room", function() {
          pjc_room.add_members([jamie, eddie]);
          diy_room.add_members([frank]);
          expect(pjc_room.get_members().length).toEqual(2);
          expect(diy_room.get_members().length).toEqual(1);

          pjc_room.add_members([jamie, frank, eddie]);
          expect(pjc_room.get_members().length).toEqual(3);
          expect(diy_room.get_members().length).toEqual(0);

          expect(pjc_room.get_members()[0].get_name()).toEqual('Jamie Dyer');
          expect(pjc_room.get_members()[1].get_name()).toEqual('Frank Spencer');
          expect(pjc_room.get_members()[2].get_name()).toEqual('Eddie Vedder');
        }); // end it

        it("should be able to add a user association to a room", function() {
          pjc_room.add_members([jamie, eddie]);
          expect(pjc_room.get_members().length).toEqual(2);

          pjc_room.add_members([frank]);
          expect(pjc_room.get_members().length).toEqual(3);
        }); // end it

        it("should be able to remove a user association to a room", function() {
          pjc_room.add_members([jamie, frank, eddie]);
          expect(pjc_room.get_members().length).toEqual(3);

          pjc_room.remove_members([frank]);
          expect(pjc_room.get_members().length).toEqual(2);

          // try to remove a user that's not in the room
          pjc_room.remove_members([frank]);
          expect(pjc_room.get_members().length).toEqual(2);

          pjc_room.remove_members([jamie]);
          expect(pjc_room.get_members().length).toEqual(1);

          pjc_room.remove_members([eddie]);
          expect(pjc_room.get_members().length).toEqual(0);

          // try to remove a user that's not in the room
          pjc_room.remove_members([eddie]);
          expect(pjc_room.get_members().length).toEqual(0);
        }); // end it

        it("should be able to replace members associated with a room", function() {
          pjc_room.set_members([jamie, frank, eddie]);
          expect(pjc_room.get_members().length).toEqual(3);

          pjc_room.set_members([]);
          expect(pjc_room.get_members().length).toEqual(0);
        }); // end it

        describe("at creation", function() {

          var awesome_room;

          beforeEach(function() {
            awesome_room = new Room({ name: 'Awesome Room', members: [jamie, eddie] });
          }); // end before

          it("should be able to set the room when creating a user", function() {
            expect(awesome_room.get_members().length).toEqual(2);
            expect(awesome_room.get_members()[0].get_name()).toEqual('Jamie Dyer');
            expect(awesome_room.get_members()[1].get_name()).toEqual('Eddie Vedder');
          }); // end it

        }); // end describe

      }); // end describe
      
      describe("foreign_key", function() {
        
        beforeEach(function() {
          User = Model('user', {
            attributes: ['cool_room_id']
          });
          Room = Model('room', {
            has_many: { users: { foreign_key: 'cool_room_id' }}
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
      
    }); // end describe
    
  }); // end describe
  
  describe("has_many and belongs_to", function() {
    
    var Keycard, pjc_key1, pjc_key2, pjc_key3, diy_key1, diy_key2;
    
    beforeEach(function() {
      User = Model('user', {
        belongs_to: { room: {}},
        has_many:   { keycards: {}}
      });
      Room = Model('room', {
        has_many: { users: {}, keycards: {}}
      });
      Keycard = Model('keycard', {
        belongs_to: { user: {}, room: {}}
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
  
  describe("has_and_belongs_to_many", function() {
    
    beforeEach(function() {
      User = Model('user', {
        has_and_belongs_to_many: { rooms: {}}
      });
      Room = Model('room', {
        has_and_belongs_to_many: { users: {}}
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
    
    it("should return an emptry array when no rooms are associated with the user", function() {
      expect(jamie.get_rooms()).toEqual([]);
      expect(frank.get_rooms()).toEqual([]);
      expect(eddie.get_rooms()).toEqual([]);
    }); // end it
    
    it("should be able to add users to a room", function() {
      pjc_room.add_users([jamie, eddie]);
      diy_room.add_users([frank]);
      
      expect(pjc_room.get_users().length).toEqual(2);
      expect(diy_room.get_users().length).toEqual(1);
      
      expect(pjc_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(pjc_room.get_users()[1].get_name()).toEqual('Eddie Vedder');
      expect(diy_room.get_users()[0].get_name()).toEqual('Frank Spencer');
    }); // end it
    
    it("should be able to add rooms to a user", function() {
      jamie.add_rooms([pjc_room, diy_room]);
      frank.add_rooms([diy_room]);
      eddie.add_rooms([pjc_room]);
      
      expect(pjc_room.get_users().length).toEqual(2);
      expect(diy_room.get_users().length).toEqual(2);
      
      expect(pjc_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(pjc_room.get_users()[1].get_name()).toEqual('Eddie Vedder');
      expect(diy_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(diy_room.get_users()[1].get_name()).toEqual('Frank Spencer');
    }); // end it
    
    it("should be able to change the user associated with a room", function() {
      pjc_room.add_users([jamie, eddie]);
      diy_room.add_users([frank]);
      expect(pjc_room.get_users().length).toEqual(2);
      expect(diy_room.get_users().length).toEqual(1);
      
      pjc_room.add_users([jamie, frank, eddie]);
      expect(pjc_room.get_users().length).toEqual(3);
      expect(diy_room.get_users().length).toEqual(1);
      
      expect(pjc_room.get_users()[0].get_name()).toEqual('Jamie Dyer');
      expect(pjc_room.get_users()[1].get_name()).toEqual('Eddie Vedder');
      expect(pjc_room.get_users()[2].get_name()).toEqual('Frank Spencer');
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
      expect(jamie.get_rooms().length   ).toEqual(1);
      
      pjc_room.set_users([]);
      expect(pjc_room.get_users().length).toEqual(0);
      expect(jamie.get_rooms().length   ).toEqual(0);
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
  
  describe("destroying records with associations", function() {
    
    describe("belongs_to", function() {
      
      beforeEach(function() {
        User = Model('user', {
          belongs_to: { room: {}}
        });
        Room = Model('room', {
          has_many: { users: {}}
        });

        jamie = new User({ name: 'Jamie Dyer' });
        frank = new User({ name: 'Frank Spencer' });
        eddie = new User({ name: 'Eddie Vedder' });

        pjc_room = new Room({ name: 'Pearl Jam concert', users: [jamie, eddie] });
        diy_room = new Room({ name: 'DIY Enthusiasts',   users: [frank] });
      });

      it("should remove the associated id", function() {
        expect(pjc_room.get_users().length).toEqual(2);
        expect(diy_room.get_users().length).toEqual(1);
        diy_room.remove();
        expect(frank.get_room()).toBeUndefined();
        expect(frank.attrs.room_id).toBeUndefined();
      }); // end it
      
    }); // end describe
    
    describe("has_and_belongs_to_many", function() {
      
      beforeEach(function() {
        User = Model('user', {
          has_and_belongs_to_many: { rooms: {}}
        });
        Room = Model('room', {
          has_and_belongs_to_many: { users: {}}
        });

        jamie = new User({ name: 'Jamie Dyer' });
        frank = new User({ name: 'Frank Spencer' });
        eddie = new User({ name: 'Eddie Vedder' });

        pjc_room = new Room({ name: 'Pearl Jam concert', users: [jamie, eddie] });
        diy_room = new Room({ name: 'DIY Enthusiasts',   users: [frank, jamie] });
      });

      it("should remove the associated id", function() {
        expect(pjc_room.get_users().length).toEqual(2);
        expect(diy_room.get_users().length).toEqual(2);
        expect(frank.get_rooms().length).toEqual(1);
        expect(jamie.get_rooms().length).toEqual(2);
        expect(eddie.get_rooms().length).toEqual(1);
        
        diy_room.remove();
        
        expect(pjc_room.attrs.users_ids.length).toEqual(2);
        expect(frank.attrs.rooms_ids.length).toEqual(0);
        expect(jamie.attrs.rooms_ids.length).toEqual(1);
        expect(eddie.attrs.rooms_ids.length).toEqual(1);
        
        jamie.remove();
        
        expect(pjc_room.attrs.users_ids.length).toEqual(1);
        expect(eddie.attrs.rooms_ids.length).toEqual(1);
        expect(frank.attrs.rooms_ids.length).toEqual(0);
        
        pjc_room.remove();
        
        expect(eddie.attrs.rooms_ids.length).toEqual(0);
        expect(frank.attrs.rooms_ids.length).toEqual(0);
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
  describe("saving records with associations", function() {
    
    describe("has_many", function() {
      
      beforeEach(function() {
        User = Model('user', {
          belongs_to: { room: {}}
        });
        Room = Model('room', {
          has_many: { users: {}}
        });

        jamie = new User({ name: 'Jamie Dyer' });
        frank = new User({ name: 'Frank Spencer' });
        eddie = new User({ name: 'Eddie Vedder' });

        pjc_room = new Room({ name: 'Pearl Jam concert' });
        diy_room = new Room({ name: 'DIY Enthusiasts' });
        
        new Mock(frank);
        new Mock(jamie);
        new Mock(eddie);
      });

      it("should save the associated record", function() {
        diy_room.set_users([frank]);
        frank.spies('save');
        jamie.spies('save').never();
        eddie.spies('save').never();
        diy_room.save();
      }); // end it
      
      it("should save the associated records", function() {
        pjc_room.set_users([jamie, eddie]);
        frank.spies('save').never();
        jamie.spies('save');
        eddie.spies('save');
        pjc_room.save();
      }); // end it
      
    }); // end describe
    
    describe("has_and_belongs_to_many", function() {
      
      beforeEach(function() {
        User = Model('user', {
          has_and_belongs_to_many: { rooms: {}}
        });
        Room = Model('room', {
          has_and_belongs_to_many: { users: {}}
        });

        jamie = new User({ name: 'Jamie Dyer' });
        frank = new User({ name: 'Frank Spencer' });
        eddie = new User({ name: 'Eddie Vedder' });

        pjc_room = new Room({ name: 'Pearl Jam concert' });
        diy_room = new Room({ name: 'DIY Enthusiasts' });
        
        new Mock(frank);
        new Mock(jamie);
        new Mock(eddie);
        
        new Mock(pjc_room);
        new Mock(diy_room);
      });

      it("should save the associated record", function() {
        diy_room.set_users([frank]);
        frank.spies('save');
        jamie.spies('save').never();
        eddie.spies('save').never();
        diy_room.save();
      }); // end it
      
      it("should save the associated records", function() {
        pjc_room.set_users([jamie, eddie]);
        frank.spies('save').never();
        jamie.spies('save');
        eddie.spies('save');
        pjc_room.save();
      }); // end it
      
      it("figure it out", function() {
        pjc_room.set_users([jamie, eddie]);
        pjc_room.save();
        
        jamie.spies('save');
        eddie.spies('save').never();
        frank.spies('save').never();
        
        pjc_room.remove_users([jamie]);
        pjc_room.save();
      }); // end it
      
      xit("should not save associated records when the association ids haven't changed", function() {
        pjc_room.set_users([jamie, eddie]);
        pjc_room.save();
        
        frank.spies('save').never();
        jamie.spies('save');
        eddie.spies('save').never();
        
        eddie.set_name('Eddie Vedder the Second');
        pjc_room.remove_users([jamie]);
        pjc_room.save();
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
}); // end describe
