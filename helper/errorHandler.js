exports.handleError = (
  res,
  status = false,
  error,
  code = 500,
  message = "Internal server error",
) => {
  console.error(message, error);
  return res.status(code).json({
    status,
    data: null,
    code,
    message,
  });
};
