Model.Events = {

  bind: function(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
    return this;
  },

  trigger: function(name, data) {
    var events = this.events[name];

    if (events) {
      for (var i = 0; i < events.length; i++) {
        events[i].apply(this, data || []);
      }
    }

    return this;
  },

  unbind: function(event, callback) {
    if (callback) {
      var events = this.events[event] || [];

      for (var i = 0; i < events.length; i++) {
        if (events[i] === callback) {
          this.events[event].splice(i, 1);
        }
      }
    } else {
      delete this.events[event];
    }

    return this;
  }
};
