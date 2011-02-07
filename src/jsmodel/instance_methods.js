Model.InstanceMethods = {

  id: function(){
    if(this.attrs.id === undefined){
      return -1;
    }else{
      return this.attrs.id;
    }
  },
  
  add_getter_setter: function(k) {
    this["get_"+k] = function()   { return this.attrs[k]; };
    this["set_"+k] = function(v)  { this.attrs[k] = v; };
  },

  valid: function(options) {
    options = options || {};
    if(!options.skip_callbacks){ this.constructor.trigger('before_validation', [this]); }
    this.errors = [];
    if(this.constructor.validations){
      this.constructor.validations(this, this.attrs);
    }
    this.constructor.valid_required_attrs(this, this.attrs);
    if(!options.skip_callbacks){ this.constructor.trigger('after_validation', [this]); }
    return this.errors.length < 1;
  },

  remove: function() {
    this.constructor.trigger('before_remove', [this]);
    var that = this;
    var deleted_item;
    $.each(this.constructor._model_items, function(i, item){
      if(item.id() == that.id()){
        deleted_item = that.constructor._model_items.splice(i, 1);
        return false;
      }
    });
    this.constructor.write_to_store();
    // remove this record from any associated records
    this.remove_associtions(deleted_item[0]);
    this.constructor.trigger('after_remove', [deleted_item[0]]);
    return deleted_item[0];
  },
  
  update: function(attrs) {
    this.constructor.trigger('before_update', [this]);
    var updated = false;
    for(var key in attrs){
      if (attrs.hasOwnProperty(key)) {
        var current_value = this.attrs[key];
        if(current_value != attrs[key]){
          this["set_"+key](attrs[key]);
          updated = true;
        }
      }
    }
    if(updated){
      if(this.save()){
        this.constructor.trigger('after_update', [this]);
        return true;
      }else{
        return false;
      }
    }
    return true;
  },
  
  save: function() {
    if(this.valid()) {
      this.constructor.trigger('before_save', [this]);
      if(this.state == 'new'){ // new record
        this.constructor.add(this);
      }else{ // updating an existing record
        this.constructor.write_to_store();
      }
      this.constructor.trigger('after_save', [this]);
      return true;
    }else{
      return false;
    }
  },
  
  flatten: function() {
    var attrs = $.extend({}, this.attrs);
    return attrs;
  }
  
};
