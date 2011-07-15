/*global Model: false */

Model.Options = {
  
  parse: function(options){
    var obj;
    // if string convert to object
    if (typeof options == 'string') {
      obj           = {};
      obj[options]  = {};
      options       = obj;
    }
    
    // if array convert to object
    if ($.isArray(options)) {
      obj = {};
      $.each(options, function(i,v){
        obj[v] = {};
      });
      options = obj;
    }
    
    // return object
    return options;
  }
  
};
