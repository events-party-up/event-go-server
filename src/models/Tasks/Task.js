var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var taskSchema = new Schema({
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: 'supplier'
    },
    name: String,
    detail: String,
    thumbnail_url: String,
    cover_url: String,
    detail_url: String,
    start_time: Date,
    end_time: Date,
    created_date: {
        type: Date,
        default: new Date()
    },
    task_info: Object,
    award_ids: {
      type: [String],
      default: []
    },
    max_num_finish_task: Number,
    current_num_finish_task: Number,
    next_tasks: {
      type: [String],
      default: []
    },
    previous_tasks_require: {
      type: [String],
      default: []
    },
    status: String
});

/**
 * @apiDefine TaskInfoResponse
 * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
     *       code: 200,
     *       data: {
     *        task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        sub_name: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        policy_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        location_info: {Object Location},
     *        tags: "[string]",
     *        priority: Number,
     *        limit_user: Number,
     *        rule: Object,
     *        award_ids: [string],
     *        task_ids: [string],
     *        status: string
     *       }
     *     }
 */

/**
* @apiDefine TaskInfoParams
* @apiParamExample {json} Request-Example-InBody-Required:
   * {
     *     task_id: "string",
     *        supplier_id: "string",
     *        name: "string",
     *        detail: "string",
     *        thumbnail_url: "string",
     *        cover_url: "string",
     *        detail_url: "string",
     *        start_time: Number,
     *        end_time: Number,
     *        created_date: Number,
     *        task_info: {Object task},
     *        tags: "[string]",
     *        award_ids: [string],
     *        max_num_finish_task: Number,
     *        current_num_finish_task: Number,
     *        next_tasks: [string],
     *        previous_tasks_require: [string]
     * }
   *
 */

taskSchema.methods.generateJWT = function() {

};

var taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;
