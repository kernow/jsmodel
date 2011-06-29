/*global Model: false */

Model.Dirty = {
  
  will_change: function(key){
    var value;
    
    // work out what kind of this we are storing and clone it correctly
    if($.isArray(this.attrs[key])){
      value = $.extend([], this.attrs[key]);
    }else{
      value = this.attrs[key];
    }
    this.changed_attributes[key] = { old: value };
  },
  
  changed: function(){
    return this.changed_attributes_count() > 0;
  },
  
  has_changed: function(key){
    return this.changed_attributes[key] !== undefined;
  },
  
  changed_attributes_count: function(){
    var count, k;
    
    count = 0;
    for(k in this.changed_attributes) {
      if (this.changed_attributes.hasOwnProperty(k)) {
        ++count;
      }
    }
    return count;
  },
  
  clear_dirty: function(){
    var dirty_attributes = this.changed_attributes;
    this.changed_attributes = {};
    return dirty_attributes;
  }
  
};
