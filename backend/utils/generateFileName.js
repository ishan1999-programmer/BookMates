const { randomUUID } = require("crypto");

const generateFileName = (fileType) => {
  const extension = fileType.split("/")[1];
  return `${randomUUID()}.${extension}`;
};

module.exports = { generateFileName };
