var base64 = require('node-base64-image');
var gcs = require('../../configure/gcs');
var EVBody = require('../EVBody');
var EVResponse = require('../EVResponse');
var util = require('util');
var Rx = require('rxjs/Rx');
var Images = require('../../models/Images');
var RxMongo = require('./../RxMongo.js');

function decodeBase64Image(base64String,prefix) {
    return Rx.Observable.create(function(observer){
        var buf = Buffer.from(base64String, 'base64');
        var temp_file_name = prefix +"_images-" + (new Date()).toISOString();
        base64.decode(buf,{
             filename: temp_file_name 
        },
        function(error,result) {
            console.log("Decode 64 image");
            if (error !== undefined && error !== null) {
                observer.error(error);
                return;
            }
            console.log(result);
            observer.next(temp_file_name);
        })
    });
}

module.exports = {

    getImages: function(req,res,next) {

        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        if (supplier_id == null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }

        RxMongo.find(Images,{
            'supplier_id': supplier_id
        }).subscribe(function(docs){
            EVResponse.success(res,docs);
        }, function(error){
            EVResponse.failure(res,402,"Can't find images");
        })
    },

    deleteImage: function(req,res,next) {

        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        if (supplier_id == null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }
        var image_id = req.params.image_id;
        var findImage = RxMongo.findOne(Images,{
            'supplier_id': supplier_id,
            "_id": image_id
        })

        findImage.subscribe(function(doc) {
            var image_url = doc.image_url;
            
            if (image_url !== undefined && image_url.length !== 0) {
                gcs.deleteFile(image_url).subscribe(function(){
                    console.log("Delete image success at " + image_url);
                }, function(error){
                    console.error(error);
                })
            }
            
            RxMongo.remove(Images,{
                "_id": image_id
            }).subscribe(function() {
                EVResponse.success(res,"Delete success");
            }, function(err) {
                EVResponse.failure(res,4,"delete failure");
            })
        }, function(error){
            EVResponse.failure(res,2,"Image Not Found");
        });
    },


    postImage: function(req,res,next) {
        
        var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
        if (supplier_id == null) {
            EVResponse.failure(res,401,"Access token not true");
            return;
        }

        var body = EVBody(req.body);
        var file_encode_64 = body.file_encode_64;
        var image_description = body.image_description;

        if (file_encode_64 === undefined || file_encode_64 === null) {
            EVResponse.failure(res,405,"file_encode_64 not validate");
            return;
        }

        decodeBase64Image(file_encode_64, supplier_id).subscribe(function(file_name) {
            gcs.upload(file_name,supplier_id).subscribe(function(publicLink) {

                var image = new Images(image_description);
                image.supplier_id = supplier_id;
                image.image_url = publicLink;

                RxMongo.save(image).subscribe(function(doc) {
                    EVResponse.success(res,image);
                }, function(error){
                    EVResponse.failure(res,410,'Save image failure');
                })
                
            }, function(error){
                console.log(error);
                EVResponse.failure(res,409,'Upload image failure to storage');
            })
        }, function(error) {
            console.error(error);
            EVResponse.failure(res,406,'Upload image failure');
        })
    },
};

/**
     * @api {get} images/ GetAllImageOfSupplier
     * @apiVersion 0.1.0
     * @apiName GetAllImageOfSupplier
     * @apiGroup Images
     * @apiPermission Supplier
     *
     * @apiDescription  GetAllImageOfSupplier
     *
     *
     * @apiExample Example usage:
     * GET /images/
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object[]} data                Item detail
     *
     * @apiUse ImagesInfoResponse
     * @apiUse ErrorAuthorized
     * @apiErrorExample Get images failure:
     *     HTTP/1.1 402 Get images failure
     *     {
     *       code : 402
     *       error: "Get images failure"
     *     }
*/

/**
 * @api {post} images/ Create Images
 * @apiVersion 0.1.0
 * @apiName Create Images
 * @apiGroup Images
 * @apiPermission supplier
 *
 * @apiDescription  Create Images
 *
 * @apiUse ImagesInfoParams
 *
 * @apiExample Example usage:
 * POST /images
 *
 * @apiSuccess {Number} code                Code Success
 * @apiSuccess {Object} data                Image detail
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       data: {
 *        _id: string,
 *        supplier_id: string,
 *        name: string,
 *        detail: string,
 *        image_url: string,
 *        created_date: Number,
 *        tags: [string]
 *       }
 *     }
 *
 *
 * @apiUse ErrorAuthorized
 * @apiErrorExample Create item failure:
 *     HTTP/1.1 405 Create item failure
 *     {
 *       code : 402
 *       error: "Create item failure"
 *     }
 *  @apiErrorExample Upload image failure to storage:
 *     HTTP/1.1 409 Upload image failure to storage
 *     {
 *       code : 409
 *       error: "Upload image failure to storage"
 *     }
 *  @apiErrorExample Upload image failure:
 *     HTTP/1.1 406 Upload image failure
 *     {
 *       code : 406
 *       error: "Upload image failure"
 *     }
 *  @apiErrorExample Save image failure:
 *     HTTP/1.1 410 Save image failure
 *     {
 *       code : 410
 *       error: "Save image failure"
 *     }
 */

/**
     * @api {delete} images/:image_id DeleteImages
     * @apiVersion 0.1.0
     * @apiName DeleteImages
     * @apiGroup Images
     * @apiPermission Supplier
     *
     * @apiDescription  DeleteImages
     *
     *
     * @apiExample Example usage:
     * DELETE /images/58f504a78751a91652af1973
     *
     * @apiSuccess {Number} code                Code Success
     * @apiSuccess {Object} data                Message
     *
     * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       code: 200,
    *       data: "Delete Success"
    *     }
     * @apiUse ErrorAuthorized
     * @apiErrorExample Get images failure:
     *     HTTP/1.1 40x Delete images failure
     *     {
     *       code : 40x
     *       error: "Get images failure"
     *     }
*/