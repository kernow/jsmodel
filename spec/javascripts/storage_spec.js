describe("Model.Storage", function() {

  var jsonObject = ["test value", { nested: "test value 2" }];

  beforeEach(function() {
    Model.Storage.clear();
  });

  describe("HTML5 localStorage standard API", function() {
    // Test criteria extracted from http://dev.w3.org/html5/webstorage/#storage

    describe("length", function() {
      describe("when there are no entries", function () {
        it("should return zero", function() {
          expect(Model.Storage.length()).toEqual(0);
        });
      });
      describe("when there is one entry", function () {
        beforeEach(function() {
          Model.Storage.setItem("test key", "test value");
        });
        it("should return one", function() {
          expect(Model.Storage.length()).toEqual(1);
        });
      });
      describe("when there are two entries", function () {
        beforeEach(function() {
          Model.Storage.setItem("test key", "test value");
          Model.Storage.setObject("test key 2", ["test value", "test value 2"]);
        });
        it("should return two", function() {
          expect(Model.Storage.length()).toEqual(2);
        });
      });
    });

    describe("key(index)", function() {
      beforeEach(function() {
        Model.Storage.setItem("key 0", "value 0");
      });
      describe("when the key exists", function () {
        it("should return the name of the key", function() {
          expect(Model.Storage.key(0)).toEqual("key 0");
        });
      });
      describe("when the key value changes", function () {
        beforeEach(function() {
          Model.Storage.setItem("key 0", "value 1");
        });
        it("should return the name of the key unchanged", function() {
          expect(Model.Storage.key(0)).toEqual("key 0");
        });
      });
      describe("when there are fewer keys", function () {
        it("should return null", function() {
          expect(Model.Storage.key(1)).toEqual(null);
        });
      });
    });

    // setItem/getItem expects string values
    describe("getItem(key)", function() {
      describe("when the key exists", function() {
        beforeEach(function() {
          Model.Storage.setItem("test key", "test value");
        });
        it("should return the same value", function() {
          expect(Model.Storage.getItem("test key")).toEqual("test value");
        });
      });
      describe("when the key does not exist", function() {
        it("should return null", function() {
          expect(Model.Storage.getItem("test key")).toEqual(null);
        });
      });
    });

    describe("setItem(key, value)", function() {
      describe("when the key does not already exist", function() {
        it("should add a new entry", function() {
          Model.Storage.setItem("test key", "test value");
          expect(Model.Storage.length()).toEqual(1);
          expect(Model.Storage.getItem("test key")).toEqual("test value");
        });
      });
      describe("when the key does already exist", function() {
        it("should update the existing entry", function() {
          Model.Storage.setItem("test key", "test value");
          Model.Storage.setItem("test key", "test value 2");
          expect(Model.Storage.length()).toEqual(1);
          expect(Model.Storage.getItem("test key")).toEqual("test value 2");
        });
      });
    });

    describe("removeItem(key)", function() {
      describe("when the key does not exist", function() {
        it("should do nothing", function() {
          Model.Storage.setItem("test key", "test value");
          Model.Storage.removeItem("test key 2");
          expect(Model.Storage.length()).toEqual(1);
        });
      });
      describe("when the key does exist", function() {
        it("should remove the relevant entry", function() {
          Model.Storage.setItem("test key", "test value");
          Model.Storage.removeItem("test key");
          expect(Model.Storage.length()).toEqual(0);
        });
      });
    });

    describe("clear", function() {
      describe("when there are some entries", function() {
        it("should remove all entries", function() {
          Model.Storage.setItem("test key", "test value");
          Model.Storage.setItem("test key 2", "test value 2");
          Model.Storage.clear();
          expect(Model.Storage.length()).toEqual(0);
        });
      });
      describe("when there are no entries", function() {
        it("should do nothing", function() {
          Model.Storage.clear();
          expect(Model.Storage.length()).toEqual(0);
        });
      });
    });
    
  });

  describe("HTML5 localStorage extended API", function() {

    // like getItem for JSON objects
    describe("getObject(key)", function() {
      describe("when the key exists", function() {
        beforeEach(function() {
          Model.Storage.setObject("test key", jsonObject);
        });
        it("should return the same value", function() {
          expect(Model.Storage.getObject("test key")).toEqual(jsonObject);
        });
      });
      describe("when the key does not exist", function() {
        it("should return null", function() {
          expect(Model.Storage.getObject("test key")).toEqual(null);
        });
      });
    });

    // like setItem for JSON objects
    describe("setObject(key, value)", function() {
      describe("when the key does not already exist", function() {
        it("should add a new entry", function() {
          Model.Storage.setObject("test key", jsonObject);
          expect(Model.Storage.length()).toEqual(1);
          expect(Model.Storage.getObject("test key")).toEqual(jsonObject);
        });
      });
      describe("when the key does already exist", function() {
        it("should update the existing entry", function() {
          Model.Storage.setObject("test key", "test value");
          Model.Storage.setObject("test key", jsonObject);
          expect(Model.Storage.length()).toEqual(1);
          expect(Model.Storage.getObject("test key")).toEqual(jsonObject);
        });
      });
    });

    // Checks for the existence of a key
    describe("contains(key)", function() {
      describe("when the key does not exist", function() {
        it("should return false", function() {
          expect(Model.Storage.contains("test key")).toEqual(false);
        });
      });
      describe("when the key does exist", function() {
        it("should return true", function() {
          Model.Storage.setObject("test key", jsonObject);
          expect(Model.Storage.contains("test key")).toEqual(true);
        });
      });
      describe("when the key does exist, with a null value", function() {
        it("should return true", function() {
          Model.Storage.setObject("test key", null);
          expect(Model.Storage.contains("test key")).toEqual(true);
        });
      });
    });
    
  });

});
