"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createMultipartUpload_1 = require("../controller/createMultipartUpload");
const awsUrlGenerate_1 = __importDefault(require("../utils/awsUrlGenerate"));
const completeMultipartUpload_1 = require("../controller/completeMultipartUpload");
const router = (0, express_1.Router)();
router.post("/getUploadId", createMultipartUpload_1.multiPart);
router.post("/getUploadPart", awsUrlGenerate_1.default);
router.post("/completeUpload", completeMultipartUpload_1.finalizeMultipartUpload);
exports.default = router;
//# sourceMappingURL=uploadRouter.js.map