define({ "api": [
  {
    "type": "post",
    "url": "awards?access_token",
    "title": "Create Award",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       image_url: string,\n       more: string,\n       contact: string,\n       item_id: string,\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "CreateAward",
    "group": "Awards",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Create Award</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /awards?access_token=asdsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Award detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   award_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   more: string,\n   contact: string,\n   item_id: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Create award failure:",
          "content": "HTTP/1.1 402 Create award failure\n{\n  code : 402\n  error: \"Create award failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/AwardController.js",
    "groupTitle": "Awards"
  },
  {
    "type": "delete",
    "url": "awards/:award_id?access_token",
    "title": "Delete Award",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "award_id",
            "description": "<p>Award_ID want to Delete</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteAward",
    "group": "Awards",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Delete Award</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /awards/sdfdsafa?access_token=asdfdsaf",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Delete Award Failure:",
          "content": "HTTP/1.1 402 Delete Award Failure\n{\n  code : 402\n  error: \"Delete Award Failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/AwardController.js",
    "groupTitle": "Awards"
  },
  {
    "type": "get",
    "url": "awards/:award_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "award_id",
            "description": "<p>Award_ID want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Awards",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read award detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /awards/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Award detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   award_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   more: string,\n   contact: string,\n   item_id: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get award failure:",
          "content": "HTTP/1.1 402 Get award failure\n{\n  code : 402\n  error: \"Get award failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/AwardController.js",
    "groupTitle": "Awards"
  },
  {
    "type": "put",
    "url": "awards/:award_id?access_token",
    "title": "Update Award",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "award_id",
            "description": "<p>Award_ID want to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       image_url: string,\n       more: string,\n       contact: string,\n       item_id: string,\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateAward",
    "group": "Awards",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Update Award</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /awards/sdfdsafa?access_token=?",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Award detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   award_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   more: string,\n   contact: string,\n   item_id: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail:",
          "content": "HTTP/1.1 402 Update fail\n{\n  code : 402\n  error: \"Update fail with error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/AwardController.js",
    "groupTitle": "Awards"
  },
  {
    "type": "post",
    "url": "events?access_token",
    "title": "Create Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n   \"supplier_id\": string,\n   \"name\": string,\n   \"sub_name\": string,\n          \"thumbnail_url\": string,\n          \"cover_url\": string\n          \"policy_url\": string,\n          \"detail_url\": string,\n          \"start_time\": Number,\n          \"end_time\": Number,\n          .... More if have above params that is required for create\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "CreateEvent",
    "group": "Events",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Create Event</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /events",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Event detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   event_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\",\n   priority: Number,\n   limit_user: Number,\n   rule: Object,\n   award_ids: [string],\n   task_ids: [string],\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Body empty:",
          "content": "HTTP/1.1 402 Body empty\n{\n  code : 402\n  error: \"Body empty\"\n}",
          "type": "json"
        },
        {
          "title": "Body not adequate:",
          "content": "HTTP/1.1 403 Body not adequate\n{\n  code : 403\n  error: \"Body not adequate\"\n}",
          "type": "json"
        },
        {
          "title": "Save fail event:",
          "content": "HTTP/1.1 404 Save fail event\n{\n  code : 404\n  error: \"Save fail event\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/EventController.js",
    "groupTitle": "Events"
  },
  {
    "type": "delete",
    "url": "events/:event_id?access_token",
    "title": "Delete Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "event_id",
            "description": "<p>Event_ID want to Delete</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteEvent",
    "group": "Events",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Delete Event</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /events/sdfdsafa",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Delete Event Failure:",
          "content": "HTTP/1.1 402 Delete Event Failure\n{\n  code : 402\n  error: \"Delete Event Failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/EventController.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "events?supplier_id={}",
    "title": "GetAllEventsOfSupplier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get events</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllEventsOfSupplier",
    "group": "Events",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read all event of supplier_id with basic infomation</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /events?supplier_id=dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Events options (Array of Events).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   event_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get events failure (example):",
          "content": "HTTP/1.1 403 Get events failure\n{\n  code : 403\n  error: \"Get events failure\"\n}",
          "type": "json"
        },
        {
          "title": "Missing supplier id:",
          "content": "HTTP/1.1 403 Missing supplier id\n{\n  code : 404\n  error: \"Missing supplier id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/EventController.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "events/:event_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "event_id",
            "description": "<p>Event_ID want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Events",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read event detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /events/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Event detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   event_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\",\n   priority: Number,\n   limit_user: Number,\n   rule: Object,\n   award_ids: [string],\n   task_ids: [string],\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get events failure:",
          "content": "HTTP/1.1 403 Get events failure\n{\n  code : 403\n  error: \"Get events failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/EventController.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "events/:event_id?access_token",
    "title": "Update Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "event_id",
            "description": "<p>Event_ID want to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n   \"supplier_id\": string,\n   \"name\": string,\n   \"sub_name\": string,\n          \"thumbnail_url\": string,\n          \"cover_url\": string\n          \"policy_url\": string,\n          \"detail_url\": string,\n          \"start_time\": Number,\n          \"end_time\": Number,\n          .... More if have above params that is required for create\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateEvent",
    "group": "Events",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Update Event</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /events/sdfdsafa",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Event detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   event_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\",\n   priority: Number,\n   limit_user: Number,\n   rule: Object,\n   award_ids: [string],\n   task_ids: [string],\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail:",
          "content": "HTTP/1.1 402 Update fail\n{\n  code : 402\n  error: \"Update fail with error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/EventController.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "items?access_token",
    "title": "Create Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       image_url: string,\n       created_date: Number,\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "CreateItem",
    "group": "Items",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Create Item</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /items?access_token=asdsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Item detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   item_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Create item failure:",
          "content": "HTTP/1.1 402 Create item failure\n{\n  code : 402\n  error: \"Create item failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/ItemController.js",
    "groupTitle": "Items"
  },
  {
    "type": "delete",
    "url": "item/:item_id?access_token",
    "title": "Delete Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item_id",
            "description": "<p>Item_ID want to Delete</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteItem",
    "group": "Items",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Delete Item</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /items/sdfdsafa?access_token=asdfdsaf",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Delete Item Failure:",
          "content": "HTTP/1.1 402 Delete Item Failure\n{\n  code : 402\n  error: \"Delete Item Failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/ItemController.js",
    "groupTitle": "Items"
  },
  {
    "type": "get",
    "url": "items/:item_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item_id",
            "description": "<p>Item_ID want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Items",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read item detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /items/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Item detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   item_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get items failure:",
          "content": "HTTP/1.1 402 Get items failure\n{\n  code : 402\n  error: \"Get items failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/ItemController.js",
    "groupTitle": "Items"
  },
  {
    "type": "put",
    "url": "items/:item_id?access_token",
    "title": "Update Item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item_id",
            "description": "<p>Item_ID want to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       image_url: string,\n       created_date: Number,\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateItem",
    "group": "Items",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Update Item</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /items/sdfdsafa?access_token=?",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Item detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   item_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail:",
          "content": "HTTP/1.1 402 Update fail\n{\n  code : 402\n  error: \"Update fail with error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/ItemController.js",
    "groupTitle": "Items"
  },
  {
    "type": "post",
    "url": "locations?access_token",
    "title": "Create Location",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       address: string,\n       link: [string],\n       image_url: string,\n       created_date: Number,\n       location_info: {Object Location},\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "CreateLocation",
    "group": "Locations",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Create Location</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /locations?access_token=asdsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Location detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   location_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   address: string,\n   link: [string],\n   image_url: string,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Create location failure:",
          "content": "HTTP/1.1 402 Create location failure\n{\n  code : 402\n  error: \"Create location failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/LocationController.js",
    "groupTitle": "Locations"
  },
  {
    "type": "delete",
    "url": "locations/:location_id?access_token",
    "title": "Delete Location",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location_id",
            "description": "<p>Location_ID want to Delete</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteLocation",
    "group": "Locations",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Delete Location</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /locations/sdfdsafa?access_token=asdfdsaf",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Delete Location Failure:",
          "content": "HTTP/1.1 402 Delete Location Failure\n{\n  code : 402\n  error: \"Delete Location Failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/LocationController.js",
    "groupTitle": "Locations"
  },
  {
    "type": "get",
    "url": "locations/:location_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location_id",
            "description": "<p>Location_ID want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Locations",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read location detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /locations/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Location detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   location_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   address: string,\n   link: [string],\n   image_url: string,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get locations failure:",
          "content": "HTTP/1.1 402 Get locations failure\n{\n  code : 402\n  error: \"Get locations failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/LocationController.js",
    "groupTitle": "Locations"
  },
  {
    "type": "put",
    "url": "locations/:location_id?access_token",
    "title": "Update Location",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location_id",
            "description": "<p>Location_ID want to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       name: string,\n       detail: string,\n       address: string,\n       link: [string],\n       image_url: string,\n       created_date: Number,\n       location_info: {Object Location},\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateLocation",
    "group": "Locations",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Update Location</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /locations/sdfdsafa?access_token=?",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Location detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   location_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   address: string,\n   link: [string],\n   image_url: string,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail:",
          "content": "HTTP/1.1 402 Update fail\n{\n  code : 402\n  error: \"Update fail with error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/LocationController.js",
    "groupTitle": "Locations"
  },
  {
    "type": "get",
    "url": "notifications/:notification_id?access_token={}",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notification_id",
            "description": "<p>Notification_ID want to get detail</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Access token of supplier want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Notifications",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read notification detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /notifications/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Notification detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   notification_id: string,\n   supplier_id: string,\n   title: string,\n   body: string,\n   image_url: string,\n   time_start_push: string,\n   time_end_push: string,\n   max_push_per_user: string,\n   max_user_push: Number,\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Get notification failure:",
          "content": "HTTP/1.1 402 Get notification failure\n{\n  code : 402\n  error: \"Get notification failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/PushNotificationController.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "post",
    "url": "notifications?access_token",
    "title": "PushNotification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       supplier_id: string,\n       title: string,\n       body: string,\n       image_url: string,\n       time_start_push: string,\n       time_end_push: string,\n       max_push_per_user: string,\n       max_user_push: Number,\n       tags: [string]\n       status: string,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "PushNotification",
    "group": "Notifications",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>PushNotification</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /notifications?access_token=asdsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Notification detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   notification_id: string,\n   supplier_id: string,\n   title: string,\n   body: string,\n   image_url: string,\n   time_start_push: string,\n   time_end_push: string,\n   max_push_per_user: string,\n   max_user_push: Number,\n   tags: [string]\n   status: string,\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Can't push anything",
          "content": "HTTP/1.1 402 Can't push anything\n{\n  code : 402\n  error: \"Can't push anything\"\n}",
          "type": "json"
        },
        {
          "title": "Can't push users",
          "content": "HTTP/1.1 403 Can't push users\n{\n  code : 403\n  error: \"Can't push users\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/PushNotificationController.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "delete",
    "url": "suppliers/:suplier_id",
    "title": "Delete",
    "version": "0.1.0",
    "name": "Delete",
    "group": "Supplier",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Supplier delete</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /suppliers/asdasdas",
        "type": "json"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example-InBody:",
          "content": "{\n     admin: {\n      username: \"username\",\n      password: \"password\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Admin authoried failure:",
          "content": "HTTP/1.1 401 Admin authoried failure\n{\n  \"code\": 401\n  \"error\": \"Admin authoried failure\"\n}",
          "type": "json"
        },
        {
          "title": "Failure Delete Supplier",
          "content": "HTTP/1.1 402 Failure Delete Supplier\n{\n  \"code\": 402\n  \"error\": \"Failure Delete Supplier\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/awards",
    "title": "GetAllAward",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get awards</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllAwards",
    "group": "Supplier",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Read all awards of supplier_id</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/dasdsadsad/awards",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of awards options (Array of Awards).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   award_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   more: string,\n   contact: string,\n   item_id: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Get awards failure:",
          "content": "HTTP/1.1 403 Get awards failure\n{\n  code : 403\n  error: \"Get Awards failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/events",
    "title": "GetAllEvents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get events</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllEvents",
    "group": "Supplier",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read all event of supplier_id with basic infomation</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/dasdsadsad/events",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Events options (Array of Events).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   event_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get events failure (example):",
          "content": "HTTP/1.1 403 Get events failure\n{\n  code : 403\n  error: \"Get events failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/items",
    "title": "GetAllItems",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get items</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllItems",
    "group": "Supplier",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Read all items of supplier_id</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/dasdsadsad/items",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Items options (Array of Items).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   item_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   image_url: string,\n   created_date: Number,\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Get items failure:",
          "content": "HTTP/1.1 403 Get items failure\n{\n  code : 403\n  error: \"Get items failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/locations",
    "title": "GetAllLocations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get locations</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllLocations",
    "group": "Supplier",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Read all locations of supplier_id with basic infomation</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/dasdsadsad/locations",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Locations options (Array of Locations).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   location_id: string,\n   supplier_id: string,\n   name: string,\n   detail: string,\n   address: string,\n   link: [string],\n   image_url: string,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Get location failure:",
          "content": "HTTP/1.1 403 Get location failure\n{\n  code : 403\n  error: \"Get location failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/notifications",
    "title": "GetAllNotifitions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>Supplier_id want to get Notifitions</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllNotifitions",
    "group": "Supplier",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Read all Notifitions of supplier_id</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/dasdsadsad/notifions",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of awards options (Array of Awards).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n   notification_id: string,\n   supplier_id: string,\n   title: string,\n   body: string,\n   image_url: string,\n   time_start_push: string,\n   time_end_push: string,\n   max_push_per_user: string,\n   max_user_push: Number,\n   tags: [string]\n   status: string,\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Get awards failure:",
          "content": "HTTP/1.1 403 Get awards failure\n{\n  code : 403\n  error: \"Get Awards failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/",
    "title": "GetAllSupplier",
    "version": "0.1.0",
    "name": "GetAllSupplier",
    "group": "Supplier",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Lấy tất cả supplier hiện có với thông tin cơ bản</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of Suppliers options (Array of Suppliers).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n     supplier_id: \"string\",\n     name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get supplier failure:",
          "content": "HTTP/1.1 403 Get supplier failure\n{\n  \"error\": \"Get supplier failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/events/:event_id/users",
    "title": "GetAllUserInEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "event_id",
            "description": "<p>want to get all user</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetAllUserInEvent",
    "group": "Supplier",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Lấy danh sách người chơi tham gia sự kiện</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/events/abcde/users",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Result supplier info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    event_id: \"string\",\n    user_id: \"string\",\n    start_time: Number,\n    end_time: Number,\n    status: \"string\",\n    user_tasks: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User Event not available:",
          "content": "HTTP/1.1 406 User Event not available\n{\n  \"code\": 406\n  \"error\": \"User Event not available\"\n}",
          "type": "json"
        },
        {
          "title": "Event not available:",
          "content": "HTTP/1.1 407 Event not available\n{\n  \"code\": 407\n  \"error\": \"Event not available\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/me",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>want to get info</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Supplier",
    "permission": [
      {
        "name": "Supplier"
      }
    ],
    "description": "<p>Get supplier info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/abcde",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Result supplier info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    supplier_id: \"string\",\n    name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Load event detail failure:",
          "content": "HTTP/1.1 403 Load event detail failure\n{\n   \"code\": 403\n  \"error\": \"Load event detail failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "get",
    "url": "suppliers/:supplier_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "supplier_id",
            "description": "<p>want to get info</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Supplier",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Get supplier info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /suppliers/abcde",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Result supplier info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    supplier_id: \"string\",\n    name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Load event detail failure:",
          "content": "HTTP/1.1 403 Load event detail failure\n{\n   \"code\": 403\n  \"error\": \"Load event detail failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "post",
    "url": "suppliers/signin",
    "title": "SignIn",
    "version": "0.1.0",
    "name": "SignIn",
    "group": "Supplier",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Supplier SignIn</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /suppliers/signin",
        "type": "json"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example-InBody:",
          "content": "{\n   username: \"username\",\n   password: \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>List of Suppliers options (Array of Suppliers).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    supplier_id: \"string\",\n    name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\",\n    username: \"string\",\n    access_token: \"string\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User is not existed:",
          "content": "HTTP/1.1 403 Not Authenticated\n{\n  \"code\": 403\n  \"error\": \"supplier is not existed\"\n}",
          "type": "json"
        },
        {
          "title": "User is not existed:",
          "content": "HTTP/1.1 404 Not Authenticated\n{\n  \"code\": 404\n  \"error\": \"Missing missing username or passoword key\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "post",
    "url": "suppliers/signup",
    "title": "SignUp",
    "version": "0.1.0",
    "name": "SignUp",
    "group": "Supplier",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Supplier SignUp</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /suppliers/signup",
        "type": "json"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example-InBody:",
          "content": "{\n   admin: {\n      username: \"username\",\n      password: \"password\"\n   }\n   supplier: {\n     username: \"username\",\n     password: \"password\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Result supplier info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    supplier_id: \"string\",\n    name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\",\n    username: \"string\",\n    access_token: \"string\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Supplier data empty:",
          "content": "HTTP/1.1 406 Supplier data empty\n{\n  \"code\": 406\n  \"error\": \"supplier data empty\"\n}",
          "type": "json"
        },
        {
          "title": "username or password not availabe",
          "content": "HTTP/1.1 407 UserName Or Password not available\n{\n  \"code\": 407\n  \"error\": \"UserName Or Password not available\"\n}",
          "type": "json"
        },
        {
          "title": "Authoried admin failure",
          "content": "HTTP/1.1 408 Authoried admin fail\n{\n  \"code\": 408\n  \"error\": \"Authoried admin fail\"\n}",
          "type": "json"
        },
        {
          "title": "Create new supplier failure",
          "content": "HTTP/1.1 409 Create new supplier failure\n{\n  \"code\": 409\n  \"error\": \"Create new supplier failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "put",
    "url": "suppliers",
    "title": "UpdateInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "supplier",
            "description": "<p>access_token require</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody:",
          "content": "{\n   name: \"{string}\",\n   company_info: {\n       url: \"asdasd\"\n   },\n   ..... (more field in supplier)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateInfo",
    "group": "Supplier",
    "permission": [
      {
        "name": "admin, supplier"
      }
    ],
    "description": "<p>Supplier Update</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /suppliers =asdfsdf",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Result supplier info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: [\n    supplier_id: \"string\",\n    name: \"string\",\n    image_urL: \"string\",\n    level: Number,\n    company_info: {\n      company_name: \"string\"\n    },\n    supplier_status: \"string\",\n    tags: \"[string]\",\n    username: \"string\",\n    access_token: \"string\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Missing access token:",
          "content": "HTTP/1.1 401 Missing access token\n{\n  \"code\": 401\n  \"error\": \"Missing access token\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail with error:",
          "content": "HTTP/1.1 402 Update fail with error\n{\n  \"code\": 402\n  \"error\": \"Update fail with error + error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/SupplierController.js",
    "groupTitle": "Supplier"
  },
  {
    "type": "post",
    "url": "tasks?access_token",
    "title": "Create Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n       supplier_id: \"string\",\n       name: \"string\",\n       detail: \"string\",\n       thumbnail_url: \"string\",\n       cover_url: \"string\",\n       detail_url: \"string\",\n       start_time: Number,\n       end_time: Number,\n       created_date: Number,\n       task_info: {Object task},\n       tags: \"[string]\",\n       award_ids: [string],\n       max_num_finish_task: Number,\n       current_num_finish_task: Number,\n       next_tasks: [string],\n       previous_tasks_require: [string]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "CreateTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Create Task</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /tasks",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Task detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   task_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\",\n   priority: Number,\n   limit_user: Number,\n   rule: Object,\n   award_ids: [string],\n   task_ids: [string],\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Create task failure:",
          "content": "HTTP/1.1 402 Create task failure\n{\n  code : 402\n  error: \"Create task failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/TaskController.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "delete",
    "url": "tasks/:task_id?access_token",
    "title": "Delete Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "task_id",
            "description": "<p>Task_ID want to Delete</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "DeleteTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Delete Task</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /tasks/sdfdsafa?access_token=asdfdsaf",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Delete Task Failure:",
          "content": "HTTP/1.1 402 Delete Task Failure\n{\n  code : 402\n  error: \"Delete Task Failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/TaskController.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "tasks/:task_id",
    "title": "GetDetail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "task_id",
            "description": "<p>Task_ID want to get detail</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "name": "GetDetail",
    "group": "Tasks",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Read task detail info</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /tasks/dasdsadsad",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Task detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   task_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   detail: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   task_info: {Object task},\n   tags: \"[string]\",\n   award_ids: [string],\n   max_num_finish_task: Number,\n   current_num_finish_task: Number,\n   next_tasks: [string],\n   previous_tasks_require: [string]\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get tasks failure:",
          "content": "HTTP/1.1 402 Get tasks failure\n{\n  code : 402\n  error: \"Get tasks failure\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/TaskController.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "put",
    "url": "tasks/:task_id?access_token",
    "title": "Update Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "task_id",
            "description": "<p>Task_ID want to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "access_token",
            "description": "<p>Authorized access_token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-InBody-Required:",
          "content": "{\n    task_id: \"string\",\n       supplier_id: \"string\",\n       name: \"string\",\n       detail: \"string\",\n       thumbnail_url: \"string\",\n       cover_url: \"string\",\n       detail_url: \"string\",\n       start_time: Number,\n       end_time: Number,\n       created_date: Number,\n       task_info: {Object task},\n       tags: \"[string]\",\n       award_ids: [string],\n       max_num_finish_task: Number,\n       current_num_finish_task: Number,\n       next_tasks: [string],\n       previous_tasks_require: [string]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "name": "UpdateTask",
    "group": "Tasks",
    "permission": [
      {
        "name": "supplier or admin"
      }
    ],
    "description": "<p>Update Task</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /tasks/sdfdsafa?access_token=?",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Code Success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Task detail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 200,\n  data: {\n   task_id: \"string\",\n   supplier_id: \"string\",\n   name: \"string\",\n   sub_name: \"string\",\n   thumbnail_url: \"string\",\n   cover_url: \"string\",\n   policy_url: \"string\",\n   detail_url: \"string\",\n   start_time: Number,\n   end_time: Number,\n   created_date: Number,\n   location_info: {Object Location},\n   tags: \"[string]\",\n   priority: Number,\n   limit_user: Number,\n   rule: Object,\n   award_ids: [string],\n   task_ids: [string],\n   status: string\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Access token not true:",
          "content": "HTTP/1.1 401 Access token not true\n{\n  code : 401\n  error: \"Access token not true\"\n}",
          "type": "json"
        },
        {
          "title": "Update fail:",
          "content": "HTTP/1.1 402 Update fail\n{\n  code : 402\n  error: \"Update fail with error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/TaskController.js",
    "groupTitle": "Tasks"
  }
] });
