/*global Model: false */

/**
 * sessionStorage should work for Safari 4, Chrome 4, Firefox 3.5, IE 8 and Opera 10.5
 * W3C WebStorage API methods
 * http://dev.w3.org/html5/webstorage/#storage
**/

Model.Storage.Session = {
  
  description: 'session storage',
  
  supported: function() {
    return typeof window.sessionStorage != 'undefined';
  },
  
  getItem: function (key) {
    if (this.contains(key)) {
      return JSON.parse(this._get(key), this._reviver);
    } else {
      return null;
    }
  },
  
  setItem: function (key, value) {
    window.sessionStorage.removeItem(key); // Added in to try and fix support on the iPad
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  
  removeItem: function (key) {
    window.sessionStorage.removeItem(key);
  },
  
  contains: function (key) {
    var contains_key, k;
    contains_key = false;
    for (k = 0; k < window.sessionStorage.length; k++) {
      if (this._key(k) == key) {
        contains_key = true;
        break;
      }
    }
    return contains_key;
  },
  
  count: function() {
    return window.sessionStorage.length;
  },
  
  clear: function () {
    var len, keys, i, k, self;
    if(typeof window.sessionStorage.clear != "undefined"){
      window.sessionStorage.clear();
    }else{ // FF 3.0 doesn't support the clear method so we need to impliment it
      len = window.sessionStorage.length;
      keys = [];
      for(i=0;i<len;i++){
        keys.push(window.sessionStorage.key(i));
      }
      $.each(keys, function(i, key){
        window.sessionStorage.removeItem(key);
      });
    }
  },
  
  // PRIVATE

  _key: function (index) {
    if (index >= window.sessionStorage.length) {
      return null;
    } else {
      return window.sessionStorage.key(index);
    }
  },

  _get: function (key) {
    var item;
    item = window.sessionStorage.getItem(key);
    if(item === null){
      return item;
    }else if(typeof item.value == 'undefined'){ // FF 3.0 impliments .value
      return item;
    } else {
      return item.value;
    }
  },

  // Extended API methods, call the W3C methods above
  // http://code.google.com/p/realstorage/wiki/API
  
  _reviver: function(key, value) {
    var a;
    if (typeof value === 'string') {
      a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
      if (a) {
        return new Date(Date.UTC( a[1], a[2] - 1, a[3], a[4], a[5], a[6]));
      }
    }
    return value;
  }
  
};
