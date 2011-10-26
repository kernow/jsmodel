describe("triggers for", function(){
  
  var Thing;
  var InvalidThing;
  var PersistentThing;
  
  beforeEach(function(){
    Thing = new Model('thing');
    InvalidThing = new Model('invalid thing',{validates_presence_of: 'foo'});
    PersistentThing = new Model('persistent thing',{storage: Model.Storage.Cookie});
    
    // Make Thing appear to have always changed
    new Mock(Thing.prototype);
    Thing.prototype.stubs('changed').returns(true);
    
    // Make InvalidThing appear to have always changed
    new Mock(InvalidThing.prototype);
    InvalidThing.prototype.stubs('changed').returns(true);
    
    // Matchers
    this.addMatchers({
      toRunOnLoad: function(hook){
        new this.actual();
        
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
        
        this.actual.load();
        
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      },
      toRunOnCreate: function(hook){
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
        
        new this.actual();
        
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      },
      toRunOnValid: function(hook){
        var instance = new this.actual();
        
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
        
        instance.valid();
        
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      },
      toRunOnSave: function(hook){
        var instance = new this.actual();
        
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
        
        instance.save();
        
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      },
      toRunOnUpdate: function(hook){
        var instance = new this.actual();
        
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
        
        instance.update();
        
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      },
      toRunOnRemove: function(hook){
        var instance = new this.actual();
        
        var mock = new Mock();
        mock.expects('func');
        this.actual.bind(hook,mock.func);
                
        instance.remove();
                
        var result = mock.jsmocha.verify();
        mock.jsmocha.teardown();
        return result;
      }
    });
  });
  
  afterEach(function(){
    Thing.reset();
    InvalidThing.reset();
    PersistentThing.reset();
  });
  
  it("before_validation should run correctly", function(){
    var hook = 'before_validation';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).toRunOnCreate(hook);
    expect(InvalidThing).toRunOnValid(hook);
    expect(InvalidThing).toRunOnSave(hook);
    expect(InvalidThing).toRunOnUpdate(hook);
  });
  
  it("after_validation should run correctly", function(){
    var hook = 'after_validation';

    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);

    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("before_create should run correctly", function(){
    var hook = 'before_create';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).not.toRunOnSave(hook);
    expect(Thing).not.toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("before_save should run correctly", function(){
    var hook = 'before_save';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("before_update should run correctly", function(){
    var hook = 'before_update';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).not.toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("after_create should run correctly", function(){
    var hook = 'after_create';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).not.toRunOnSave(hook);
    expect(Thing).not.toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("after_save should run correctly", function(){
    var hook = 'after_save';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });
  
  it("after_update should run correctly", function(){
    var hook = 'after_update';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).not.toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).toRunOnSave(hook);
    expect(Thing).toRunOnUpdate(hook);
    expect(Thing).not.toRunOnRemove(hook);
    
    expect(InvalidThing).not.toRunOnCreate(hook);
    expect(InvalidThing).not.toRunOnValid(hook);
    expect(InvalidThing).not.toRunOnSave(hook);
    expect(InvalidThing).not.toRunOnUpdate(hook);
  });

  it("after_remove should run correctly", function(){
    var hook = 'after_remove';
    
    expect(PersistentThing).not.toRunOnLoad(hook);
    
    expect(Thing).not.toRunOnCreate(hook);
    expect(Thing).not.toRunOnValid(hook);
    expect(Thing).not.toRunOnSave(hook);
    expect(Thing).not.toRunOnUpdate(hook);
    expect(Thing).toRunOnRemove(hook);
  });
  
  it("after_load should run correctly", function(){
    var hook = 'after_load';
    
    expect(PersistentThing).toRunOnLoad(hook);
    
    expect(PersistentThing).not.toRunOnCreate(hook);
    expect(PersistentThing).not.toRunOnValid(hook);
    expect(PersistentThing).not.toRunOnSave(hook);
    expect(PersistentThing).not.toRunOnUpdate(hook);
    expect(PersistentThing).not.toRunOnRemove(hook);
  });
  
});