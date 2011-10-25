/*global Model: false */

Model.Storage.Default = {
  
  description: 'in memory storage',
  
  supported: function() {
    return true;
  },
  
  getItem: function(key) {
    return null;
  },
  
  setItem: function(key, value) {
    return true;
  },
  
  removeItem: function(key) {
  },
  
  contains: function(key) {
    return false;
  },
  
  count: function() {
    return 0;
  },
  
  clear: function() {
  }
  
};
