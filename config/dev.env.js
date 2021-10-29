"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

console.log('prodEnv', prodEnv)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.31.8"',
  BASE_WEBSOCKET: '"ws://localhost:8080/api/websocket/"',
  BASE_URL: {
    admin: `/admin/api/v1`,
    filestorage: `/filestorage/api/v1`,
    datacenter: `/datacenter/api/v1`,
    storm: `/storm/api/v1`,
    task: `/task/api/v1`,
    gateway: `/gateway/api/v1`,
    datacleaning: `/datacleaning/api/v1`,
    log: `/log/api/v1`,
    dictionary: `/dictionary/api/v1`,
    situation: `/situation/api/v1`, //

    jd: `/jd/api/v1`,
    archives: `/archives/api/v1`,
    prediction: `/prediction/api/v1`,
    clue: `/clue/api/v1`
  }
});
