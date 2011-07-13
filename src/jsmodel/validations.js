/*global Model: false */

Model.Validations = {
  
  set_rules: function(rules){
    this.rules = rules;
  },
  
  validate_rules: function(model){
    var self = this;
    $.each(this.rules, function(rule, attributes){
      if (!$.isArray(attributes)) {
        attributes = [attributes];
      }
      $.each(attributes, function(i, attribute){
        self[rule](model, attribute, model.attrs[attribute]);
      });
    });
  },
  
  presence_of: function(model, attribute, value){
    var error_message;
    if(typeof value == 'undefined'){
      this.add_error(model, attribute, 'is required');
    } else if(value === ''){
      this.add_error(model, attribute, 'cannot be blank');
    }
  },
  
  uniqueness_of: function(model, attribute, value){
    var query, records, error_message;
    query             = {};
    query[attribute]  = value;
    records = model.constructor.find(query);
    if(records.length > 0){
      if($.grep(records, function(o){ return o != model; }).length > 0){
        this.add_error(model, attribute, 'must be unique');
      }
    }
  },
  
  add_error: function(model, attribute, message){
    var error_message = {};
    error_message[attribute] = message;
    model.errors.push(error_message);
  }
  
};
