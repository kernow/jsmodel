/*global Model: false */

Model.Reflections = {
  
  add_reflections_for_self: function(){
    var self;
    
    self = this;
    $.each({ has_many: this.has_many, belongs_to: this.belongs_to, has_and_belongs_to_many: this.has_and_belongs_to_many }, function(key,association){
      $.each(association, function(k,v){
        var obj;
        
        obj = {};
        obj[key] = k;
        self.add_reflection(obj);
      });
    });
  },
  
  add_reflection: function(obj){
    this._reflections.push(obj);
  },
  
  reflections: function(){
    return this._reflections;
  }
};
