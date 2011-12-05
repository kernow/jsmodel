if(window&&!window.InflectionJS)window.InflectionJS=null;
InflectionJS={uncountable_words:["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"],plural_rules:[[new RegExp("(m)an$","gi"),"$1en"],[new RegExp("(pe)rson$","gi"),"$1ople"],[new RegExp("(child)$","gi"),"$1ren"],[new RegExp("^(ox)$","gi"),"$1en"],[new RegExp("(ax|test)is$","gi"),"$1es"],[new RegExp("(octop|vir)us$","gi"),"$1i"],[new RegExp("(alias|status)$","gi"),"$1es"],[new RegExp("(bu)s$","gi"),"$1ses"],[new RegExp("(buffal|tomat|potat)o$","gi"),"$1oes"],
[new RegExp("([ti])um$","gi"),"$1a"],[new RegExp("sis$","gi"),"ses"],[new RegExp("(?:([^f])fe|([lr])f)$","gi"),"$1$2ves"],[new RegExp("(hive)$","gi"),"$1s"],[new RegExp("([^aeiouy]|qu)y$","gi"),"$1ies"],[new RegExp("(x|ch|ss|sh)$","gi"),"$1es"],[new RegExp("(matr|vert|ind)ix|ex$","gi"),"$1ices"],[new RegExp("([m|l])ouse$","gi"),"$1ice"],[new RegExp("(quiz)$","gi"),"$1zes"],[new RegExp("s$","gi"),"s"],[new RegExp("$","gi"),"s"]],singular_rules:[[new RegExp("(m)en$","gi"),"$1an"],[new RegExp("(pe)ople$",
"gi"),"$1rson"],[new RegExp("(child)ren$","gi"),"$1"],[new RegExp("([ti])a$","gi"),"$1um"],[new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"),"$1$2sis"],[new RegExp("(hive)s$","gi"),"$1"],[new RegExp("(tive)s$","gi"),"$1"],[new RegExp("(curve)s$","gi"),"$1"],[new RegExp("([lr])ves$","gi"),"$1f"],[new RegExp("([^fo])ves$","gi"),"$1fe"],[new RegExp("([^aeiouy]|qu)ies$","gi"),"$1y"],[new RegExp("(s)eries$","gi"),"$1eries"],[new RegExp("(m)ovies$","gi"),"$1ovie"],[new RegExp("(x|ch|ss|sh)es$",
"gi"),"$1"],[new RegExp("([m|l])ice$","gi"),"$1ouse"],[new RegExp("(bus)es$","gi"),"$1"],[new RegExp("(o)es$","gi"),"$1"],[new RegExp("(shoe)s$","gi"),"$1"],[new RegExp("(cris|ax|test)es$","gi"),"$1is"],[new RegExp("(octop|vir)i$","gi"),"$1us"],[new RegExp("(alias|status)es$","gi"),"$1"],[new RegExp("^(ox)en","gi"),"$1"],[new RegExp("(vert|ind)ices$","gi"),"$1ex"],[new RegExp("(matr)ices$","gi"),"$1ix"],[new RegExp("(quiz)zes$","gi"),"$1"],[new RegExp("s$","gi"),""]],non_titlecased_words:["and","or",
"nor","a","an","the","so","but","to","of","at","by","from","into","on","onto","off","out","in","over","with","for"],id_suffix:new RegExp("(_ids|_id)$","g"),underbar:new RegExp("_","g"),space_or_underbar:new RegExp("[ _]","g"),uppercase:new RegExp("([A-Z])","g"),underbar_prefix:/^_/,apply_rules:function(a,b,c,d){if(d)a=d;else if(!(c.indexOf(a.toLowerCase())>-1))for(c=0;c<b.length;c++)if(a.match(b[c][0])){a=a.replace(b[c][0],b[c][1]);break}return a}};
if(!Array.prototype.indexOf)Array.prototype.indexOf=function(a,b,c){b||(b=-1);var d=-1;for(b=b;b<this.length;b++)if(this[b]===a||c&&c(this[b],a)){d=b;break}return d};if(!String.prototype._uncountable_words)String.prototype._uncountable_words=InflectionJS.uncountable_words;if(!String.prototype._plural_rules)String.prototype._plural_rules=InflectionJS.plural_rules;if(!String.prototype._singular_rules)String.prototype._singular_rules=InflectionJS.singular_rules;
if(!String.prototype._non_titlecased_words)String.prototype._non_titlecased_words=InflectionJS.non_titlecased_words;if(!String.prototype.pluralize)String.prototype.pluralize=function(a){return InflectionJS.apply_rules(this,this._plural_rules,this._uncountable_words,a)};if(!String.prototype.singularize)String.prototype.singularize=function(a){return InflectionJS.apply_rules(this,this._singular_rules,this._uncountable_words,a)};
if(!String.prototype.camelize)String.prototype.camelize=function(a){var b=this.toLowerCase();b=b.split("/");for(var c=0;c<b.length;c++){for(var d=b[c].split("_"),e=a&&c+1===b.length?1:0;e<d.length;e++)d[e]=d[e].charAt(0).toUpperCase()+d[e].substring(1);b[c]=d.join("")}return b=b.join("::")};
if(!String.prototype.underscore)String.prototype.underscore=function(){var a=this;a=a.split("::");for(var b=0;b<a.length;b++){a[b]=a[b].replace(InflectionJS.uppercase,"_$1");a[b]=a[b].replace(InflectionJS.underbar_prefix,"")}return a=a.join("/").toLowerCase()};if(!String.prototype.humanize)String.prototype.humanize=function(a){var b=this.toLowerCase();b=b.replace(InflectionJS.id_suffix,"");b=b.replace(InflectionJS.underbar," ");a||(b=b.capitalize());return b};
if(!String.prototype.capitalize)String.prototype.capitalize=function(){var a=this.toLowerCase();return a=a.substring(0,1).toUpperCase()+a.substring(1)};if(!String.prototype.dasherize)String.prototype.dasherize=function(){var a=this;return a=a.replace(InflectionJS.space_or_underbar,"-")};
if(!String.prototype.titleize)String.prototype.titleize=function(){var a=this.toLowerCase();a=a.replace(InflectionJS.underbar," ");a=a.split(" ");for(var b=0;b<a.length;b++){for(var c=a[b].split("-"),d=0;d<c.length;d++)if(this._non_titlecased_words.indexOf(c[d].toLowerCase())<0)c[d]=c[d].capitalize();a[b]=c.join("-")}a=a.join(" ");return a=a.substring(0,1).toUpperCase()+a.substring(1)};
if(!String.prototype.demodulize)String.prototype.demodulize=function(){var a=this;a=a.split("::");return a=a[a.length-1]};if(!String.prototype.tableize)String.prototype.tableize=function(){var a=this;return a=a.underscore().pluralize()};if(!String.prototype.classify)String.prototype.classify=function(){var a=this;return a=a.camelize().singularize()};if(!String.prototype.foreign_key)String.prototype.foreign_key=function(a){var b=this;return b=b.demodulize().underscore()+(a?"":"_")+"id"};
if(!String.prototype.ordinalize)String.prototype.ordinalize=function(){var a=this;a=a.split(" ");for(var b=0;b<a.length;b++)if(parseInt(a[b])===NaN){var c=a[b].substring(a[b].length-2),d=a[b].substring(a[b].length-1),e="th";if(c!="11"&&c!="12"&&c!="13")if(d==="1")e="st";else if(d==="2")e="nd";else if(d==="3")e="rd";a[b]+=e}return a=a.join(" ")};
var Model=function(a,b){var c,d,e,f,g,i,k,h,q;b=b||{};c=b.class_methods||{};d=b.instance_methods||{};e=b.attributes||[];f=Model.Options.parse(b.belongs_to)||{};g=Model.Options.parse(b.has_one)||{};i=Model.Options.parse(b.has_many)||{};k=Model.Options.parse(b.has_and_belongs_to_many)||{};q={};if(b.validates_uniqueness_of)q.uniqueness_of=b.validates_uniqueness_of;if(b.validates_presence_of)q.presence_of=b.validates_presence_of;h=function(j,o){var p,n;p=this;o=o||{};o.skip_save=o.skip_save||false;j=
j||{};this.attrs={};this.errors=[];this.state="new";this.changed_attributes={};$.each(this.constructor.attributes,function(l,m){if(typeof j[m]=="undefined")j[m]=undefined});for(n in j)j.hasOwnProperty(n)&&this.add_getter_setter(n);$.each(this.constructor.belongs_to,function(l,m){p.add_belongs_to(l,m)});$.each(this.constructor.has_one,function(l,m){p.add_has_one(l,m)});$.each(this.constructor.has_many,function(l,m){p.add_has_many(l,m)});$.each(this.constructor.has_and_belongs_to_many,function(l){p.add_has_and_belongs_to_many(l)});
this.constructor.define_getters_setters&&this.constructor.define_getters_setters(this);this.attrs.id=this.constructor.next_id();for(n in j)j.hasOwnProperty(n)&&this["set_"+n](j[n]);o.skip_save||this.save()};h.model_name=a;jQuery.extend(h,Model.Events,Model.ClassMethods,Model.Reflections,c,{storage:{},validate:{},attributes:e,belongs_to:f,has_one:g,has_many:i,has_and_belongs_to_many:k,events:{},_model_items:[],_reflections:[]});jQuery.extend(h.storage,Model.Storage);jQuery.extend(h.validate,Model.Validations);
jQuery.extend(h.prototype,Model.InstanceMethods,Model.Associations,Model.Dirty,d);h.validate.set_rules(q);h.add_reflections_for_self();h.storage.initialize(b.storage||Model.Storage.Default);Model._add(h,a);return h};Model.find_by_name=function(a){return Model._models[a]};Model._models={};Model._add=function(a,b){Model._models[b]=a};Model._remove=function(a){Model._models[a]=undefined};
Model.Associations={add_belongs_to:function(a,b){var c,d,e;b=b||{};d=b.class_name||a.singularize();e=b.foreign_key||a+"_id";c=Model.find_by_name(d);this["get_"+a]=function(){return c.find({id:this.attrs[e]})[0]||undefined};this["get_"+a+"_id"]=function(){return this.attrs[e]};this["set_"+a]=function(f){this.attrs[e]!=f.id()&&this.will_change(a+"_id");this.attrs[e]=f.id()};this["set_"+a+"_id"]=function(f){this.attrs[e]!=f&&this.will_change(a+"_id");this.attrs[e]=f}},add_has_one:function(a,b){var c,
d,e;b=b||{};d=b.class_name||a;e=b.foreign_key||this.model_name()+"_id";c=Model.find_by_name(d);this["get_"+a]=function(){var f;f={};f[e]=this.id();return c.find(f)[0]};this["set_"+a]=function(f){var g;(g=this["get_"+a]())&&g["set_"+e](undefined);f!==undefined&&f["set_"+e](this.id())}},add_has_many:function(a,b){var c,d,e,f;b=b||{};e=b.class_name||a.singularize();f=b.foreign_key||this.model_name()+"_id";c=this;d=Model.find_by_name(e);this["get_"+a]=function(){var g;g={};g[f]=this.id();return d.find(g)};
this["set_"+a]=function(g){var i;i={};i[f]=this.id();$.each(d.find(i),function(k,h){h["set_"+f](undefined)});this["add_"+a](g)};this["add_"+a]=function(g){$.each(g,function(i,k){k["set_"+f](c.id())})};this["remove_"+a]=function(g){$.each(g,function(i,k){k["set_"+f](undefined)})}},add_has_and_belongs_to_many:function(a){var b;b=this;this.attrs[a+"_ids"]=[];this["get_"+a]=function(){return $.map(this.attrs[a+"_ids"],function(c){return Model.find_by_name(a.singularize()).find({id:c})[0]})};this["get_"+
a+"_ids"]=function(){return this.attrs[a+"_ids"]};this["set_"+a]=function(c){var d;d=$.map(c,function(e){return e.id()});this.attrs[a+"_ids"]!=d&&this.will_change(a+"_ids");this.attrs[a+"_ids"]=d;d={};d[this.model_name().pluralize()+"_ids"]=function(e){return $.inArray(b.id(),e)>-1};$.each(Model.find_by_name(a.singularize()).find(d),function(e,f){f["remove_"+b.model_name().pluralize()+"_ids"]([b.id()])});$.each(c,function(e,f){f["add_"+b.model_name().pluralize()+"_id"](b.id())})};this["set_"+a+"_ids"]=
function(c){this.attrs[a+"_ids"]!=c&&this.will_change(a+"_ids");this.attrs[a+"_ids"]=c};this["add_"+a]=function(c){$.each(c,function(d,e){if($.inArray(e.id(),b.attrs[a+"_ids"])<0){b.will_change(a+"_ids");b.attrs[a+"_ids"].push(e.id())}e["add_"+b.model_name().pluralize()+"_id"](b.id())})};this["add_"+a+"_id"]=function(c){if($.inArray(c,b.attrs[a+"_ids"])<0){this.will_change(a+"_ids");this.attrs[a+"_ids"].push(c)}};this["remove_"+a]=function(c){$.each(c,function(d,e){d=$.inArray(e.id(),b.attrs[a+"_ids"]);
if(d>-1){b.will_change(a+"_ids");b.attrs[a+"_ids"].splice(d,1)}e["remove_"+b.model_name().pluralize()+"_ids"]([b.id()])})};this["remove_"+a+"_ids"]=function(c){$.each(c,function(d,e){d=$.inArray(e,b.attrs[a+"_ids"]);if(d>-1){b.will_change(a+"_ids");b.attrs[a+"_ids"].splice(d,1)}})}},save_associated_records:function(a){var b;b=this;this.with_each_reflection(function(c,d){switch(c){case "has_many":case "has_and_belongs_to_many":$.each(b["get_"+d](),function(e,f){f.changed()&&f.save()});$.each(a,function(e,
f){d+"_ids"==e&&$.each(f.old,function(g,i){$.each(Model.find_by_name(d.singularize()).find({id:i}),function(k,h){h.changed()&&h.save()})})});break}})},with_each_reflection:function(a){$.each(this.reflections(),function(b,c){$.each(c,function(d,e){a(d,e)})})},remove_associtions:function(){var a;a=this;$.each(this.reflections(),function(b,c){$.each(c,function(d,e){switch(d){case "has_many":$.each(a["get_"+e](),function(f,g){g["set_"+a.model_name()+"_id"](undefined)});break;case "has_one":a["get_"+e]()["set_"+
a.model_name()+"_id"](undefined);break;case "has_and_belongs_to_many":$.each(a["get_"+e](),function(f,g){g["remove_"+a.model_name().pluralize()+"_ids"]([a.id()])});break}})})},reflections:function(){return Model.find_by_name(this.model_name()).reflections()},model_name:function(){return this.constructor.model_name}};
Model.ClassMethods={all:function(){return this._model_items},find:function(a){var b;b=this;return $.grep(this._model_items,function(c){var d,e;d=false;for(e in a){d=true;if(b.is_function(a[e]))return typeof c.attrs[e]!="undefined"?a[e](c.attrs[e]):false;else if(c.attrs[e]!=a[e])return false}return d?true:false})},is_function:function(a){return typeof a=="function"||Object.prototype.toString.call(a)=="[object Function]"?true:false},first:function(){return this._model_items[0]},add:function(a){if(a.valid({skip_callbacks:true})){a.state==
"new"&&this._model_items.push(a);this.write_to_store();a.state="saved"}},next_id:function(){var a;a=-1;$.each(this._model_items,function(b,c){if(c.id()>a)a=c.id()});return a+1},reset:function(){this._model_items=[];this._refelections=[];this.write_to_store()},load:function(){var a,b;this._model_items=[];a=this;if(this.storage.contains(this.model_name)){b=this.storage.getItem(this.model_name);$.each(b,function(c,d){c=new a(d,{skip_save:true});a._model_items.push(c);c.state="saved";a.trigger("after_load",
[c])})}else this.reset()},write_to_store:function(){this.storage.setItem(this.model_name,$.map(this._model_items,function(a){if(a.valid({skip_callbacks:true}))return a.flatten()}))}};
Model.Dirty={will_change:function(a){var b;b=$.isArray(this.attrs[a])?$.extend([],this.attrs[a]):this.attrs[a];this.changed_attributes[a]={old:b}},changed:function(){return this.changed_attributes_count()>0},has_changed:function(a){return this.changed_attributes[a]!==undefined},changed_attributes_count:function(){var a,b;a=0;for(b in this.changed_attributes)this.changed_attributes.hasOwnProperty(b)&&++a;return a},clear_dirty:function(){var a=this.changed_attributes;this.changed_attributes={};return a}};
Model.Events={bind:function(a,b){this.events[a]=this.events[a]||[];this.events[a].push(b);return this},trigger:function(a,b){var c;if(a=this.events[a])for(c=0;c<a.length;c++)a[c].apply(this,b||[]);return this},unbind:function(a,b){var c,d;if(b){c=this.events[a]||[];for(d=0;d<c.length;d++)c[d]===b&&this.events[a].splice(d,1)}else delete this.events[a];return this}};
Model.InstanceMethods={id:function(){return this.attrs.id===undefined?-1:this.attrs.id},add_getter_setter:function(a){this["get_"+a]=function(){return this.attrs[a]};this["set_"+a]=function(b){this.attrs[a]!=b&&this.will_change(a);this.attrs[a]=b}},valid:function(a){a=a||{};a.skip_callbacks||this.constructor.trigger("before_validation",[this]);this.errors=[];this.constructor.validations&&this.constructor.validations(this,this.attrs);this.constructor.validate.validate_rules(this);var b=this.errors.length<
1;b&&!a.skip_callbacks&&this.constructor.trigger("after_validation",[this]);return b},remove:function(){var a,b;this.constructor.trigger("before_remove",[this]);a=this;$.each(this.constructor._model_items,function(c,d){if(d.id()==a.id()){b=a.constructor._model_items.splice(c,1);return false}});this.constructor.write_to_store();this.remove_associtions();this.constructor.trigger("after_remove",[b[0]]);return b[0]},update:function(a){var b,c;for(b in a)if(a.hasOwnProperty(b)){c=this.attrs[b];c!=a[b]&&
this["set_"+b](a[b])}if(this.changed())return this.save();return true},save:function(){var a;if(this.valid()){var b=this.state=="new";this.constructor.trigger("before_save",[this]);b?this.constructor.trigger("before_create",[this]):this.constructor.trigger("before_update",[this]);this.constructor.add(this);a=this.clear_dirty();this.save_associated_records(a);b?this.constructor.trigger("after_create",[this]):this.constructor.trigger("after_update",[this]);this.constructor.trigger("after_save",[this]);
return true}else return false},flatten:function(){return $.extend({},this.attrs)}};Model.Options={parse:function(a){var b;if(typeof a=="string"){b={};b[a]={};a=b}if($.isArray(a)){b={};$.each(a,function(c,d){b[d]={}});a=b}return a}};
Model.Reflections={add_reflections_for_self:function(){var a;a=this;$.each({has_one:this.has_one,has_many:this.has_many,belongs_to:this.belongs_to,has_and_belongs_to_many:this.has_and_belongs_to_many},function(b,c){$.each(c,function(d){var e;e={};e[b]=d;a.add_reflection(e)})})},add_reflection:function(a){this._reflections.push(a)},reflections:function(){return this._reflections}};
Model.Storage={initialize:function(a){var b,c;b=[];c=this;$.isArray(a)||(a=[a]);$.each(a,function(d,e){if(e.supported()){c.engine=e;return false}else b.push(e.description)});this.engine===null&&console.error("No supported engine found, tried: "+b.join(", "))},supported:function(){return this.engine.supported()},getItem:function(a){return this.engine.getItem(a)},setItem:function(a,b){return this.engine.setItem(a,b)},removeItem:function(a){return this.engine.removeObject(a)},contains:function(a){return this.engine.contains(a)},
count:function(){return this.engine.count()},clear:function(){return this.engine.clear()}};
Model.Storage.Cookie={description:"cookie storage",keys:[],supported:function(){var a;$.cookie("test_support","supported");a=$.cookie("test_support")=="supported";$.cookie("test_support",null);return a},getItem:function(a){return this.contains(a)?JSON.parse($.cookie(a),this._reviver):null},setItem:function(a,b){$.cookie(a,JSON.stringify(b));$.inArray(a,this.keys)<0&&this.keys.push(a)},removeItem:function(a){$.cookie(a,null);this.keys=$.map(this.keys,function(b){return a==b?null:b})},contains:function(a){return $.cookie(a)!==
null},count:function(){return this.keys.length},clear:function(){$.each(this.keys,function(a,b){$.cookie(b,null)});this.keys=[]},_reviver:function(a,b){if(typeof b==="string")if(a=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(b))return new Date(Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6]));return b}};
Model.Storage.Default={description:"in memory storage",supported:function(){return true},getItem:function(){return null},setItem:function(){return true},removeItem:function(){},contains:function(){return false},count:function(){return 0},clear:function(){}};
Model.Storage.Session={description:"session storage",supported:function(){try{return!!window.sessionStorage.getItem}catch(a){return false}},getItem:function(a){return this.contains(a)?JSON.parse(this._get(a),this._reviver):null},setItem:function(a,b){sessionStorage.removeItem(a);sessionStorage.setItem(a,JSON.stringify(b))},removeItem:function(a){sessionStorage.removeItem(a)},contains:function(a){var b,c;b=false;for(c=0;c<sessionStorage.length;c++)if(this._key(c)==a){b=true;break}return b},count:function(){return sessionStorage.length},
clear:function(){var a,b,c;if(typeof sessionStorage.clear!="undefined")sessionStorage.clear();else{a=sessionStorage.length;b=[];for(c=0;c<a;c++)b.push(sessionStorage.key(c));$.each(b,function(d,e){sessionStorage.removeItem(e)})}},_key:function(a){return a>=sessionStorage.length?null:sessionStorage.key(a)},_get:function(a){a=sessionStorage.getItem(a);return a===null?a:typeof a.value=="undefined"?a:a.value},_reviver:function(a,b){if(typeof b==="string")if(a=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(b))return new Date(Date.UTC(a[1],
a[2]-1,a[3],a[4],a[5],a[6]));return b}};
Model.Validations={set_rules:function(a){this.rules=a},validate_rules:function(a){var b=this;$.each(this.rules,function(c,d){d=Model.Options.parse(d);$.each(d,function(e,f){b[c](a,e,a.attrs[e],f)})})},presence_of:function(a,b,c,d){if(this.satisfy_contitions(a,d))if(typeof c=="undefined")this.add_error(a,b,"is required");else c===""&&this.add_error(a,b,"cannot be blank")},uniqueness_of:function(a,b,c,d){if(this.satisfy_contitions(a,d)){d={};d[b]=c;c=a.constructor.find(d);c.length>0&&$.grep(c,function(e){return e!=
a}).length>0&&this.add_error(a,b,"must be unique")}},satisfy_contitions:function(a,b){var c=true;if(b.when&&c)c=b.when(a);if(b.unless&&c)c=!b.unless(a);return c},add_error:function(a,b,c){var d={};d[b]=c;a.errors.push(d)}};
