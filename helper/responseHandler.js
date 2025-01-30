exports.sendResponse = (
  res,
  status = true,
  data,
  code = 200,
  message = "Success",
) => {
  return res.status(code).json({
    data,
    status,
    code,
    message,
  });
};
