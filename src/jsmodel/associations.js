/*global Model: false */

Model.Associations = {
  
  add_belongs_to: function(k) {
    this['get_'+k] = function(){
      return Model.find_by_name(k).find({ id: this.attrs[k+'_id'] })[0] || undefined;
    };
    this['get_'+k+'_id'] = function(){
      return this.attrs['get_'+k+'_id'];
    };
    this['set_'+k] = function(model){
      if(this.attrs[k+'_id'] != model.id()){
        this.will_change(k+'_id');
      }
      // set listener on associated model ?
      this.attrs[k+'_id'] = model.id();
    };
    this['set_'+k+'_id'] = function(v){
      if(this.attrs[k+'_id'] != v){
        this.will_change(k+'_id');
      }
      // set listener on associated model ?
      this.attrs[k+'_id'] = v;
    };
  },
  
  add_has_one: function(k) {
    this['get_'+k] = function(){
      var obj;
      
      obj = {};
      obj[this.model_name()+'_id'] = this.id();
      return Model.find_by_name(k).find(obj)[0];
    };
    this['set_'+k] = function(model){
      var association;
      
      // find any existing assoication and remove it
      association = this['get_'+k]();
      if(association){
        association['set_'+this.model_name()+'_id'](undefined);
      }
      if(model !== undefined){
        model['set_'+this.model_name()+'_id'](this.id());
      }
    };
  },
  
  add_has_many: function(k) {
    var self;
    
    self = this;
    this['get_'+k] = function(){
      var obj;
      
      obj = {};
      obj[this.model_name()+'_id'] = this.id();
      return Model.find_by_name(k.singularize()).find(obj);
    };
    this['set_'+k] = function(models){
      var obj;
      
      // remove all associations
      obj = {};
      obj[this.model_name()+'_id'] = this.id();
      $.each(Model.find_by_name(k.singularize()).find(obj), function(i,model){
        model['set_'+self.model_name()+'_id'](undefined);
      });
      // then add the new ones
      this['add_'+k](models);
    };
    this['add_'+k] = function(models){
      $.each(models, function(i,model){
        model['set_'+self.model_name()+'_id'](self.id());
      });
    };
    this['remove_'+k] = function(models){
      $.each(models, function(i,model){
        model['set_'+self.model_name()+'_id'](undefined);
      });
    };
  },
  
  add_has_and_belongs_to_many: function(k){
    var self;
    
    self = this;
    // setup the array to store the association ids
    this.attrs[k+'_ids'] = [];
    
    this['get_'+k] = function(){
      return $.map(this.attrs[k+'_ids'], function(id,i){ return Model.find_by_name(k.singularize()).find({ id: id })[0]; });
    };
    this['get_'+k+'_ids'] = function(){
      return this.attrs[k+'_ids'];
    };
    this['set_'+k] = function(models){
      var new_ids, obj;
      
      new_ids = $.map(models, function(model,i){ return model.id(); });
      if(this.attrs[k+'_ids'] != new_ids){
        this.will_change(k+'_ids');
      }
      this.attrs[k+'_ids'] = new_ids;
      
      // remove all associations
      obj = {};
      obj[this.model_name().pluralize()+'_ids'] = function(r){ return $.inArray(self.id(), r) > -1; };
      $.each(Model.find_by_name(k.singularize()).find(obj), function(i,model){
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
      // add new ones
      $.each(models, function(i,model){
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['set_'+k+'_ids'] = function(ids){
      if(this.attrs[k+'_ids'] != ids){
        this.will_change(k+'_ids');
      }
      this.attrs[k+'_ids'] = ids;
    };
    this['add_'+k] = function(models){
      $.each(models, function(i,model){
        if($.inArray(model.id(), self.attrs[k+'_ids']) < 0){
          self.will_change(k+'_ids');
          self.attrs[k+'_ids'].push(model.id());
        }
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['add_'+k+'_id'] = function(id){
      if($.inArray(id, self.attrs[k+'_ids']) < 0){
        this.will_change(k+'_ids');
        this.attrs[k+'_ids'].push(id);
      }
    };
    this['remove_'+k] = function(models){
      $.each(models, function(i,model){
        var pos;
        
        // remove ids from own array
        pos = $.inArray(model.id(), self.attrs[k+'_ids']);
        if(pos > -1){
          self.will_change(k+'_ids');
          self.attrs[k+'_ids'].splice(pos,1);
        }
        // remove from associated model
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
    };
    this['remove_'+k+'_ids'] = function(ids){
      $.each(ids, function(i,id){
        var pos;
        
        pos = $.inArray(id, self.attrs[k+'_ids']);
        if(pos > -1){
          self.will_change(k+'_ids');
          self.attrs[k+'_ids'].splice(pos,1);
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
