/*global Model: false */

describe("validations", function() {
  
  var User;
  
  afterEach(function() {
    User.reset();
    User = undefined;
  }); // end after
  
  describe("presence", function() {
    
    beforeEach(function() {
      User = Model('user', {
        default_attrs: ['first_name', 'last_name'],
        validates_presence_of: ['last_name', 'first_name']
      });
    }); // end before
    
    it("should be valid when first name and last name are present", function() {
      var jamie = new User({ first_name: 'jamie', last_name: 'dyer' });
      expect(jamie.valid()).toBeTruthy();
    }); // end it
    
    it("should be invalid when first name is missing", function() {
      var jamie = new User({ last_name: 'dyer' });
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].first_name).toEqual('is required');
    }); // end it
    
    it("should be invalid when last name is missing", function() {
      var jamie = new User({ first_name: 'jamie' });
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].last_name).toEqual('is required');
    }); // end it
    
    it("should be invalid when first name and last name are missing", function() {
      var jamie = new User();
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].last_name).toEqual('is required');
      expect(jamie.errors[1].first_name).toEqual('is required');
    }); // end it
    
    it("should be invalid when first name is an empty string", function() {
      var jamie = new User({ first_name: '', last_name: 'dyer' });
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].first_name).toEqual('cannot be blank');
    }); // end it
    
    it("should be invalid when last name is an empty string", function() {
      var jamie = new User({ first_name: 'jamie', last_name: '' });
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].last_name).toEqual('cannot be blank');
    }); // end it
    
    it("should be invalid when first name and last name are an empty string", function() {
      var jamie = new User({ first_name: '', last_name: '' });
      expect(jamie.valid()).toBeFalsy();
      expect(jamie.errors[0].last_name).toEqual('cannot be blank');
      expect(jamie.errors[1].first_name).toEqual('cannot be blank');
    }); // end it
    
  }); // end describe
  
  describe("uniquness", function() {
    
    beforeEach(function() {
      User = Model('user', {
        required_attrs: ['first_name', 'last_name'],
        validates_uniqueness_of: 'last_name'
      });
      new User({ first_name: 'jamie', last_name: 'dyer' });
    }); // end before
    
    it("should be invalid when the attribute is not unique", function() {
      var imposter = new User({ first_name: 'sam', last_name: 'dyer' });
      expect(imposter.valid()).toBeFalsy();
      expect(imposter.errors[0].last_name).toEqual('must be unique');
    }); // end it
    
    it("should be valid when the attribute is unique", function() {
      var nice_guy = new User({ first_name: 'sam', last_name: 'smith' });
      expect(nice_guy.valid()).toBeTruthy();
    }); // end it
    
  }); // end describe
  
}); // end describe
