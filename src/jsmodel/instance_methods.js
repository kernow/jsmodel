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
    this['get_'+k+'_id'] = function(){
      return this.attrs['get_'+k+'_id'];
    };
    this['set_'+k] = function(model){
      this.attrs[k+'_id'] = model.id();
    };
    this['set_'+k+'_id'] = function(v){
      this.attrs[k+'_id'] = v;
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
  
  add_has_and_belongs_to_many: function(k){
    var self = this;
    // setup the array to store the association ids
    this.attrs[k+'_ids'] = [];
    
    this['get_'+k] = function(){
      return $.map(this.attrs[k+'_ids'], function(id,i){ return Model.find_by_name(k.singularize()).find({ id: id })[0]; });
    };
    this['get_'+k+'_ids'] = function(){
      return this.attrs[k+'_ids'];
    };
    //
    this['set_'+k] = function(models){
      this.attrs[k+'_ids'] = $.map(models, function(model,i){ return model.id(); });
      // remove all associations
      var obj = {};
      obj[self.constructor.model_name.pluralize()+'_ids'] = function(r){ return $.inArray(self.id(), r) > -1; };
      $.each(Model.find_by_name(k.singularize()).find(obj), function(i,model){
        model['remove_'+self.constructor.model_name.pluralize()+'_ids']([self.id()]);
      });
      // add new ones
      $.each(models, function(i,model){
        model['add_'+self.constructor.model_name.pluralize()+'_id'](self.id());
      });
    };
    this['set_'+k+'_ids'] = function(ids){
      this.attrs[k+'_ids'] = ids;
    };
    //
    this['add_'+k] = function(models){
      $.each(models, function(i,model){
        if($.inArray(model.id(), self.attrs[k+'_ids']) < 0){
          self.attrs[k+'_ids'].push(model.id());
        }
        model['add_'+self.constructor.model_name.pluralize()+'_id'](self.id());
      });
    };
    this['add_'+k+'_id'] = function(id){
      if($.inArray(id, self.attrs[k+'_ids']) < 0){
        this.attrs[k+'_ids'].push(id);
      }
    };
    this['remove_'+k] = function(models){
      $.each(models, function(i,model){
        // remove ids from own array
        var pos = $.inArray(model.id(), self.attrs[k+'_ids']);
        if(pos > -1){
          self.attrs[k+'_ids'].splice(pos,1);
        }
        // remove from associated model
        model['remove_'+self.constructor.model_name.pluralize()+'_ids']([self.id()]);
      });
    };
    this['remove_'+k+'_ids'] = function(ids){
      $.each(ids, function(i,id){
        var pos = $.inArray(id, self.attrs[k+'_ids']);
        if(pos > -1){
          self.attrs[k+'_ids'].splice(pos,1);
        }
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
