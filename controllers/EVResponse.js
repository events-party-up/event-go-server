
function SuccessResponse(res,result) {
  req.json({
    'code': 200,
    'result': result
  });
};

function ErrorResponse(res,code,error) {

  var codeR = 404;
  if (code != undefined && typeof code == 'number') {
    codeR = code;
  }

  if (error != undefined && ( typeof error == 'string' || typeof error == 'Object') ) {
    error = "Error not found";
  }

  req.json({
    'code': code,
    'error': error
  });
}

module.exports = {
  success: SuccessResponse,
  failure: ErrorResponse
}
