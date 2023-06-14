'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCategory", {
    enumerable: true,
    get: function() {
        return getCategory;
    }
});
const getCategory = (path)=>{
    let category;
    switch(path){
        case '/phones':
            category = 'phones';
            break;
        case '/tablets':
            category = 'tablets';
            break;
        case '/accessories':
            category = 'accessories';
            break;
        default:
            category = '';
    }
    return category;
};
