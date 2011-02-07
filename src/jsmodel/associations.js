Model.Associations = {
  
  add_belongs_to: function(k) {
    this['get_'+k] = function(){
      return Model.find_by_name(k).find({ id: this.attrs[k+'_id'] })[0] || undefined;
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
      obj[this.model_name()+'_id'] = this.id();
      return Model.find_by_name(k.singularize()).find(obj);
    };
    this['set_'+k] = function(models){
      // remove all associations
      var obj = {};
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
    var self = this;
    // setup the array to store the association ids
    this.attrs[k+'_ids'] = [];
    
    this['get_'+k] = function(){
      return $.map(this.attrs[k+'_ids'], function(id,i){ return Model.find_by_name(k.singularize()).find({ id: id })[0]; });
    };
    this['get_'+k+'_ids'] = function(){
      return this.attrs[k+'_ids'];
    };
    this['set_'+k] = function(models){
      this.attrs[k+'_ids'] = $.map(models, function(model,i){ return model.id(); });
      // remove all associations
      var obj = {};
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
      this.attrs[k+'_ids'] = ids;
    };
    this['add_'+k] = function(models){
      $.each(models, function(i,model){
        if($.inArray(model.id(), self.attrs[k+'_ids']) < 0){
          self.attrs[k+'_ids'].push(model.id());
        }
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
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
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
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
  
  remove_associtions: function(record){
    var self = this;
    $.each(Model.find_by_name(this.model_name()).reflections(), function(i,r){
      $.each(r, function(k,v){
        switch(k){
          case "has_many":
            $.each(record['get_'+v](), function(i,r){
              r['set_'+self.model_name()+'_id'](undefined);
            });
            break;
            
          case "has_and_belongs_to_many":
            $.each(record['get_'+v](), function(i,r){
              r['remove_'+self.model_name().pluralize()+'_ids']([record.id()]);
            });
            break;
        }
      });
    });
  },
  
  model_name: function(){
    return this.constructor.model_name;
  }
  
};
