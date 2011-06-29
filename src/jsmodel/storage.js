/*global Model: false */

Model.Storage = {
  
  engine: null,
  
  // initialize the storage engine and check it's supported on the platform
  initialize: function(engines){
    var engines_tried;
    engines_tried = [];
    if(!$.isArray(engines)){
      engines = [engines];
    }
    $.each(engines, function(i,engine){
      if(engine.supported()){
        Model.Storage.engine = engine;
        return false;
      }else{
        engines_tried.push(engine.description);
      }
    });
    if(Model.Storage.engine === null){
      console.error("No supported engine found, tried: " + engines_tried.join(', '));
    }
  },
  
  // does the system support the requested storage option
  // retuns boolean
  supported: function() {
    return this.engine.supported();
  },
  
  // loads on object from storage
  getItem: function(key) {
    return this.engine.getItem(key);
  },
  
  // saves an object to storage
  setItem: function(key, value) {
    return this.engine.setItem(key, value);
  },
  
  // removes an object from storage
  removeItem: function(key) {
    return this.engine.removeObject(key);
  },
  
  // returns if the storage system contains the requested key
  contains: function(key) {
    return this.engine.contains(key);
  },
  
  // returns the number of items in storage
  count: function() {
    return this.engine.count();
  },
  
  // clears all records from storage
  clear: function() {
    return this.engine.clear();
  }
  
};
