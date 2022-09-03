"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createMultipartUpload_1 = require("../controller/createMultipartUpload");
const awsUrlGenerate_1 = __importStar(require("../utils/awsUrlGenerate"));
const completeMultipartUpload_1 = require("../controller/completeMultipartUpload");
const router = (0, express_1.Router)();
router.post("/getUploadId", createMultipartUpload_1.multiPart);
router.post("/getUploadPart", awsUrlGenerate_1.default);
router.post("/completeUpload", completeMultipartUpload_1.finalizeMultipartUpload);
router.get("/getPartUploadUrl", awsUrlGenerate_1.getSinglePartUploadUrl);
exports.default = router;
//# sourceMappingURL=uploadRouter.js.map