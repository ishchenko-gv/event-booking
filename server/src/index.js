"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./db");
const handlers_1 = require("./user/handlers");
(0, db_1.connectDatabase)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello there!!!");
});
app.use("/users", handlers_1.userRouter);
app.listen(8000, () => console.info("Server is running on http://localhost:8000"));
