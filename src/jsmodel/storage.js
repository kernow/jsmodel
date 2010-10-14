Model.Storage = {
  // TODO Add support for storage event

  // sessionStorage should work for Safari 4, Chrome 4, Firefox 3.5, IE 8 and Opera 10.5
  sessionStorage: typeof window.sessionStorage != 'undefined' ? window.sessionStorage : null,

  // Fallback to cookies if HTML5 sessionStorage unavailable
  // in which case we need to keep a list of cookie keys
  keys: [],

  // W3C WebStorage API methods
  // http://dev.w3.org/html5/webstorage/#storage

  // Define getter for length attribute
  length: function() {
    if (this.sessionStorage) {
      return this.sessionStorage.length;
    } else {
      return this.keys.length;
    }
  },

  key: function (index) {
    if (index >= this.length()) {
      return null;
    } else {
      if (this.sessionStorage) {
        return this.sessionStorage.key(index);
      } else {
        return this.keys[index];        
      }
    }
  },

  getItem: function (key) {
    if (this.sessionStorage) {
      var item = this.sessionStorage.getItem(key);
      if(item === null){
        return item;
      }else if(typeof item.value == 'undefined'){ // FF 3.0 impliments .value
        return item;
      } else {
        return item.value;
      }
    } else {
      return jQuery.cookie(key);
    }
  },

  setItem: function (key, value) {
    if (this.sessionStorage) {
      this.sessionStorage.removeItem(key); // Added in to try and fix support on the iPad
      this.sessionStorage.setItem(key, value);
    } else {
      jQuery.cookie(key, value);
      if (!this.contains(key)) {
        this.keys.push(key);        
      }
    }
  },

  removeItem: function (key) {
    if (this.sessionStorage) {
      this.sessionStorage.removeItem(key);
    } else {
      for (var k = 0; k < this.length(); k++) {
        if (this.keys[k] == key) {
          jQuery.cookie(key, null);
          if (k == this.length() - 1) {
            this.keys.pop();
          } else {
            delete this.keys[k];
            // Fill the gap from the end to keep the length in sync
            this.keys[k] = this.keys.pop();
          }
        }
      }
    }
  },

  clear: function () {
    if (this.sessionStorage) {
      if(typeof this.sessionStorage.clear != "undefined"){
        this.sessionStorage.clear();
      }else{ // FF 3.0 doesn't support the clear method so we need to impliment it
        var len = this.sessionStorage.length;
        var keys = [];
        for(i=0;i<len;i++){
          keys.push(this.sessionStorage.key(i));
        }
        var self = this;
        $.each(keys, function(i, key){
          self.sessionStorage.removeItem(key);
        });
      }
    } else {
      for (k = 0; k < this.length(); k++) {
        jQuery.cookie(this.keys[k], null);
      }
      this.keys = [];
    }
  },

  // Extended API methods, call the W3C methods above
  // http://code.google.com/p/realstorage/wiki/API

  getObject: function (key) {
    if (this.contains(key)) {
      return JSON.parse(this.getItem(key), this.reviver);
    } else {
      return null;
    }
  },
  
  reviver: function(key, value) {
    var a;
    if (typeof value === 'string') {
      a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
      if (a) {
        return new Date(Date.UTC( a[1], a[2] - 1, a[3], a[4], a[5], a[6]));
      }
    }
    return value;
  },

  setObject: function (key, value) {
    this.setItem(key, JSON.stringify(value));
  },

  contains: function (key) {
    contains_key = false;
    for (k = 0; k < this.length(); k++) {
      if (this.key(k) == key) {
        contains_key = true;
        break;
      }
    }
    return contains_key;
  }
};
