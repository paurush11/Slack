"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 2000,
    username: process.env.DATASRC_USERNAME,
    password: process.env.DATASRC_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [],
    migrations: [],
});
exports.AppDataSource = AppDataSource;
//# sourceMappingURL=datasource.js.map