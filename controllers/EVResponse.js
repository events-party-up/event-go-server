
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
  res.status(code);
  res.send(error);
}

var jwt_decode = require('jwt-decode');

function verifiyAccessToken(req, key) {
  // CHeck user_id decode jwt
  var decode = jwt_decode(access_token);
  var value = decode[key];

  return value;
}

module.exports = {
  success: SuccessResponse,
  failure: ErrorResponse
  verifiyAccessToken: verifiyAccessToken,
}
