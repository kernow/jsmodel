Model.Storage = {
  // TODO Add support for storage event

  // sessionStorage should work for Safari 4, Chrome 4, Firefox 3.5, IE 8 and Opera 10.5
  sessionStorage: window.sessionStorage ? window.sessionStorage : null,

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
      if(typeof item.value == 'undefined'){
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
      this.sessionStorage.clear();
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
      return JSON.parse(this.getItem(key));
    } else {
      return null;
    }
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
