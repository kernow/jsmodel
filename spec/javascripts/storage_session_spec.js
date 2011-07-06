/*global Model: false */

describe("Model.Storage.Session", function() {

  if(Model.Storage.Session.supported()){

    var jsonObject = ["test value", { nested: "test value 2" }];

    beforeEach(function() {
      Model.Storage.Session.clear();
    });
    
    describe("supported", function() {
    
      it("should return true when supported", function() {
        expect(Model.Storage.Session.supported()).toBeTruthy();
      }); // end it
    }); // end describe

    describe("getItem", function() {
    
      describe("when the key exists", function() {
      
        beforeEach(function() {
          Model.Storage.Session.setItem("test key", "test value");
        });
      
        it("should return the same value", function() {
          expect(Model.Storage.Session.getItem("test key")).toEqual("test value");
        });
      });
    
      describe("when the key does not exist", function() {
      
        it("should return null", function() {
          expect(Model.Storage.Session.getItem("test key")).toEqual(null);
        });
      });
    
      describe("when the value is a date", function() {
      
        var date;

        beforeEach(function() {
          date = new Date();
          date.setMilliseconds(0);
          Model.Storage.Session.setItem("test key", date);
        });

        it("should be revived", function() {
          expect(Model.Storage.Session.getItem("test key")).toEqual(date);
        });
      });
    
    });

    describe("setItem", function() {
    
      describe("when the key does not already exist", function() {
      
        it("should add a new entry", function() {
          Model.Storage.Session.setItem("test key", "test value");
          expect(Model.Storage.Session.count()).toEqual(1);
          expect(Model.Storage.Session.getItem("test key")).toEqual("test value");
        });
      });
    
      describe("when the key does already exist", function() {
      
        it("should update the existing entry", function() {
          Model.Storage.Session.setItem("test key", "test value");
          Model.Storage.Session.setItem("test key", "test value 2");
          expect(Model.Storage.Session.count()).toEqual(1);
          expect(Model.Storage.Session.getItem("test key")).toEqual("test value 2");
        });
      });
    });

    describe("removeItem", function() {
    
      describe("when the key does not exist", function() {
      
        it("should do nothing", function() {
          Model.Storage.Session.setItem("test key", "test value");
          Model.Storage.Session.removeItem("test key 2");
          expect(Model.Storage.Session.count()).toEqual(1);
        });
      });
    
      describe("when the key does exist", function() {
      
        it("should remove the relevant entry", function() {
          Model.Storage.Session.setItem("test key", "test value");
          Model.Storage.Session.removeItem("test key");
          expect(Model.Storage.Session.count()).toEqual(0);
        });
      });
    });

    describe("contains", function() {
    
      describe("when the key does not exist", function() {
      
        it("should return false", function() {
          expect(Model.Storage.Session.contains("test key")).toEqual(false);
        });
      });
    
      describe("when the key does exist", function() {
      
        it("should return true", function() {
          Model.Storage.Session.setItem("test key", jsonObject);
          expect(Model.Storage.Session.contains("test key")).toEqual(true);
        });
      });
    
      describe("when the key does exist, with a null value", function() {
      
        it("should return true", function() {
          Model.Storage.Session.setItem("test key", null);
          expect(Model.Storage.Session.contains("test key")).toEqual(true);
        });
      });
    });

    describe("clear", function() {
    
      describe("when there are some entries", function() {
      
        it("should remove all entries", function() {
          Model.Storage.Session.setItem("test key", "test value");
          Model.Storage.Session.setItem("test key 2", "test value 2");
          Model.Storage.Session.clear();
          expect(Model.Storage.Session.count()).toEqual(0);
        });
      });
    
      describe("when there are no entries", function() {
      
        it("should do nothing", function() {
          Model.Storage.Session.clear();
          expect(Model.Storage.Session.count()).toEqual(0);
        });
      });
    });
    
  }else{
  
    describe("supported", function() {
  
      it("should return false when supported", function() {
        expect(Model.Storage.Session.supported()).toBeFalsey();
      }); // end it
    }); // end describe
  }
});
