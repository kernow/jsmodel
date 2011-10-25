/*global Model: false */

describe("reflections", function() {
  
  describe("for has_one", function() {
    
    it("should be listed", function() {
      var model = Model('m', { has_one: 'thing' });
      expect(model.reflections()).toEqual([{has_one: 'thing'}]);
    });
    
  });
  
  describe("for has_many", function() {
    
    it("should be listed", function() {
      var model = Model('m', { has_many: 'things' });
      expect(model.reflections()).toEqual([{has_many: 'things'}]);
    });
    
  });
  
  describe("for belongs_to", function() {
    
    it("should be listed", function() {
      var model = Model('m', { belongs_to: 'thing' });
      expect(model.reflections()).toEqual([{belongs_to: 'thing'}]);
    });
    
  });
  
  describe("for has_and_belongs_to_many", function() {

    it("should be listed", function() {
      var model = Model('m', { has_and_belongs_to_many: 'things' });
      expect(model.reflections()).toEqual([{has_and_belongs_to_many: 'things'}]);
    });
    
  });
  
  describe("for a combination", function() {

    it("should be listed", function() {
      var model = Model('rainbow', { has_one: ['pot','leprechaun'], has_many: 'colours', belongs_to: 'sun', has_and_belongs_to_many: 'admirers' });
      expect(
        model.reflections()
      ).toEqual([
        {has_one: 'pot'},
        {has_one: 'leprechaun'},
        {has_many: 'colours'},
        {belongs_to: 'sun'},
        {has_and_belongs_to_many: 'admirers'}
      ]);
    });

  });
  
});
