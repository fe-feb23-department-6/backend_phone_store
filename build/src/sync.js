/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sync", {
    enumerable: true,
    get: function() {
        return sync;
    }
});
const _dbInit = require("./utils/dbInit");
const _Token = require("./models/Token");
const sync = async ()=>{
    try {
        (0, _dbInit.dbInit)();
        // await Phones.sync({ alter: true });
        // await Products.sync({ alter: true });
        // await Users.sync({ alter: true });
        // await Orders.sync({ alter: true });
        // await OrderDetails.sync({ alter: true });
        // await Cart.sync({ alter: true });
        // await Favorites.sync({ alter: true });
        // await seedInitialPhones();
        // await seedInitialProducts();
        await _Token.Token.sync({
            alter: true
        });
    } catch (error) {
        console.log(error);
    }
};
sync();
