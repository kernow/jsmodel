var Model = function(name, options) {
  
  options               = options                   || {};
  var class_methods     = options.class_methods     || {};
  var instance_methods  = options.instance_methods  || {};
  var required_attrs    = options.required_attrs    || [];
  var default_attrs     = options.default_attrs     || [];
  var belongs_to        = options.belongs_to        || [];
  var has_many          = options.has_many          || [];
  
  var model = function(attributes, options){
    options           = options           || {};
    options.skip_save = options.skip_save || false;
    attributes  = attributes || {};
    this.attrs  = {}; // model attributes object
    this.errors = []; // validation errors array
    
    var self = this;
    
    // create belongs_to associations
    $.each(this.constructor.belongs_to, function(i,v){
      // attribute for storing associated model id
      if(!attributes[v+'_id']){
        attributes[v+'_id'] = undefined;
      }
      self.add_belongs_to(v);
    });
    
    // create has_many associations
    $.each(this.constructor.has_many, function(i,v){
      self.add_has_many(v);
    });
    
    $.each(this.constructor.required_attrs, function(i,v){
      if(typeof attributes[v] == 'undefined'){
        attributes[v] = undefined;
      }
    });
    
    $.each(this.constructor.default_attrs, function(i,v){
      if(!attributes[v]){
        attributes[v] = undefined;
      }
    });
    
    // create getters and setters for the attributes
    for(var key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this.add_getter_setter(key);
      }
    }
    
    // apply any custom getters and setters
    if(this.constructor.define_getters_setters){
      this.constructor.define_getters_setters(this);
    }
    
    // set attributes
    for(var key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this["set_"+key](attributes[key]);
      }
    }
    
    if(!options.skip_save){
      this.save();
    }
  };
  
  model.model_name = name;
  
  // add class methods
  jQuery.extend(model,
                Model.Events,
                Model.ClassMethods,
                class_methods,
                { required_attrs: required_attrs,
                  default_attrs:  default_attrs,
                  belongs_to:     belongs_to,
                  has_many:       has_many,
                  events:         {},
                  _model_items:   []
                }
  );
  
  // add instance methods
  jQuery.extend(model.prototype, Model.InstanceMethods, instance_methods);
  
  Model._add(model, name);
  
  return model;
};

Model.find_by_name = function(name){
  return Model._models[name];
};

// private attributes and methods
Model._models = {};

Model._add = function(obj, name){
  Model._models[name] = obj;
};

Model._remove = function(name){
  Model._models[name] = undefined;
};
