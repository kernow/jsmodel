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
var Model=function(a,b){b=b||{};var c=b.class_methods||{},d=b.instance_methods||{},e=b.required_attrs||[],f=b.default_attrs||[],m=b.belongs_to||{},q=b.has_many||{};b=b.has_and_belongs_to_many||{};var l=function(g,n){n=n||{};n.skip_save=n.skip_save||false;g=g||{};this.attrs={};this.errors=[];this.state="new";var p=this;$.each(this.constructor.required_attrs,function(h,o){if(typeof g[o]=="undefined")g[o]=undefined});$.each(this.constructor.default_attrs,function(h,o){g[o]||(g[o]=undefined)});for(var j in g)g.hasOwnProperty(j)&&
this.add_getter_setter(j);$.each(this.constructor.belongs_to,function(h){p.add_belongs_to(h)});$.each(this.constructor.has_many,function(h){p.add_has_many(h)});$.each(this.constructor.has_and_belongs_to_many,function(h){p.add_has_and_belongs_to_many(h)});this.constructor.define_getters_setters&&this.constructor.define_getters_setters(this);this.attrs.id=this.constructor.next_id();for(j in g)g.hasOwnProperty(j)&&this["set_"+j](g[j]);if(!n.skip_save){this.constructor.trigger("before_create",[this]);
this.save()&&this.constructor.trigger("after_create",[this])}};l.model_name=a;jQuery.extend(l,Model.Events,Model.ClassMethods,Model.Reflections,c,{required_attrs:e,default_attrs:f,belongs_to:m,has_many:q,has_and_belongs_to_many:b,events:{},_model_items:[],_reflections:[]});jQuery.extend(l.prototype,Model.InstanceMethods,Model.Associations,d);l.add_reflections_for_self();Model._add(l,a);return l};Model.find_by_name=function(a){return Model._models[a]};Model._models={};
Model._add=function(a,b){Model._models[b]=a};Model._remove=function(a){Model._models[a]=undefined};
Model.Associations={add_belongs_to:function(a){this["get_"+a]=function(){return Model.find_by_name(a).find({id:this.attrs[a+"_id"]})[0]||undefined};this["get_"+a+"_id"]=function(){return this.attrs["get_"+a+"_id"]};this["set_"+a]=function(b){this.attrs[a+"_id"]=b.id()};this["set_"+a+"_id"]=function(b){this.attrs[a+"_id"]=b}},add_has_many:function(a){var b=this;this["get_"+a]=function(){var c={};c[this.model_name()+"_id"]=this.id();return Model.find_by_name(a.singularize()).find(c)};this["set_"+a]=
function(c){var d={};d[this.model_name()+"_id"]=this.id();$.each(Model.find_by_name(a.singularize()).find(d),function(e,f){f["set_"+b.model_name()+"_id"](undefined)});this["add_"+a](c)};this["add_"+a]=function(c){$.each(c,function(d,e){e["set_"+b.model_name()+"_id"](b.id())})};this["remove_"+a]=function(c){$.each(c,function(d,e){e["set_"+b.model_name()+"_id"](undefined)})}},add_has_and_belongs_to_many:function(a){var b=this;this.attrs[a+"_ids"]=[];this["get_"+a]=function(){return $.map(this.attrs[a+
"_ids"],function(c){return Model.find_by_name(a.singularize()).find({id:c})[0]})};this["get_"+a+"_ids"]=function(){return this.attrs[a+"_ids"]};this["set_"+a]=function(c){this.attrs[a+"_ids"]=$.map(c,function(e){return e.id()});var d={};d[this.model_name().pluralize()+"_ids"]=function(e){return $.inArray(b.id(),e)>-1};$.each(Model.find_by_name(a.singularize()).find(d),function(e,f){f["remove_"+b.model_name().pluralize()+"_ids"]([b.id()])});$.each(c,function(e,f){f["add_"+b.model_name().pluralize()+
"_id"](b.id())})};this["set_"+a+"_ids"]=function(c){this.attrs[a+"_ids"]=c};this["add_"+a]=function(c){$.each(c,function(d,e){$.inArray(e.id(),b.attrs[a+"_ids"])<0&&b.attrs[a+"_ids"].push(e.id());e["add_"+b.model_name().pluralize()+"_id"](b.id())})};this["add_"+a+"_id"]=function(c){$.inArray(c,b.attrs[a+"_ids"])<0&&this.attrs[a+"_ids"].push(c)};this["remove_"+a]=function(c){$.each(c,function(d,e){d=$.inArray(e.id(),b.attrs[a+"_ids"]);d>-1&&b.attrs[a+"_ids"].splice(d,1);e["remove_"+b.model_name().pluralize()+
"_ids"]([b.id()])})};this["remove_"+a+"_ids"]=function(c){$.each(c,function(d,e){d=$.inArray(e,b.attrs[a+"_ids"]);d>-1&&b.attrs[a+"_ids"].splice(d,1)})}},remove_associtions:function(){var a=this;$.each(this.reflections(),function(b,c){$.each(c,function(d,e){switch(d){case "has_many":$.each(a["get_"+e](),function(f,m){m["set_"+a.model_name()+"_id"](undefined)});break;case "has_and_belongs_to_many":$.each(a["get_"+e](),function(f,m){m["remove_"+a.model_name().pluralize()+"_ids"]([a.id()])});break}})})},
reflections:function(){return Model.find_by_name(this.model_name()).reflections()},model_name:function(){return this.constructor.model_name}};
Model.ClassMethods={valid_required_attrs:function(a){var b={};$.each(this.required_attrs,function(e,f){b[f]=undefined});for(var c in b)if(b.hasOwnProperty(c))if(typeof a.attrs[c]=="undefined"){var d={};d[c]="is required";a.errors.push(d)}else if(a.attrs[c]===""){d={};d[c]="cannot be blank";a.errors.push(d)}},all:function(){return this._model_items},find:function(a){var b=this;return $.grep(this._model_items,function(c){var d=false;for(var e in a){d=true;if(b.is_function(a[e]))return typeof c.attrs[e]!=
"undefined"?a[e](c.attrs[e]):false;else if(c.attrs[e]!=a[e])return false}return d?true:false})},is_function:function(a){return typeof a=="function"||Object.prototype.toString.call(a)=="[object Function]"?true:false},first:function(){return this._model_items[0]},add:function(a){if(a.valid({skip_callbacks:true})){this.trigger("before_add",[a]);this._model_items.push(a);this.write_to_store();a.state="saved";this.trigger("after_add",[a])}},next_id:function(){var a=-1;$.each(this._model_items,function(b,
c){if(c.id()>a)a=c.id()});return a+1},reset:function(){this._model_items=[];this._refelections=[];this.write_to_store()},load:function(){this._model_items=[];var a=this;if(Model.Storage.contains(this.model_name)){var b=Model.Storage.getObject(this.model_name);$.each(b,function(c,d){c=new a(d,{skip_save:true});a._model_items.push(c);a.trigger("after_load",[c])})}else this.reset()},write_to_store:function(){Model.Storage.setObject(this.model_name,$.map(this._model_items,function(a){if(a.valid({skip_callbacks:true}))return a.flatten()}))}};
Model.Events={bind:function(a,b){this.events[a]=this.events[a]||[];this.events[a].push(b);return this},trigger:function(a,b){if(a=this.events[a])for(var c=0;c<a.length;c++)a[c].apply(this,b||[]);return this},unbind:function(a,b){if(b)for(var c=this.events[a]||[],d=0;d<c.length;d++)c[d]===b&&this.events[a].splice(d,1);else delete this.events[a];return this}};
Model.InstanceMethods={id:function(){return this.attrs.id===undefined?-1:this.attrs.id},add_getter_setter:function(a){this["get_"+a]=function(){return this.attrs[a]};this["set_"+a]=function(b){this.attrs[a]=b}},valid:function(a){a=a||{};a.skip_callbacks||this.constructor.trigger("before_validation",[this]);this.errors=[];this.constructor.validations&&this.constructor.validations(this,this.attrs);this.constructor.valid_required_attrs(this,this.attrs);a.skip_callbacks||this.constructor.trigger("after_validation",
[this]);return this.errors.length<1},remove:function(){this.constructor.trigger("before_remove",[this]);var a=this,b;$.each(this.constructor._model_items,function(c,d){if(d.id()==a.id()){b=a.constructor._model_items.splice(c,1);return false}});this.constructor.write_to_store();this.remove_associtions();this.constructor.trigger("after_remove",[b[0]]);return b[0]},update:function(a){this.constructor.trigger("before_update",[this]);var b=false;for(var c in a)if(a.hasOwnProperty(c))if(this.attrs[c]!=
a[c]){this["set_"+c](a[c]);b=true}if(b)if(this.save()){this.constructor.trigger("after_update",[this]);return true}else return false;return true},save:function(){if(this.valid()){this.constructor.trigger("before_save",[this]);this.state=="new"?this.constructor.add(this):this.constructor.write_to_store();this.constructor.trigger("after_save",[this]);return true}else return false},flatten:function(){return $.extend({},this.attrs)}};
Model.Reflections={add_reflections_for_self:function(){var a=this;$.each({has_many:this.has_many,belongs_to:this.belongs_to,has_and_belongs_to_many:this.has_and_belongs_to_many},function(b,c){$.each(c,function(d){var e={};e[b]=d;a.add_reflection(e)})})},add_reflection:function(a){this._reflections.push(a)},reflections:function(){return this._reflections}};
Model.Storage={sessionStorage:typeof window.sessionStorage!="undefined"?window.sessionStorage:null,keys:[],length:function(){return this.sessionStorage?this.sessionStorage.length:this.keys.length},key:function(a){return a>=this.length()?null:this.sessionStorage?this.sessionStorage.key(a):this.keys[a]},getItem:function(a){if(this.sessionStorage){a=this.sessionStorage.getItem(a);return a===null?a:typeof a.value=="undefined"?a:a.value}else return jQuery.cookie(a)},setItem:function(a,b){if(this.sessionStorage){this.sessionStorage.removeItem(a);
this.sessionStorage.setItem(a,b)}else{jQuery.cookie(a,b);this.contains(a)||this.keys.push(a)}},removeItem:function(a){if(this.sessionStorage)this.sessionStorage.removeItem(a);else for(var b=0;b<this.length();b++)if(this.keys[b]==a){jQuery.cookie(a,null);if(b==this.length()-1)this.keys.pop();else{delete this.keys[b];this.keys[b]=this.keys.pop()}}},clear:function(){if(this.sessionStorage)if(typeof this.sessionStorage.clear!="undefined")this.sessionStorage.clear();else{var a=this.sessionStorage.length,
b=[];for(i=0;i<a;i++)b.push(this.sessionStorage.key(i));var c=this;$.each(b,function(d,e){c.sessionStorage.removeItem(e)})}else{for(k=0;k<this.length();k++)jQuery.cookie(this.keys[k],null);this.keys=[]}},getObject:function(a){return this.contains(a)?JSON.parse(this.getItem(a),this.reviver):null},reviver:function(a,b){if(typeof b==="string")if(a=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(b))return new Date(Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6]));
return b},setObject:function(a,b){this.setItem(a,JSON.stringify(b))},contains:function(a){contains_key=false;for(k=0;k<this.length();k++)if(this.key(k)==a){contains_key=true;break}return contains_key}};
