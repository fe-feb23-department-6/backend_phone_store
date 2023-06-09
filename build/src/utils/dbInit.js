/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dbInit", {
    enumerable: true,
    get: function() {
        return dbInit;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _models = require("../models");
require('dotenv').config();
const URI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;
const dbInit = ()=>{
    try {
        const db = new _sequelizetypescript.Sequelize(URI, {
            models: _models.models,
            dialectOptions: {
                ssl: true
            }
        });
        console.log('DB successfully initialized');
        return db;
    } catch (error) {
        console.log('DB failed to connect', error);
    }
};
