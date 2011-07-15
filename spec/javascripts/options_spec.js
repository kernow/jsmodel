/*global Model: false */

describe("options", function() {
  
  describe("passing a string", function() {
    
    it("should return an object", function() {
      expect(Model.Options.parse( 'room' )).toEqual( { room: {} } );
    }); // end it
    
  }); // end describe
  
  describe("passing an array", function() {
    
    it("should return an object", function() {
      expect(Model.Options.parse( ['room', 'user'] )).toEqual( { room: {}, user: {} } );
    }); // end it
    
  }); // end describe
  
  describe("passing an object", function() {
    
    it("should return the same object", function() {
      var obj = { room: {}, user: { somthing_cool: "it's not really"} };
      expect(Model.Options.parse( obj )).toEqual( obj );
    }); // end it
    
  }); // end describe
  
}); // end describe
