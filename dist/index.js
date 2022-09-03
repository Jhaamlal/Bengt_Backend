"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const uploadRouter_1 = __importDefault(require("./router/uploadRouter"));
app.use(express_1.default.json());
// data use
app.use((req, res, next) => {
    var _a;
    res.removeHeader("server");
    res.removeHeader("x-powered-by");
    res.shouldKeepAlive = false;
    const allowedOrigin = ["http://localhost:3000", "http://localhost:3002"];
    if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.origin) {
        const origin = req.headers.origin;
        if (allowedOrigin.includes(origin) || origin.endsWith(".ngrok.io")) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
    }
    res.setHeader("Access-Control-Allow-Method", "PUT,GET,POST,DELETE,OPTIONS,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,range");
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    return next();
});
// routers
app.use("/aws", uploadRouter_1.default);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
//# sourceMappingURL=index.js.map