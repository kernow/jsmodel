/*global Model: false */

Model.Associations = {
  
  add_belongs_to: function(name, options) {
    var associated_model, class_name, foreign_key;
    
    options     = options             || {};
    class_name  = options.class_name  || name.singularize();
    foreign_key = options.foreign_key || name + '_id';
    
    associated_model = Model.find_by_name(class_name);
    
    this['get_'+name] = function(){
      return associated_model.find({ id: this.attrs[foreign_key] })[0] || undefined;
    };
    this['get_'+name+'_id'] = function(){
      return this.attrs['get_'+name+'_id'];
    };
    this['set_'+name] = function(model){
      if(this.attrs[foreign_key] != model.id()){
        this.will_change(name+'_id');
      }
      // set listener on associated model ?
      this.attrs[foreign_key] = model.id();
    };
    this['set_'+name+'_id'] = function(v){
      if(this.attrs[foreign_key] != v){
        this.will_change(name+'_id');
      }
      // set listener on associated model ?
      this.attrs[foreign_key] = v;
    };
  },
  
  add_has_one: function(name, options) {
    var associated_model, class_name, foreign_key;
    
    options     = options             || {};
    class_name  = options.class_name  || name;
    
    associated_model = Model.find_by_name(class_name);
    
    this['get_'+name] = function(){
      var obj;
      
      obj = {};
      obj[this.model_name()+'_id'] = this.id();
      return associated_model.find(obj)[0];
    };
    this['set_'+name] = function(model){
      var association;
      
      // find any existing assoication and remove it
      association = this['get_'+name]();
      if(association){
        association['set_'+this.model_name()+'_id'](undefined);
      }
      if(model !== undefined){
        model['set_'+this.model_name()+'_id'](this.id());
      }
    };
  },
  
  add_has_many: function(name, options) {
    var self, associated_model, class_name, foreign_key;
    
    options     = options             || {};
    class_name  = options.class_name  || name.singularize();
    foreign_key = options.foreign_key || this.model_name() + '_id';
    
    self = this;
    associated_model = Model.find_by_name(class_name);
    
    this['get_'+name] = function(){
      var obj;
      obj = {};
      obj[foreign_key] = this.id();
      return associated_model.find(obj);
    };
    this['set_'+name] = function(models){
      var obj;
      // remove all associations
      obj = {};
      obj[foreign_key] = this.id();
      $.each(associated_model.find(obj), function(i,model){
        model['set_' + foreign_key](undefined);
      });
      // then add the new ones
      this['add_'+name](models);
    };
    this['add_'+name] = function(models){
      $.each(models, function(i,model){
        model['set_' + foreign_key](self.id());
      });
    };
    this['remove_'+name] = function(models){
      $.each(models, function(i,model){
        model['set_' + foreign_key](undefined);
      });
    };
  },
  
  add_has_and_belongs_to_many: function(name){
    var self;
    
    self = this;
    // setup the array to store the association ids
    this.attrs[name+'_ids'] = [];
    
    this['get_'+name] = function(){
      return $.map(this.attrs[name+'_ids'], function(id,i){ return Model.find_by_name(name.singularize()).find({ id: id })[0]; });
    };
    this['get_'+name+'_ids'] = function(){
      return this.attrs[name+'_ids'];
    };
    this['set_'+name] = function(models){
      var new_ids, obj;
      
      new_ids = $.map(models, function(model,i){ return model.id(); });
      if(this.attrs[name+'_ids'] != new_ids){
        this.will_change(name+'_ids');
      }
      this.attrs[name+'_ids'] = new_ids;
      
      // remove all associations
      obj = {};
      obj[this.model_name().pluralize()+'_ids'] = function(r){ return $.inArray(self.id(), r) > -1; };
      $.each(Model.find_by_name(name.singularize()).find(obj), function(i,model){
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
      // add new ones
      $.each(models, function(i,model){
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['set_'+name+'_ids'] = function(ids){
      if(this.attrs[name+'_ids'] != ids){
        this.will_change(name+'_ids');
      }
      this.attrs[name+'_ids'] = ids;
    };
    this['add_'+name] = function(models){
      $.each(models, function(i,model){
        if($.inArray(model.id(), self.attrs[name+'_ids']) < 0){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].push(model.id());
        }
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['add_'+name+'_id'] = function(id){
      if($.inArray(id, self.attrs[name+'_ids']) < 0){
        this.will_change(name+'_ids');
        this.attrs[name+'_ids'].push(id);
      }
    };
    this['remove_'+name] = function(models){
      $.each(models, function(i,model){
        var pos;
        
        // remove ids from own array
        pos = $.inArray(model.id(), self.attrs[name+'_ids']);
        if(pos > -1){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].splice(pos,1);
        }
        // remove from associated model
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
    };
    this['remove_'+name+'_ids'] = function(ids){
      $.each(ids, function(i,id){
        var pos;
        
        pos = $.inArray(id, self.attrs[name+'_ids']);
        if(pos > -1){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].splice(pos,1);
        }
      });
    };
  },
  
  save_associated_records: function(dirty_attributes){
    var self;
    
    self = this;
    this.with_each_reflection(function(type, key){
      switch(type){
        case "has_many":
        case "has_and_belongs_to_many":
          // save associated records
          $.each(self['get_'+key](), function(i,r){
            if(r.changed()){
              r.save();
            }
          });
          // save dirty associations
          $.each(dirty_attributes, function(k,v){
            if(key+'_ids' == k){
              // get the model
              $.each(v.old, function(i,id){
                $.each(Model.find_by_name(key.singularize()).find({ id: id }), function(i,r){
                  if(r.changed()){
                    r.save();
                  }
                });
              });
            }
          });
          break;
      }
    });
  },
  
  with_each_reflection: function(block){
    var self;
    
    self = this;
    $.each(this.reflections(), function(i,r){
      $.each(r, function(k,v){
        block(k,v);
      });
    });
  },
  
  remove_associtions: function(){
    var self;
    
    self = this;
    $.each(this.reflections(), function(i,r){
      $.each(r, function(k,v){
        switch(k){
          case "has_many":
            $.each(self['get_'+v](), function(i,r){
              r['set_'+self.model_name()+'_id'](undefined);
            });
            break;
            
          case "has_and_belongs_to_many":
            $.each(self['get_'+v](), function(i,r){
              r['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
            });
            break;
        }
      });
    });
  },
  
  reflections: function(){
    return Model.find_by_name(this.model_name()).reflections();
  },
  
  model_name: function(){
    return this.constructor.model_name;
  }
  
};
