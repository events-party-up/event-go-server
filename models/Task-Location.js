var Task = require('./Task.js');

var Task_Item = function (task, location_info) {

  this.task = task;
  this.location_info = location_info;
}

module.exports = Task_Item;
