(function(){
  'use strict';
  var PREFIX='oraciones_v3_1_166_prueba_aislada__';
  var proto=Storage.prototype;
  var get=proto.getItem, set=proto.setItem, rem=proto.removeItem, key=proto.key, clear=proto.clear;
  function p(k){return PREFIX+String(k);}
  proto.getItem=function(k){return get.call(this,p(k));};
  proto.setItem=function(k,v){return set.call(this,p(k),String(v));};
  proto.removeItem=function(k){return rem.call(this,p(k));};
  proto.key=function(i){
    var found=[];
    for(var n=0;n<this.length;n++){
      var raw=key.call(this,n);
      if(raw&&raw.indexOf(PREFIX)===0) found.push(raw.slice(PREFIX.length));
    }
    return found[i]===undefined?null:found[i];
  };
  proto.clear=function(){
    var del=[];
    for(var n=0;n<this.length;n++){
      var raw=key.call(this,n);
      if(raw&&raw.indexOf(PREFIX)===0) del.push(raw);
    }
    del.forEach(function(k){rem.call(localStorage,k);});
  };
})();
