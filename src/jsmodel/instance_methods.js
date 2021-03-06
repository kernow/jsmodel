/*global Model: false */

Model.InstanceMethods = {

  id: function(){
    if(this.attrs.id === undefined){
      return -1;
    }else{
      return this.attrs.id;
    }
  },
  
  add_getter_setter: function(k) {
    this["get_"+k] = function(){ return this.attrs[k]; };
    this["set_"+k] = function(v){
      if(this.attrs[k] != v){
        this.will_change(k);
      }
      this.attrs[k] = v;
    };
  },

  valid: function(options) {
    options = options || {};
    if(!options.skip_callbacks){ this.constructor.trigger('before_validation', [this]); }
    this.errors = [];
    if(this.constructor.validations){
      this.constructor.validations(this, this.attrs);
    }
    this.constructor.validate.validate_rules(this);
    var result = this.errors.length < 1;
    if(result && !options.skip_callbacks){ this.constructor.trigger('after_validation', [this]); }
    return result;
  },

  remove: function() {
    var self, deleted_item;
    
    this.constructor.trigger('before_remove', [this]);
    self = this;
    $.each(this.constructor._model_items, function(i, item){
      if(item.id() == self.id()){
        deleted_item = self.constructor._model_items.splice(i, 1);
        return false;
      }
    });
    this.constructor.write_to_store();
    // remove this record from any associated records
    this.remove_associtions();
    this.constructor.trigger('after_remove', [deleted_item[0]]);
    return deleted_item[0];
  },
  
  update: function(attrs) {
    var updated, key, current_value;
    for(key in attrs){
      if (attrs.hasOwnProperty(key)) {
        current_value = this.attrs[key];
        if(current_value != attrs[key]){
          this["set_"+key](attrs[key]);
        }
      }
    }
    if(this.changed()){ return this.save(); }
    return true;
  },
  
  save: function() {
    var dirty_attributes;
    
    if(this.valid()) {
      var create = this.state == 'new';
      
      this.constructor.trigger('before_save', [this]);
      if(create){ // new record
        this.constructor.trigger('before_create', [this]);
      }else{ // updating an existing record
        this.constructor.trigger('before_update', [this]);
      }
      
      // Save that record!
      this.constructor.add(this);
      dirty_attributes = this.clear_dirty();
      this.save_associated_records(dirty_attributes);
      
      if(create){ // new record
        this.constructor.trigger('after_create', [this]);
      }else{ // updating an existing record
        this.constructor.trigger('after_update', [this]);
      }
      this.constructor.trigger('after_save', [this]);
      
      return true;
    }else{
      return false;
    }
  },
  
  flatten: function() {
    var attrs;
    
    attrs = $.extend({}, this.attrs);
    return attrs;
  }
  
};
