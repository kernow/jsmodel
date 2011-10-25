/*global Model: false */

Model.Storage.Cookie = {
  
  description:  'cookie storage',
  keys:         [],
  
  
  supported: function() {
    var supported;
    $.cookie('test_support', 'supported');
    supported = $.cookie('test_support') == 'supported';
    $.cookie('test_support', null);
    return supported;
  },
  
  getItem: function (key) {
    if (this.contains(key)) {
      return JSON.parse($.cookie(key), this._reviver);
    } else {
      return null;
    }
  },
  
  setItem: function (key, value) {
    $.cookie(key, JSON.stringify(value));
    if ($.inArray(key, this.keys) < 0) {
      this.keys.push(key);
    }
  },
  
  removeItem: function (key) {
    $.cookie(key, null);
    this.keys = $.map(this.keys, function(k, i){
      if(key == k){
        return null;
      }else{
        return k;
      }
    });
  },
  
  contains: function (key) {
    return $.cookie(key) !== null;
  },
  
  count: function() {
    return this.keys.length;
  },
  
  clear: function () {
    $.each(this.keys, function(i, key){
      $.cookie(key, null);
    });
    this.keys = [];
  },
  
  // PRIVATE
  
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
