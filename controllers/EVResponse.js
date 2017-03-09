
function SuccessResponse(res,result) {
  res.json({
    'code': 200,
    'result': result
  });
};

function ErrorResponse(res,code,error) {


  if (code == undefined) {
    code = 404;
  }

  if (error == undefined) {
    error = "Error not found";
  }

  res.json({
    'code': code,
    'error': error
  });
}

module.exports = {
  success: SuccessResponse,
  failure: ErrorResponse
}
