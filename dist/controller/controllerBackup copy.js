var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/controllerBackup copy.ts
var controllerBackup_copy_exports = {};
__export(controllerBackup_copy_exports, {
  runBackup: () => runBackup,
  runListDatabases: () => runListDatabases
});
module.exports = __toCommonJS(controllerBackup_copy_exports);
var import_client = require("@prisma/client");
var import_mysql2 = __toESM(require("mysql2"));
var import_child_process = require("child_process");
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var prisma = new import_client.PrismaClient();
var connection = import_mysql2.default.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
var runListDatabases = async () => {
  try {
    connection.query("SHOW DATABASES", async (error, results, fields) => {
      if (error) {
        console.error(`Erro ao listar bancos de dados: ${error.message}`);
        return;
      }
      console.log("Bancos de dados dispon\xEDveis:");
      const databases = results.map((result) => result.Database);
      console.log(databases);
      databases.forEach(async (database) => {
        await runBackup(database);
      });
      connection.end();
    });
  } catch (err) {
    console.log(err);
  }
};
var runBackup = async (database) => {
  console.log(`backup do banco de dados ${database}`);
  try {
    const date = (/* @__PURE__ */ new Date()).toISOString().replace(/:/g, "-");
    const backupDir = import_path.default.join(__dirname, "..", "backupDUMPS");
    if (!import_fs.default.existsSync(backupDir)) {
      import_fs.default.mkdirSync(backupDir);
    }
    const filename = import_path.default.join(backupDir, `${database}_${date}.sql`);
    await new Promise((resolve, reject) => {
      (0, import_child_process.exec)(`mysqldump --single-transaction --quick --lock-tables=false --host=${connection.config.host} --user=${connection.config.user} --password=${connection.config.password} ${database} > ${filename}`, (error, stdout, stderr) => {
        if (error) {
          reject(`Erro ao gerar dump para o banco de dados ${database}: ${error.message}`);
        } else {
          console.log(`Dump do banco de dados ${database} gerado com sucesso`);
          resolve();
        }
      });
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  runBackup,
  runListDatabases
});
