
var Task = require('./Task.js');

var Task_Item = function (task, item_id, location_info) {

  this.task = task;
  this.item_id = item_id;
  this.location_info = location_info;
}

module.exports = Task_Item;
