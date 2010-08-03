Model.ClassMethods = {

  // _model_items: [],

  valid_required_attrs: function(model, attrs){
    var required_attrs = {};
    $.each(this.required_attrs, function(i,v){ required_attrs[v] = undefined; });
    for(var key in required_attrs){
      if (required_attrs.hasOwnProperty(key)) {
        if(!model.attrs[key]){
          var obj = {};
          obj[key] = 'is required';
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
    return $.grep(this._model_items, function(item, i){
      var options_has_properties = false;
      for(var k in options){
        options_has_properties = true;
        if(item.attrs[k] != options[k]){
          return false;
        }
      }
      return options_has_properties ? true : false;
    });
  },

  add: function(model) {
    if(model.valid()){
      this.trigger('before_add', [model]);
      // set the model id before saving it
      model.attrs.id = this.next_id();
      this._model_items.push(model);
      this.write_to_store();
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
  },
  
  load: function() {
    var that = this;
    if (Model.Storage.contains(this.model_name)) {
      var items = Model.Storage.getObject(this.model_name);
      $.each(items, function(i, item) {
        var tmp = new that(item);
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
