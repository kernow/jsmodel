Model.ClassMethods = {

  // _model_items: [],

  valid_required_attrs: function(model, attrs){
    var required_attrs = {};
    $.each(this.required_attrs, function(i,v){ required_attrs[v] = undefined; });
    for(var key in required_attrs){
      if (required_attrs.hasOwnProperty(key)) {
        if(typeof model.attrs[key] == 'undefined'){
          var obj = {};
          obj[key] = 'is required';
          model.errors.push(obj);
        } else if(model.attrs[key] === ''){
          var obj = {};
          obj[key] = 'cannot be blank';
          model.errors.push(obj);
        }
      }
    }
  },

  all: function() {
    return this._model_items;
  },

  // find method filters by the passed in options object
  find: function(options) {
    var self = this;
    return $.grep(this._model_items, function(item, i){
      var options_has_properties = false;
      for(var k in options){
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
      this.trigger('before_add', [model]);
      this._model_items.push(model);
      this.write_to_store();
      model.state = 'saved';
      this.trigger('after_add', [model]);
    }
  },
  
  next_id: function(){
    var id = -1;
    $.each(this._model_items, function(i,o){ if(o.id() > id){ id = o.id(); }});
    return id+1;
  },

  reset: function() {
    this._model_items = [];
    this.write_to_store();
    Model._remove(this.model_name);
  },
  
  load: function() {
    // clear memory before loading from local storage
    this._model_items = [];
    
    var that = this;
    if (Model.Storage.contains(this.model_name)) {
      var items = Model.Storage.getObject(this.model_name);
      $.each(items, function(i, item) {
        var model = new that(item, { skip_save: true });
        that._model_items.push(model);
        that.trigger('after_load', [model]);
      });
    } else {
      this.reset();
    }
  },
  
  write_to_store: function() {
    Model.Storage.setObject(
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
