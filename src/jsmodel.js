var Model = function(name, options) {
  var class_methods, instance_methods, required_attrs, default_attrs, belongs_to;
  var has_one, has_many, has_and_belongs_to_many, model;
  
  options                 = options                         || {};
  class_methods           = options.class_methods           || {};
  instance_methods        = options.instance_methods        || {};
  required_attrs          = options.required_attrs          || [];
  default_attrs           = options.default_attrs           || [];
  belongs_to              = options.belongs_to              || {};
  has_one                 = options.has_one                 || {};
  has_many                = options.has_many                || {};
  has_and_belongs_to_many = options.has_and_belongs_to_many || {};
  
  model = function(attributes, options){
    var self, key;
    
    self = this;
    
    options                 = options           || {};
    options.skip_save       = options.skip_save || false;
    attributes              = attributes        || {};
    this.attrs              = {}; // model attributes object
    this.errors             = []; // validation errors array
    this.state              = 'new';
    this.changed_attributes = {}; // keep track of change attributes
    
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
    for(key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this.add_getter_setter(key);
      }
    }
    
    // create belongs_to associations
    $.each(this.constructor.belongs_to, function(k,v){
      self.add_belongs_to(k);
    });
    
    // create has_one associations
    $.each(this.constructor.has_one, function(k,v){
      self.add_has_one(k);
    });
    
    // create has_many associations
    $.each(this.constructor.has_many, function(k,v){
      self.add_has_many(k);
    });
    
    // create has_and_belongs_to_many associations
    $.each(this.constructor.has_and_belongs_to_many, function(k,v){
      self.add_has_and_belongs_to_many(k);
    });
    
    // apply any custom getters and setters
    if(this.constructor.define_getters_setters){
      this.constructor.define_getters_setters(this);
    }
    
    // set the models id
    this.attrs.id = this.constructor.next_id();
    
    // set attributes
    for(key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this["set_"+key](attributes[key]);
      }
    }
    
    if(!options.skip_save){
      this.constructor.trigger('before_create', [this]);
      if(this.save()){
        this.constructor.trigger('after_create', [this]);
      }
    }
  };
  
  model.model_name = name;
  
  // add class methods
  jQuery.extend(model,
                Model.Events,
                Model.ClassMethods,
                Model.Reflections,
                class_methods,
                { required_attrs:           required_attrs,
                  default_attrs:            default_attrs,
                  belongs_to:               belongs_to,
                  has_one:                  has_one,
                  has_many:                 has_many,
                  has_and_belongs_to_many:  has_and_belongs_to_many,
                  events:                   {},
                  _model_items:             [],
                  _reflections:             []
                }
  );
  
  // add instance methods
  jQuery.extend(model.prototype,
                Model.InstanceMethods,
                Model.Associations,
                Model.Dirty,
                instance_methods);
  
  // add reflections
  model.add_reflections_for_self();
  
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
