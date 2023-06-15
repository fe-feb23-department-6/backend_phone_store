'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortProducts", {
    enumerable: true,
    get: function() {
        return sortProducts;
    }
});
const sortProducts = (sort)=>{
    let sortOptions = [
        [
            'year',
            'DESC'
        ]
    ];
    switch(sort){
        case 'cheapest':
            sortOptions = [
                [
                    'price',
                    'ASC'
                ]
            ];
            break;
        case 'expensive':
            sortOptions = [
                [
                    'price',
                    'DESC'
                ]
            ];
            break;
        case 'abc':
            sortOptions = [
                [
                    'name',
                    'ASC'
                ]
            ];
            break;
        case 'zyx':
            sortOptions = [
                [
                    'name',
                    'DESC'
                ]
            ];
            break;
        case 'newest':
        default:
            sortOptions = [
                [
                    'year',
                    'DESC'
                ]
            ];
    }
    return sortOptions;
};
