import AWS from "aws-sdk"
import "dotenv/config"
import { RequestHandler } from "express"
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const region = process.env.S3_REGION
const BUCKET_NAME = process.env.BUCKET_NAME

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
})

const getMultipartPreSignedUrl: RequestHandler<{}> = async (req, res, next) => {
  const { fileName, uploadId, partNumber, fileType } = req.body

  const multipartParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    UploadId: uploadId,
    // ContentType: fileType,
  }

  const promises = []
  for (let index = 0; index < partNumber; index++) {
    promises.push(
      s3.getSignedUrlPromise("uploadPart", {
        ...multipartParams,
        PartNumber: index + 1,
      })
    )
  }
  const signedUrl = await Promise.all(promises)
  const partSignedUrlList = signedUrl.map((signedUrl, index) => {
    return {
      signedUrl: signedUrl,
      partNumber: index + 1,
    }
  })
  return res.send({
    parts: partSignedUrlList,
  })
}

export default getMultipartPreSignedUrl
