//= require <vendor/jquery-1.3.1>

var Model = function(name, options) {
  
  options               = options                   || {};
  var class_methods     = options.class_methods     || {};
  var instance_methods  = options.instance_methods  || {};
  var required_attrs    = options.required_attrs    || [];
  var default_attrs     = options.default_attrs     || [];
  
  var model = function(attributes, options){
    options           = options           || {};
    options.skip_save = options.skip_save || false;
    attributes  = attributes || {};
    this.attrs  = {}; // model attributes object
    this.errors = []; // validation errors array
    
    $.each(this.constructor.required_attrs, function(i,v){
      if(!attributes[v]){
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
        this.add_getter_setter(key, attributes[key]);
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
  jQuery.extend(model, Model.Events, Model.ClassMethods, class_methods, { required_attrs: required_attrs, default_attrs: default_attrs, events: {}, _model_items: [] });
  
  // add instance methods
  jQuery.extend(model.prototype, Model.InstanceMethods, instance_methods);
  
  return model;
};
