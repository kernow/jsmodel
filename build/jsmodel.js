/*
Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
  This code is based in part on the work done in Ruby to support
  infection as part of Ruby on Rails in the ActiveSupport's Inflector
  and Inflections classes.  It was initally ported to Javascript by
  Ryan Schuft (ryan.schuft@gmail.com) in 2007.

  The code is available at http://code.google.com/p/inflection-js/

  The basic usage is:
    1. Include this script on your web page.
    2. Call functions on any String object in Javascript

  Currently implemented functions:

    String.pluralize(plural) == String
      renders a singular English language noun into its plural form
      normal results can be overridden by passing in an alternative

    String.singularize(singular) == String
      renders a plural English language noun into its singular form
      normal results can be overridden by passing in an alterative

    String.camelize(lowFirstLetter) == String
      renders a lower case underscored word into camel case
      the first letter of the result will be upper case unless you pass true
      also translates "/" into "::" (underscore does the opposite)

    String.underscore() == String
      renders a camel cased word into words seperated by underscores
      also translates "::" back into "/" (camelize does the opposite)

    String.humanize(lowFirstLetter) == String
      renders a lower case and underscored word into human readable form
      defaults to making the first letter capitalized unless you pass true

    String.capitalize() == String
      renders all characters to lower case and then makes the first upper

    String.dasherize() == String
      renders all underbars and spaces as dashes

    String.titleize() == String
      renders words into title casing (as for book titles)

    String.demodulize() == String
      renders class names that are prepended by modules into just the class

    String.tableize() == String
      renders camel cased singular words into their underscored plural form

    String.classify() == String
      renders an underscored plural word into its camel cased singular form

    String.foreign_key(dropIdUbar) == String
      renders a class name (camel cased singular noun) into a foreign key
      defaults to seperating the class from the id with an underbar unless
      you pass true

    String.ordinalize() == String
      renders all numbers found in the string into their sequence like "22nd"
*/

/*
  This sets up a container for some constants in its own namespace
  We use the window (if available) to enable dynamic loading of this script
  Window won't necessarily exist for non-browsers.
*/
if (window && !window.InflectionJS)
{
    window.InflectionJS = null;
}

