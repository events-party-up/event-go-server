
var EventRule = function() {

  this.once_per_user = false;
  this.require_response_active_time = 24 * 60 * 60, // 1 day
  this.require_tasks = [];

}

module.exports = EventRule;
