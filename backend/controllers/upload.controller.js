const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require("../config/s3.config");
const { generateFileName } = require("../utils/generateFileName");

const generateUploadUrl = async (req, res) => {
  try {
    const { fileType } = req.body;

    const fileName = generateFileName(fileType);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

    res.status(200).json({
      success: true,
      uploadUrl,
      fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate upload URL",
    });
  }
};

module.exports = { generateUploadUrl };
