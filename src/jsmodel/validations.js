/*global Model: false */

Model.Validations = {
  
  set_rules: function(rules){
    this.rules = rules;
  },
  
  validate_rules: function(model){
    var self = this;
    $.each(this.rules, function(rule, options){
      options = Model.Options.parse( options );
      $.each(options, function(attribute, conditions){
        self[rule](model, attribute, model.attrs[attribute], conditions);
      });
    });
  },
  
  presence_of: function(model, attribute, value, conditions){
    var error_message;
    if(this.satisfy_contitions(model, conditions)){
      if(typeof value == 'undefined'){
        this.add_error(model, attribute, 'is required');
      } else if(value === ''){
        this.add_error(model, attribute, 'cannot be blank');
      }
    }
  },
  
  uniqueness_of: function(model, attribute, value, conditions){
    var query, records, error_message;
    if(this.satisfy_contitions(model, conditions)){
      query             = {};
      query[attribute]  = value;
      records = model.constructor.find(query);
      if(records.length > 0){
        if($.grep(records, function(o){ return o != model; }).length > 0){
          this.add_error(model, attribute, 'must be unique');
        }
      }
    }
  },
  
  satisfy_contitions:function(model, conditions){
    var satisfied = true;
    if (conditions.when && satisfied) {
      satisfied = conditions.when(model);
    }
    if (conditions.unless && satisfied) {
      satisfied = !conditions.unless(model);
    }
    return satisfied;
  },
  
  add_error: function(model, attribute, message){
    var error_message = {};
    error_message[attribute] = message;
    model.errors.push(error_message);
  }
  
};
