var Model = function(name, options) {
  var class_methods, instance_methods, attributes, belongs_to;
  var has_one, has_many, has_and_belongs_to_many, model, validation_rules;
  
  options                 = options                         || {};
  class_methods           = options.class_methods           || {};
  instance_methods        = options.instance_methods        || {};
  attributes              = options.attributes              || [];
  belongs_to              = options.belongs_to              || {};
  has_one                 = options.has_one                 || {};
  has_many                = options.has_many                || {};
  has_and_belongs_to_many = options.has_and_belongs_to_many || {};
  
  validation_rules = {};
  if (options.validates_uniqueness_of) {
    validation_rules.uniqueness_of = options.validates_uniqueness_of;
  }
  if (options.validates_presence_of) {
    validation_rules.presence_of = options.validates_presence_of;
  }
  
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
    
    $.each(this.constructor.attributes, function(i,v){
      if(typeof attributes[v] == 'undefined'){
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
    $.each(this.constructor.belongs_to, function(name, options){
      self.add_belongs_to(name, options);
    });
    
    // create has_one associations
    $.each(this.constructor.has_one, function(k,v){
      self.add_has_one(k);
    });
    
    // create has_many associations
    $.each(this.constructor.has_many, function(name, options){
      self.add_has_many(name, options);
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
                { storage:                  {},
                  validate:                 {},
                  attributes:               attributes,
                  belongs_to:               belongs_to,
                  has_one:                  has_one,
                  has_many:                 has_many,
                  has_and_belongs_to_many:  has_and_belongs_to_many,
                  events:                   {},
                  _model_items:             [],
                  _reflections:             []
                }
  );
  
  jQuery.extend(model.storage,  Model.Storage     );
  jQuery.extend(model.validate, Model.Validations );
  
  // add instance methods
  jQuery.extend(model.prototype,
                Model.InstanceMethods,
                Model.Associations,
                Model.Dirty,
                instance_methods);
  
  // set the models validation rules
  model.validate.set_rules(validation_rules);
  
  // add reflections
  model.add_reflections_for_self();
  
  // set the storage type or default to in memory storage
  model.storage.initialize(options.storage || Model.Storage.Default);
  
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
