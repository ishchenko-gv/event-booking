"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const knex_1 = __importDefault(require("knex"));
function connectDatabase() {
    (0, knex_1.default)({
        client: "pg",
        connection: process.env.DATABASE_URL,
        searchPath: ["public"],
    });
}
