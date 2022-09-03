import { Router, Request } from "express"
import { Response, NextFunction } from "express-serve-static-core"
import { multiPart } from "../controller/createMultipartUpload"
import getMultipartPreSignedUrl, { getSinglePartUploadUrl } from "../utils/awsUrlGenerate"
import { finalizeMultipartUpload } from "../controller/completeMultipartUpload"
const router = Router()

router.post("/getUploadId", multiPart)
router.post("/getUploadPart", getMultipartPreSignedUrl)
router.post("/completeUpload", finalizeMultipartUpload)
router.get("/getPartUploadUrl", getSinglePartUploadUrl)

export default router
