define({ "api": [
  {
    "type": "delete",
    "url": "/:db",
    "title": "Delete DB",
    "version": "1.0.0",
    "group": "DB",
    "name": "deleteDB",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "db",
            "description": "<p>DB name (should exist)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Acess key value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"DB successfully deleted.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/endpoints.js",
    "groupTitle": "DB"
  },
  {
    "type": "put",
    "url": "/:db",
    "title": "Create new DB",
    "version": "1.0.0",
    "group": "DB",
    "name": "putDB",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "db",
            "description": "<p>DB name (should be unique)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Acess key value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"DB successfully created.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/endpoints.js",
    "groupTitle": "DB"
  },
  {
    "type": "post",
    "url": "/:db/:table/get",
    "title": "Get items",
    "version": "1.0.0",
    "group": "Items",
    "name": "getItem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "db",
            "description": "<p>DB name (should exist)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table",
            "description": "<p>Table name (should exist)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Array of found objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": [\n    {\"id\": \"uid1\", \"type\": \"a\"},\n    {\"id\": \"uid2\", \"type\": \"c\"}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/endpoints.js",
    "groupTitle": "Items"
  },
  {
    "type": "delete",
    "url": "/:db/:table",
    "title": "Delete table",
    "version": "1.0.0",
    "group": "Table",
    "name": "deleteTable",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "db",
            "description": "<p>DB name (should exist)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table",
            "description": "<p>Table name (should exist)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Acess key value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"Table successfully deleted.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/endpoints.js",
    "groupTitle": "Table"
  },
  {
    "type": "put",
    "url": "/:db/:table",
    "title": "Create new table",
    "version": "1.0.0",
    "group": "Table",
    "name": "putTable",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "db",
            "description": "<p>DB name (should exist)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table",
            "description": "<p>Table name (should be unique)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Acess key value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"Table successfully created.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "lib/endpoints.js",
    "groupTitle": "Table"
  }
] });
