/*global Model: false */

Model.ClassMethods = {

  all: function() {
    return this._model_items;
  },

  // find method filters by the passed in options object
  find: function(options) {
    var self;
    
    self = this;
    return $.grep(this._model_items, function(item, i){
      var options_has_properties, k;
      
      options_has_properties = false;
      for(k in options){
        options_has_properties = true;
        if(self.is_function(options[k])){
          if(typeof item.attrs[k] != 'undefined'){
            return options[k](item.attrs[k]);
          }else{
            return false;
          }
        }else{
          if(item.attrs[k] != options[k]){
            return false;
          }
        }
      }
      return options_has_properties ? true : false;
    });
  },
  
  is_function: function(o) {
    return typeof o == 'function' || Object.prototype.toString.call(o) == '[object Function]' ? true : false;
	},
  
  first: function(){
    return this._model_items[0];
  },

  add: function(model) {
    if(model.valid({ 'skip_callbacks': true })){
      // set the model id before saving it
      if(model.state == 'new'){ this._model_items.push(model); }
      this.write_to_store();
      model.state = 'saved';
    }
  },
  
  next_id: function(){
    var id;
    
    id = -1;
    $.each(this._model_items, function(i,o){ if(o.id() > id){ id = o.id(); }});
    return id+1;
  },

  reset: function() {
    this._model_items  = [];
    this._refelections = [];
    this.write_to_store();
  },
  
  load: function() {
    var self, items;
    
    // clear memory before loading from local storage
    this._model_items = [];
    
    self = this;
    if (this.storage.contains(this.model_name)) {
      items = this.storage.getItem(this.model_name);
      $.each(items, function(i, item) {
        var model;
        
        model = new self(item, { skip_save: true });
        self._model_items.push(model);
        model.state = 'saved';
        self.trigger('after_load', [model]);
      });
    } else {
      this.reset();
    }
  },
  
  write_to_store: function() {
    this.storage.setItem(
      this.model_name,
      $.map(
        this._model_items,
        function(o){
          if(o.valid({ 'skip_callbacks': true })){
            return o.flatten();
          }
        }
      )
    );
  }
  
};
