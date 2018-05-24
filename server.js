var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var collection;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    collection = db.collection('products');
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.get("/distinctcategory", function (req, res) {
    collection.distinct('DE_CATE', function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get distinct categories.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.get("/distinctbrand", function (req, res) {
    collection.distinct('DE_EQUI', { 'DE_CATE': req.query.selectedCategory }, function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get distinct brands.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.get("/distinctfamily", function (req, res) {
    collection.distinct('DE_FAMI', { 'DE_CATE': req.query.selectedCategory, 'DE_EQUI': req.query.selectedBrand }, function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get distinct families.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.get("/products", function (req, res) {
    collection.find({ "DE_CATE": req.query.DE_CATE, "DE_EQUI": req.query.DE_EQUI, "DE_FAMI": req.query.DE_FAMI })
        .sort({ "ID_ITEM": 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get products.");
            } else {
                res.status(200).json(docs);
            }
        });
});

