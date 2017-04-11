
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
  // access_token trong header hoac session
  var access_token = req.authorization;
  if (access_token == null) {
    access_token = req.session.access_token;
  }

  if (access_token == null || access_token == undefined ) {
    return null;
  }

  var decode = jwt_decode(access_token);
  var value = decode[key];

  return value;
}

var configure = require('../configure/configure');
function authoriedAdmin(admin) {

  if (admin == null || admin == undefined)
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