/*
  This sets up some constants for later use
  This should use the window namespace variable if available
*/
InflectionJS =
{
    /*
      This is a list of nouns that use the same form for both singular and plural.
      This list should remain entirely in lower case to correctly match Strings.
    */
    uncountable_words: [
        'equipment', 'information', 'rice', 'money', 'species', 'series',
        'fish', 'sheep', 'moose', 'deer', 'news'
    ],

    /*
      These rules translate from the singular form of a noun to its plural form.
    */
    plural_rules: [
        [new RegExp('(m)an$', 'gi'),                 '$1en'],
        [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
        [new RegExp('(child)$', 'gi'),               '$1ren'],
        [new RegExp('^(ox)$', 'gi'),                 '$1en'],
        [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
        [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
        [new RegExp('(alias|status)$', 'gi'),        '$1es'],
        [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
        [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
        [new RegExp('([ti])um$', 'gi'),              '$1a'],
        [new RegExp('sis$', 'gi'),                   'ses'],
        [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
        [new RegExp('(hive)$', 'gi'),                '$1s'],
        [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
        [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
        [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
        [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
        [new RegExp('(quiz)$', 'gi'),                '$1zes'],
        [new RegExp('s$', 'gi'),                     's'],
        [new RegExp('$', 'gi'),                      's']
    ],

    /*
      These rules translate from the plural form of a noun to its singular form.
    */
    singular_rules: [
        [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
        [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
        [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
        [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
        [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
        [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
        [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
        [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
        [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
        [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
        [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
        [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
        [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
        [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
        [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
        [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
        [new RegExp('(o)es$', 'gi'),                                                       '$1'],
        [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
        [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
        [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
        [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
        [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
        [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
        [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
        [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
        [new RegExp('s$', 'gi'),                                                           '']
    ],

    /*
      This is a list of words that should not be capitalized for title case
    */
    non_titlecased_words: [
        'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
        'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
        'with', 'for'
    ],

    /*
      These are regular expressions used for converting between String formats
    */
    id_suffix: new RegExp('(_ids|_id)$', 'g'),
    underbar: new RegExp('_', 'g'),
    space_or_underbar: new RegExp('[\ _]', 'g'),
    uppercase: new RegExp('([A-Z])', 'g'),
    underbar_prefix: new RegExp('^_'),

    /*
      This is a helper method that applies rules based replacement to a String
      Signature:
        InflectionJS.apply_rules(str, rules, skip, override) == String
      Arguments:
        str - String - String to modify and return based on the passed rules
        rules - Array: [RegExp, String] - Regexp to match paired with String to use for replacement
        skip - Array: [String] - Strings to skip if they match
        override - String (optional) - String to return as though this method succeeded (used to conform to APIs)
      Returns:
        String - passed String modified by passed rules
      Examples:
        InflectionJS.apply_rules("cows", InflectionJs.singular_rules) === 'cow'
    */
    apply_rules: function(str, rules, skip, override)
    {
        if (override)
        {
            str = override;
        }
        else
        {
            var ignore = (skip.indexOf(str.toLowerCase()) > -1);
            if (!ignore)
            {
                for (var x = 0; x < rules.length; x++)
                {
                    if (str.match(rules[x][0]))
                    {
                        str = str.replace(rules[x][0], rules[x][1]);
                        break;
                    }
                }
            }
        }
        return str;
    }
};

/*
  This lets us detect if an Array contains a given element
  Signature:
    Array.indexOf(item, fromIndex, compareFunc) == Integer
  Arguments:
    item - Object - object to locate in the Array
    fromIndex - Integer (optional) - starts checking from this position in the Array
    compareFunc - Function (optional) - function used to compare Array item vs passed item
  Returns:
    Integer - index position in the Array of the passed item
  Examples:
    ['hi','there'].indexOf("guys") === -1
    ['hi','there'].indexOf("hi") === 0
*/
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(item, fromIndex, compareFunc)
    {
        if (!fromIndex)
        {
            fromIndex = -1;
        }
        var index = -1;
        for (var i = fromIndex; i < this.length; i++)
        {
            if (this[i] === item || compareFunc && compareFunc(this[i], item))
            {
                index = i;
                break;
            }
        }
        return index;
    };
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._uncountable_words)
{
    String.prototype._uncountable_words = InflectionJS.uncountable_words;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._plural_rules)
{
    String.prototype._plural_rules = InflectionJS.plural_rules;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._singular_rules)
{
    String.prototype._singular_rules = InflectionJS.singular_rules;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._non_titlecased_words)
{
    String.prototype._non_titlecased_words = InflectionJS.non_titlecased_words;
}

/*
  This function adds plurilization support to every String object
    Signature:
      String.pluralize(plural) == String
    Arguments:
      plural - String (optional) - overrides normal output with said String
    Returns:
      String - singular English language nouns are returned in plural form
    Examples:
      "person".pluralize() == "people"
      "octopus".pluralize() == "octopi"
      "Hat".pluralize() == "Hats"
      "person".pluralize("guys") == "guys"
*/
if (!String.prototype.pluralize)
{
    String.prototype.pluralize = function(plural)
    {
        return InflectionJS.apply_rules(
            this,
            this._plural_rules,
            this._uncountable_words,
            plural
        );
    };
}

/*
  This function adds singularization support to every String object
    Signature:
      String.singularize(singular) == String
    Arguments:
      singular - String (optional) - overrides normal output with said String
    Returns:
      String - plural English language nouns are returned in singular form
    Examples:
      "people".singularize() == "person"
      "octopi".singularize() == "octopus"
      "Hats".singularize() == "Hat"
      "guys".singularize("person") == "person"
*/
if (!String.prototype.singularize)
{
    String.prototype.singularize = function(singular)
    {
        return InflectionJS.apply_rules(
            this,
            this._singular_rules,
            this._uncountable_words,
            singular
        );
    };
}

/*
  This function adds camelization support to every String object
    Signature:
      String.camelize(lowFirstLetter) == String
    Arguments:
      lowFirstLetter - boolean (optional) - default is to capitalize the first
        letter of the results... passing true will lowercase it
    Returns:
      String - lower case underscored words will be returned in camel case
        additionally '/' is translated to '::'
    Examples:
      "message_properties".camelize() == "MessageProperties"
      "message_properties".camelize(true) == "messageProperties"
*/
if (!String.prototype.camelize)
{
     String.prototype.camelize = function(lowFirstLetter)
     {
        var str = this.toLowerCase();
        var str_path = str.split('/');
        for (var i = 0; i < str_path.length; i++)
        {
            var str_arr = str_path[i].split('_');
            var initX = ((lowFirstLetter && i + 1 === str_path.length) ? (1) : (0));
            for (var x = initX; x < str_arr.length; x++)
            {
                str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
            }
            str_path[i] = str_arr.join('');
        }
        str = str_path.join('::');
        return str;
    };
}

/*
  This function adds underscore support to every String object
    Signature:
      String.underscore() == String
    Arguments:
      N/A
    Returns:
      String - camel cased words are returned as lower cased and underscored
        additionally '::' is translated to '/'
    Examples:
      "MessageProperties".camelize() == "message_properties"
      "messageProperties".underscore() == "message_properties"
*/
if (!String.prototype.underscore)
{
     String.prototype.underscore = function()
     {
        var str = this;
        var str_path = str.split('::');
        for (var i = 0; i < str_path.length; i++)
        {
            str_path[i] = str_path[i].replace(InflectionJS.uppercase, '_$1');
            str_path[i] = str_path[i].replace(InflectionJS.underbar_prefix, '');
        }
        str = str_path.join('/').toLowerCase();
        return str;
    };
}

/*
  This function adds humanize support to every String object
    Signature:
      String.humanize(lowFirstLetter) == String
    Arguments:
      lowFirstLetter - boolean (optional) - default is to capitalize the first
        letter of the results... passing true will lowercase it
    Returns:
      String - lower case underscored words will be returned in humanized form
    Examples:
      "message_properties".humanize() == "Message properties"
      "message_properties".humanize(true) == "message properties"
*/
if (!String.prototype.humanize)
{
    String.prototype.humanize = function(lowFirstLetter)
    {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.id_suffix, '');
        str = str.replace(InflectionJS.underbar, ' ');
        if (!lowFirstLetter)
        {
            str = str.capitalize();
        }
        return str;
    };
}

/*
  This function adds capitalization support to every String object
    Signature:
      String.capitalize() == String
    Arguments:
      N/A
    Returns:
      String - all characters will be lower case and the first will be upper
    Examples:
      "message_properties".capitalize() == "Message_properties"
      "message properties".capitalize() == "Message properties"
*/
if (!String.prototype.capitalize)
{
    String.prototype.capitalize = function()
    {
        var str = this.toLowerCase();
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    };
}

/*
  This function adds dasherization support to every String object
    Signature:
      String.dasherize() == String
    Arguments:
      N/A
    Returns:
      String - replaces all spaces or underbars with dashes
    Examples:
      "message_properties".capitalize() == "message-properties"
      "Message Properties".capitalize() == "Message-Properties"
*/
if (!String.prototype.dasherize)
{
    String.prototype.dasherize = function()
    {
        var str = this;
        str = str.replace(InflectionJS.space_or_underbar, '-');
        return str;
    };
}

/*
  This function adds titleize support to every String object
    Signature:
      String.titleize() == String
    Arguments:
      N/A
    Returns:
      String - capitalizes words as you would for a book title
    Examples:
      "message_properties".titleize() == "Message Properties"
      "message properties to keep".titleize() == "Message Properties to Keep"
*/
if (!String.prototype.titleize)
{
    String.prototype.titleize = function()
    {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.underbar, ' ');
        var str_arr = str.split(' ');
        for (var x = 0; x < str_arr.length; x++)
        {
            var d = str_arr[x].split('-');
            for (var i = 0; i < d.length; i++)
            {
                if (this._non_titlecased_words.indexOf(d[i].toLowerCase()) < 0)
                {
                    d[i] = d[i].capitalize();
                }
            }
            str_arr[x] = d.join('-');
        }
        str = str_arr.join(' ');
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    };
}

/*
  This function adds demodulize support to every String object
    Signature:
      String.demodulize() == String
    Arguments:
      N/A
    Returns:
      String - removes module names leaving only class names (Ruby style)
    Examples:
      "Message::Bus::Properties".demodulize() == "Properties"
*/
if (!String.prototype.demodulize)
{
    String.prototype.demodulize = function()
    {
        var str = this;
        var str_arr = str.split('::');
        str = str_arr[str_arr.length - 1];
        return str;
    };
}

/*
  This function adds tableize support to every String object
    Signature:
      String.tableize() == String
    Arguments:
      N/A
    Returns:
      String - renders camel cased words into their underscored plural form
    Examples:
      "MessageBusProperty".tableize() == "message_bus_properties"
*/
if (!String.prototype.tableize)
{
    String.prototype.tableize = function()
    {
        var str = this;
        str = str.underscore().pluralize();
        return str;
    };
}

/*
  This function adds classification support to every String object
    Signature:
      String.classify() == String
    Arguments:
      N/A
    Returns:
      String - underscored plural nouns become the camel cased singular form
    Examples:
      "message_bus_properties".classify() == "MessageBusProperty"
*/
if (!String.prototype.classify)
{
    String.prototype.classify = function()
    {
        var str = this;
        str = str.camelize().singularize();
        return str;
    };
}

/*
  This function adds foreign key support to every String object
    Signature:
      String.foreign_key(dropIdUbar) == String
    Arguments:
      dropIdUbar - boolean (optional) - default is to seperate id with an
        underbar at the end of the class name, you can pass true to skip it
    Returns:
      String - camel cased singular class names become underscored with id
    Examples:
      "MessageBusProperty".foreign_key() == "message_bus_property_id"
      "MessageBusProperty".foreign_key(true) == "message_bus_propertyid"
*/
if (!String.prototype.foreign_key)
{
    String.prototype.foreign_key = function(dropIdUbar)
    {
        var str = this;
        str = str.demodulize().underscore() + ((dropIdUbar) ? ('') : ('_')) + 'id';
        return str;
    };
}

/*
  This function adds ordinalize support to every String object
    Signature:
      String.ordinalize() == String
    Arguments:
      N/A
    Returns:
      String - renders all found numbers their sequence like "22nd"
    Examples:
      "the 1 pitch".ordinalize() == "the 1st pitch"
*/
if (!String.prototype.ordinalize)
{
    String.prototype.ordinalize = function()
    {
        var str = this;
        var str_arr = str.split(' ');
        for (var x = 0; x < str_arr.length; x++)
        {
            var i = parseInt(str_arr[x]);
            if (i === NaN)
            {
                var ltd = str_arr[x].substring(str_arr[x].length - 2);
                var ld = str_arr[x].substring(str_arr[x].length - 1);
                var suf = "th";
                if (ltd != "11" && ltd != "12" && ltd != "13")
                {
                    if (ld === "1")
                    {
                        suf = "st";
                    }
                    else if (ld === "2")
                    {
                        suf = "nd";
                    }
                    else if (ld === "3")
                    {
                        suf = "rd";
                    }
                }
                str_arr[x] += suf;
            }
        }
        str = str_arr.join(' ');
        return str;
    };
}
var Model = function(name, options) {
  var class_methods, instance_methods, attributes, belongs_to;
  var has_one, has_many, has_and_belongs_to_many, model, validation_rules;

  options                 = options                                                 || {};
  class_methods           = options.class_methods                                   || {};
  instance_methods        = options.instance_methods                                || {};
  attributes              = options.attributes                                      || [];
  belongs_to              = Model.Options.parse( options.belongs_to )               || {};
  has_one                 = Model.Options.parse( options.has_one )                  || {};
  has_many                = Model.Options.parse( options.has_many )                 || {};
  has_and_belongs_to_many = Model.Options.parse( options.has_and_belongs_to_many )  || {};

  validation_rules = {};
  if (options.validates_uniqueness_of) {
    validation_rules.uniqueness_of = options.validates_uniqueness_of;
  }
  if (options.validates_presence_of) {
    validation_rules.presence_of = options.validates_presence_of;
  }

  model = function(attributes, options){
    var self, key;

    self = this;

    options                 = options           || {};
    options.skip_save       = options.skip_save || false;
    attributes              = attributes        || {};
    this.attrs              = {}; // model attributes object
    this.errors             = []; // validation errors array
    this.state              = 'new';
    this.changed_attributes = {}; // keep track of change attributes

    $.each(this.constructor.attributes, function(i,v){
      if(typeof attributes[v] == 'undefined'){
        attributes[v] = undefined;
      }
    });

    for(key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this.add_getter_setter(key);
      }
    }

    $.each(this.constructor.belongs_to, function(name, options){
      self.add_belongs_to(name, options);
    });

    $.each(this.constructor.has_one, function(name, options){
      self.add_has_one(name, options);
    });

    $.each(this.constructor.has_many, function(name, options){
      self.add_has_many(name, options);
    });

    $.each(this.constructor.has_and_belongs_to_many, function(k,v){
      self.add_has_and_belongs_to_many(k);
    });

    if(this.constructor.define_getters_setters){
      this.constructor.define_getters_setters(this);
    }

    this.attrs.id = this.constructor.next_id();

    for(key in attributes){
      if(attributes.hasOwnProperty(key)) {
        this["set_"+key](attributes[key]);
      }
    }

    if(!options.skip_save){ this.save(); }
  };

  model.model_name = name;

  jQuery.extend(model,
                Model.Events,
                Model.ClassMethods,
                Model.Reflections,
                class_methods,
                { storage:                  {},
                  validate:                 {},
                  attributes:               attributes,
                  belongs_to:               belongs_to,
                  has_one:                  has_one,
                  has_many:                 has_many,
                  has_and_belongs_to_many:  has_and_belongs_to_many,
                  events:                   {},
                  _model_items:             [],
                  _reflections:             []
                }
  );

  jQuery.extend(model.storage,  Model.Storage     );
  jQuery.extend(model.validate, Model.Validations );

  jQuery.extend(model.prototype,
                Model.InstanceMethods,
                Model.Associations,
                Model.Dirty,
                instance_methods);

  model.validate.set_rules(validation_rules);

  model.add_reflections_for_self();

  model.storage.initialize(options.storage || Model.Storage.Default);

  Model._add(model, name);

  return model;
};

Model.find_by_name = function(name){
  return Model._models[name];
};

Model._models = {};

Model._add = function(obj, name){
  Model._models[name] = obj;
};

Model._remove = function(name){
  Model._models[name] = undefined;
};
/*global Model: false */

Model.Associations = {

  add_belongs_to: function(name, options) {
    var associated_model, class_name, foreign_key;

    options     = options             || {};
    class_name  = options.class_name  || name.singularize();
    foreign_key = options.foreign_key || name + '_id';

    associated_model = Model.find_by_name(class_name);

    this['get_'+name] = function(){
      return associated_model.find({ id: this.attrs[foreign_key] })[0] || undefined;
    };
    this['get_'+name+'_id'] = function(){
      return this.attrs[foreign_key];
    };
    this['set_'+name] = function(model){
      if(this.attrs[foreign_key] != model.id()){
        this.will_change(name+'_id');
      }
      this.attrs[foreign_key] = model.id();
    };
    this['set_'+name+'_id'] = function(v){
      if(this.attrs[foreign_key] != v){
        this.will_change(name+'_id');
      }
      this.attrs[foreign_key] = v;
    };
  },

  add_has_one: function(name, options) {
    var associated_model, class_name, foreign_key;

    options     = options             || {};
    class_name  = options.class_name  || name;
    foreign_key = options.foreign_key || this.model_name() + '_id';

    associated_model = Model.find_by_name(class_name);

    this['get_'+name] = function(){
      var obj;

      obj = {};
      obj[foreign_key] = this.id();
      return associated_model.find(obj)[0];
    };
    this['set_'+name] = function(model){
      var association;

      association = this['get_'+name]();
      if(association){
        association['set_' + foreign_key](undefined);
      }
      if(model !== undefined){
        model['set_' + foreign_key](this.id());
      }
    };
  },

  add_has_many: function(name, options) {
    var self, associated_model, class_name, foreign_key;

    options     = options             || {};
    class_name  = options.class_name  || name.singularize();
    foreign_key = options.foreign_key || this.model_name() + '_id';

    self = this;
    associated_model = Model.find_by_name(class_name);

    this['get_'+name] = function(){
      var obj;
      obj = {};
      obj[foreign_key] = this.id();
      return associated_model.find(obj);
    };
    this['set_'+name] = function(models){
      var obj;
      obj = {};
      obj[foreign_key] = this.id();
      $.each(associated_model.find(obj), function(i,model){
        model['set_' + foreign_key](undefined);
      });
      this['add_'+name](models);
    };
    this['add_'+name] = function(models){
      $.each(models, function(i,model){
        model['set_' + foreign_key](self.id());
      });
    };
    this['remove_'+name] = function(models){
      $.each(models, function(i,model){
        model['set_' + foreign_key](undefined);
      });
    };
  },

  add_has_and_belongs_to_many: function(name){
    var self;

    self = this;
    this.attrs[name+'_ids'] = [];

    this['get_'+name] = function(){
      return $.map(this.attrs[name+'_ids'], function(id,i){ return Model.find_by_name(name.singularize()).find({ id: id })[0]; });
    };
    this['get_'+name+'_ids'] = function(){
      return this.attrs[name+'_ids'];
    };
    this['set_'+name] = function(models){
      var new_ids, obj;

      new_ids = $.map(models, function(model,i){ return model.id(); });
      if(this.attrs[name+'_ids'] != new_ids){
        this.will_change(name+'_ids');
      }
      this.attrs[name+'_ids'] = new_ids;

      obj = {};
      obj[this.model_name().pluralize()+'_ids'] = function(r){ return $.inArray(self.id(), r) > -1; };
      $.each(Model.find_by_name(name.singularize()).find(obj), function(i,model){
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
      $.each(models, function(i,model){
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['set_'+name+'_ids'] = function(ids){
      if(this.attrs[name+'_ids'] != ids){
        this.will_change(name+'_ids');
      }
      this.attrs[name+'_ids'] = ids;
    };
    this['add_'+name] = function(models){
      $.each(models, function(i,model){
        if($.inArray(model.id(), self.attrs[name+'_ids']) < 0){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].push(model.id());
        }
        model['add_'+self.model_name().pluralize()+'_id'](self.id());
      });
    };
    this['add_'+name+'_id'] = function(id){
      if($.inArray(id, self.attrs[name+'_ids']) < 0){
        this.will_change(name+'_ids');
        this.attrs[name+'_ids'].push(id);
      }
    };
    this['remove_'+name] = function(models){
      $.each(models, function(i,model){
        var pos;

        pos = $.inArray(model.id(), self.attrs[name+'_ids']);
        if(pos > -1){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].splice(pos,1);
        }
        model['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
      });
    };
    this['remove_'+name+'_ids'] = function(ids){
      $.each(ids, function(i,id){
        var pos;

        pos = $.inArray(id, self.attrs[name+'_ids']);
        if(pos > -1){
          self.will_change(name+'_ids');
          self.attrs[name+'_ids'].splice(pos,1);
        }
      });
    };
  },

  save_associated_records: function(dirty_attributes){
    var self;

    self = this;
    this.with_each_reflection(function(type, key){
      switch(type){
        case "has_many":
        case "has_and_belongs_to_many":
          $.each(self['get_'+key](), function(i,r){
            if(r.changed()){
              r.save();
            }
          });
          $.each(dirty_attributes, function(k,v){
            if(key+'_ids' == k){
              $.each(v.old, function(i,id){
                $.each(Model.find_by_name(key.singularize()).find({ id: id }), function(i,r){
                  if(r.changed()){
                    r.save();
                  }
                });
              });
            }
          });
          break;
      }
    });
  },

  with_each_reflection: function(block){
    var self;

    self = this;
    $.each(this.reflections(), function(i,r){
      $.each(r, function(k,v){
        block(k,v);
      });
    });
  },

  remove_associtions: function(){
    var self;

    self = this;
    $.each(this.reflections(), function(i,r){
      $.each(r, function(k,v){
        switch(k){
          case "has_many":
            $.each(self['get_'+v](), function(i,r){
              r['set_'+self.model_name()+'_id'](undefined);
            });
            break;

          case "has_one":
            var r = self['get_'+v]();
            r['set_'+self.model_name()+'_id'](undefined);
            break;

          case "has_and_belongs_to_many":
            $.each(self['get_'+v](), function(i,r){
              r['remove_'+self.model_name().pluralize()+'_ids']([self.id()]);
            });
            break;
        }
      });
    });
  },

  reflections: function(){
    return Model.find_by_name(this.model_name()).reflections();
  },

  model_name: function(){
    return this.constructor.model_name;
  }

};
/*global Model: false */

Model.ClassMethods = {

  all: function() {
    return this._model_items;
  },

  find: function(options) {
    var self;

    self = this;
    return $.grep(this._model_items, function(item, i){
      var options_has_properties, k;

      options_has_properties = false;
      for(k in options){
        options_has_properties = true;
        if(self.is_function(options[k])){
          if(typeof item.attrs[k] != 'undefined'){
            return options[k](item.attrs[k]);
          }else{
            return false;
          }
        }else{
          if(item.attrs[k] != options[k]){
            return false;
          }
        }
      }
      return options_has_properties ? true : false;
    });
  },

  is_function: function(o) {
    return typeof o == 'function' || Object.prototype.toString.call(o) == '[object Function]' ? true : false;
	},

  first: function(){
    return this._model_items[0];
  },

  add: function(model) {
    if(model.valid({ 'skip_callbacks': true })){
      if(model.state == 'new'){ this._model_items.push(model); }
      this.write_to_store();
      model.state = 'saved';
    }
  },

  next_id: function(){
    var id;

    id = -1;
    $.each(this._model_items, function(i,o){ if(o.id() > id){ id = o.id(); }});
    return id+1;
  },

  reset: function() {
    this._model_items  = [];
    this._refelections = [];
    this.write_to_store();
  },

  load: function() {
    var self, items;

    this._model_items = [];

    self = this;
    if (this.storage.contains(this.model_name)) {
      items = this.storage.getItem(this.model_name);
      $.each(items, function(i, item) {
        var model;

        model = new self(item, { skip_save: true });
        self._model_items.push(model);
        model.state = 'saved';
        self.trigger('after_load', [model]);
      });
    } else {
      this.reset();
    }
  },

  write_to_store: function() {
    this.storage.setItem(
      this.model_name,
      $.map(
        this._model_items,
        function(o){
          if(o.valid({ 'skip_callbacks': true })){
            return o.flatten();
          }
        }
      )
    );
  }

};
/*global Model: false */

Model.Dirty = {

  will_change: function(key){
    var value;

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
/*global Model: false */

Model.Events = {

  bind: function(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
    return this;
  },

  trigger: function(name, data) {
    var events, i;

    events = this.events[name];

    if (events) {
      for (i = 0; i < events.length; i++) {
        events[i].apply(this, data || []);
      }
    }

    return this;
  },

  unbind: function(event, callback) {
    var events, i;

    if (callback) {
      events = this.events[event] || [];

      for (i = 0; i < events.length; i++) {
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
/*global Model: false */

Model.InstanceMethods = {

  id: function(){
    if(this.attrs.id === undefined){
      return -1;
    }else{
      return this.attrs.id;
    }
  },

  add_getter_setter: function(k) {
    this["get_"+k] = function(){ return this.attrs[k]; };
    this["set_"+k] = function(v){
      if(this.attrs[k] != v){
        this.will_change(k);
      }
      this.attrs[k] = v;
    };
  },

  valid: function(options) {
    options = options || {};
    if(!options.skip_callbacks){ this.constructor.trigger('before_validation', [this]); }
    this.errors = [];
    if(this.constructor.validations){
      this.constructor.validations(this, this.attrs);
    }
    this.constructor.validate.validate_rules(this);
    var result = this.errors.length < 1;
    if(result && !options.skip_callbacks){ this.constructor.trigger('after_validation', [this]); }
    return result;
  },

  remove: function() {
    var self, deleted_item;

    this.constructor.trigger('before_remove', [this]);
    self = this;
    $.each(this.constructor._model_items, function(i, item){
      if(item.id() == self.id()){
        deleted_item = self.constructor._model_items.splice(i, 1);
        return false;
      }
    });
    this.constructor.write_to_store();
    this.remove_associtions();
    this.constructor.trigger('after_remove', [deleted_item[0]]);
    return deleted_item[0];
  },

  update: function(attrs) {
    var updated, key, current_value;
    for(key in attrs){
      if (attrs.hasOwnProperty(key)) {
        current_value = this.attrs[key];
        if(current_value != attrs[key]){
          this["set_"+key](attrs[key]);
        }
      }
    }
    if(this.changed()){ return this.save(); }
    return true;
  },

  save: function() {
    var dirty_attributes;

    if(this.valid()) {
      var create = this.state == 'new';

      this.constructor.trigger('before_save', [this]);
      if(create){ // new record
        this.constructor.trigger('before_create', [this]);
      }else{ // updating an existing record
        this.constructor.trigger('before_update', [this]);
      }

      this.constructor.add(this);
      dirty_attributes = this.clear_dirty();
      this.save_associated_records(dirty_attributes);

      if(create){ // new record
        this.constructor.trigger('after_create', [this]);
      }else{ // updating an existing record
        this.constructor.trigger('after_update', [this]);
      }
      this.constructor.trigger('after_save', [this]);

      return true;
    }else{
      return false;
    }
  },

  flatten: function() {
    var attrs;

    attrs = $.extend({}, this.attrs);
    return attrs;
  }

};
/*global Model: false */

Model.Options = {

  parse: function(options){
    var obj;
    if (typeof options == 'string') {
      obj           = {};
      obj[options]  = {};
      options       = obj;
    }

    if ($.isArray(options)) {
      obj = {};
      $.each(options, function(i,v){
        obj[v] = {};
      });
      options = obj;
    }

    return options;
  }

};
/*global Model: false */

Model.Reflections = {

  add_reflections_for_self: function(){
    var self;

    self = this;
    $.each({ has_one: this.has_one, has_many: this.has_many, belongs_to: this.belongs_to, has_and_belongs_to_many: this.has_and_belongs_to_many }, function(key,association){
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
/*global Model: false */

Model.Storage = {

  initialize: function(engines){
    var engines_tried, self;
    engines_tried = [];
    self = this;
    if(!$.isArray(engines)){
      engines = [engines];
    }
    $.each(engines, function(i,engine){
      if(engine.supported()){
        self.engine = engine;
        return false;
      }else{
        engines_tried.push(engine.description);
      }
    });
    if(this.engine === null){
      console.error("No supported engine found, tried: " + engines_tried.join(', '));
    }
  },

  supported: function() {
    return this.engine.supported();
  },

  getItem: function(key) {
    return this.engine.getItem(key);
  },

  setItem: function(key, value) {
    return this.engine.setItem(key, value);
  },

  removeItem: function(key) {
    return this.engine.removeObject(key);
  },

  contains: function(key) {
    return this.engine.contains(key);
  },

  count: function() {
    return this.engine.count();
  },

  clear: function() {
    return this.engine.clear();
  }

};
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
/*global Model: false, sessionStorage: false */


Model.Storage.Session = {

  description: 'session storage',

  supported: function() {
    try {
      return !!window.sessionStorage.getItem;
    } catch(e){
      return false;
    }
  },

  getItem: function (key) {
    if (this.contains(key)) {
      return JSON.parse(this._get(key), this._reviver);
    } else {
      return null;
    }
  },

  setItem: function (key, value) {
    sessionStorage.removeItem(key); // Added in to try and fix support on the iPad
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: function (key) {
    sessionStorage.removeItem(key);
  },

  contains: function (key) {
    var contains_key, k;
    contains_key = false;
    for (k = 0; k < sessionStorage.length; k++) {
      if (this._key(k) == key) {
        contains_key = true;
        break;
      }
    }
    return contains_key;
  },

  count: function() {
    return sessionStorage.length;
  },

  clear: function () {
    var len, keys, i, k, self;
    if(typeof sessionStorage.clear != "undefined"){
      sessionStorage.clear();
    }else{ // FF 3.0 doesn't support the clear method so we need to impliment it
      len = sessionStorage.length;
      keys = [];
      for(i=0;i<len;i++){
        keys.push(sessionStorage.key(i));
      }
      $.each(keys, function(i, key){
        sessionStorage.removeItem(key);
      });
    }
  },


  _key: function (index) {
    if (index >= sessionStorage.length) {
      return null;
    } else {
      return sessionStorage.key(index);
    }
  },

  _get: function (key) {
    var item;
    item = sessionStorage.getItem(key);
    if(item === null){
      return item;
    }else if(typeof item.value == 'undefined'){ // FF 3.0 impliments .value
      return item;
    } else {
      return item.value;
    }
  },


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
/*global Model: false */

Model.Validations = {

  set_rules: function(rules){
    this.rules = rules;
  },

  validate_rules: function(model){
    var self = this;
    $.each(this.rules, function(rule, options){
      options = Model.Options.parse( options );
      $.each(options, function(attribute, conditions){
        self[rule](model, attribute, model.attrs[attribute], conditions);
      });
    });
  },

  presence_of: function(model, attribute, value, conditions){
    var error_message;
    if(this.satisfy_contitions(model, conditions)){
      if(typeof value == 'undefined'){
        this.add_error(model, attribute, 'is required');
      } else if(value === ''){
        this.add_error(model, attribute, 'cannot be blank');
      }
    }
  },

  uniqueness_of: function(model, attribute, value, conditions){
    var query, records, error_message;
    if(this.satisfy_contitions(model, conditions)){
      query             = {};
      query[attribute]  = value;
      records = model.constructor.find(query);
      if(records.length > 0){
        if($.grep(records, function(o){ return o != model; }).length > 0){
          this.add_error(model, attribute, 'must be unique');
        }
      }
    }
  },

  satisfy_contitions:function(model, conditions){
    var satisfied = true;
    if (conditions.when && satisfied) {
      satisfied = conditions.when(model);
    }
    if (conditions.unless && satisfied) {
      satisfied = !conditions.unless(model);
    }
    return satisfied;
  },

  add_error: function(model, attribute, message){
    var error_message = {};
    error_message[attribute] = message;
    model.errors.push(error_message);
  }

};
