module.exports = function(cache){

    this.set = function(key, obj){
        console.log("key is", key);
        console.log("obj is", obj);
        return cache.set(key,obj, 1000, (err, success) => {
            if( !err && success ){
                console.log("cache is set", success );
            }
            else{
                console.log("cache is not set");
                console.log("error is", err);
            }
        })
    };

    this.get = function(key){
        return cache.get(key, (err, value) => {
            if( !err ){
                if(value == undefined){
                    console.log("key not found");
                }else{
                    console.log( "key is found", value );
                }
            }
        });
    };
}
