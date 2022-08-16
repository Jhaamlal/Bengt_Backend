"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortMultiPartUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = "ap-south-1";
const BUCKET_NAME = "ravi-test-buket";
const s3 = new aws_sdk_1.default.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
const abortMultiPartUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        let params = {
            Bucket: BUCKET_NAME,
            Key: body.fileName,
            UploadId: body.uploadId,
        };
        const abortUpload = yield s3.abortMultipartUpload(params).promise();
        return res.send({ abortUpload: abortUpload });
    }
    catch (error) {
        return res.send({ error: error });
    }
});
exports.abortMultiPartUpload = abortMultiPartUpload;
//# sourceMappingURL=abortMultiPartUpload.js.map