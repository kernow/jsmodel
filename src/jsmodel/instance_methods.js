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
  
  add_belongs_to: function(k) {
    this['get_'+k] = function(){
      return Model.find_by_name(k).find({ id: this.attrs[k+'_id'] })[0];
    };
    this['set_'+k] = function(model){
      this.attrs[k+'_id'] = model.id();
    };
  },
  
  add_has_many: function(k) {
    var self = this;
    this['get_'+k] = function(){
      var obj = {};
      obj[self.constructor.model_name+'_id'] = this.id();
      return Model.find_by_name(k.singularize()).find(obj);
    };
    this['set_'+k] = function(models){
      // remove all associations
      var obj = {};
      obj[self.constructor.model_name+'_id'] = this.id();
      $.each(Model.find_by_name(k.singularize()).find(obj), function(i,model){
        model['set_'+self.constructor.model_name+'_id'](undefined);
      });
      // then add the new ones
      this['add_'+k](models);
    };
    this['add_'+k] = function(models){
      $.each(models, function(i,model){
        model['set_'+self.constructor.model_name+'_id'](self.id());
      });
    };
    this['remove_'+k] = function(models){
      $.each(models, function(i,model){
        model['set_'+self.constructor.model_name+'_id'](undefined);
      });
    };
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
    this.constructor.trigger('after_remove', [deleted_item[0]]);
    return deleted_item;
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
      if(this.id() < 0){ // new record
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
