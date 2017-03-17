
function SuccessResponse(res,result) {
  res.json({
    'code': 200,
    'data': result
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
  res.send({
    'code': code,
    'error': error
  });
}

var jwt_decode = require('jwt-decode');

function verifiyAccessToken(req, key) {
  // CHeck user_id decode jwt
  if (req.query.access_token == null) {
    return null;
  }

  var decode = jwt_decode(req.query.access_token);
  var value = decode[key];

  return value;
}

var configure = require('../configure/configure');
function authoriedAdmin(admin) {

  if (admin == null)
    return "admin empty";

  if (admin.username == null || admin.password == null)
    return "username or password empty";

  if ( admin.username.localeCompare(configure.admin_username) != 0 ||
      admin.password.localeCompare(configure.admin_password) != 0) {
    return "username or password incorrect";
  }

  return null;

}

module.exports = {
  success: SuccessResponse,
  failure: ErrorResponse,
  verifiyAccessToken: verifiyAccessToken,
  authoriedAdmin: authoriedAdmin,
};
