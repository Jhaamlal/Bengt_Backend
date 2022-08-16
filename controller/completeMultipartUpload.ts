import AWS from "aws-sdk"
import { NextFunction, RequestHandler, Request, Response } from "express"
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY
import * as _ from "lodash"


const region = "ap-south-1"
const BUCKET_NAME = "ravi-test-buket"

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
})
interface Iparams {
  Bucket: string
  Key: string
  Expires: any
}

export const finalizeMultipartUpload: RequestHandler<{}> = async (
  req,
  res,
  next
) => {
  const body = req.body

  try {
    let params = {
      Bucket: BUCKET_NAME,
      Key: body.fileName,
      MultipartUpload: {
        Parts: _.orderBy(body.parts, ["PartNumber"], ["asc"]),
      },
      UploadId: body.uploadId,
    }
    const completeUpload = await s3.completeMultipartUpload(params).promise()
    return res.send({ completeUpload: completeUpload })
  } catch (error) {
    return res.send({ error: error })
  }
}
