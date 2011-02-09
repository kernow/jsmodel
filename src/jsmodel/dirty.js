Model.Dirty = {
  
  will_change: function(key){
    this.changed_attributes[key] = { old: this.attrs[key] };
  },
  
  changed: function(){
    return this.changed_attributes_count() > 0;
  },
  
  changed_attributes_count: function(){
    var count = 0, k;
    for(k in this.changed_attributes) {
      if (this.changed_attributes.hasOwnProperty(k)) {
        ++count;
      }
    }
    return count;
  },
  
  clear_dirty: function(){
    this.changed_attributes = {};
  }
  
};
