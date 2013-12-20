var localData = {

    set : function(key, value) {
        if(!value) {
            localStorage.setItem(key, value);
        }
        else if(typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },

    get : function(key) {
        var value = localStorage.getItem(key);
        if(!value) {
            return null;
        }
        if(value.indexOf('{') === 0 || value.indexOf('[') === 0) {
            try {
                return JSON.parse(value);
            } catch(e) {
                return null;
            }
        } else {
            return value;
        }
    }

};