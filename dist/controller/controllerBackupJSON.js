var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/controllerBackupJSON.ts
var controllerBackupJSON_exports = {};
__export(controllerBackupJSON_exports, {
  runBackup: () => runBackup
});
module.exports = __toCommonJS(controllerBackupJSON_exports);
var mysqldump = require("mysqldump");
var runBackup = async () => {
  console.log("Running backup");
  const result = await mysqldump({
    connection: {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "dabase-insert"
    }
  });
  console.log(result);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runBackup
});
