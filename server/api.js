var express = require('express');

// router is similar to an app (express()) but helps with modularity?
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// This functions is used in every api call to connect with the mongo product database
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/products', (err, db) => {
        if (err) {
            return console.log(err);
        }
        closure(db);
    });
}

router.get('/products', (req, res) => {
    connection((db) => {
        if (db) {
            db.db('test').collection('products')
                .find({ "DE_CATE": req.query.DE_CATE, "DE_EQUI": req.query.DE_EQUI, "DE_FAMI": req.query.DE_FAMI })
                .sort({"ID_ITEM": 1})
                .toArray().then((products) => {
                    if (products) {
                        res.json(products);
                    } else {
                        res.status(403).send('The request to get products is valid but there is a server error');
                    }
                })
        } else {
            res.status(503).send('Error when connecting to database');
            return;
        }
    });
})

router.get('/distinctcategory', (req, res) => {
    connection((db) => {
        if (db) {
            db.db('test').collection('products')
                .distinct('DE_CATE')
                .then((distinctValues) => {
                    if (distinctValues) {
                        res.json(distinctValues);
                    } else {
                        res.status(403).send('The request to get distinct category is valid but there is a server error');
                    }
                })
        } else {
            res.status(503).send('Error when connecting to database');
            return;
        }
    });
})

router.get('/distinctbrand', (req, res) => {
    connection((db) => {
        if (db) {
            db.db('test').collection('products')
                .distinct('DE_EQUI', { 'DE_CATE': req.query.selectedCategory })
                .then((distinctValues) => {
                    if (distinctValues) {
                        res.json(distinctValues);
                    } else {
                        res.status(403).send('The request to get distinct brand is valid but there is a server error');
                    }
                })
        } else {
            res.status(503).send('Error when connecting to database');
            return;
        }

    });
})

router.get('/distinctfamily', (req, res) => {
    connection((db) => {
        if (db) {
            db.db('test').collection('products')
                .distinct('DE_FAMI', { 'DE_CATE': req.query.selectedCategory, 'DE_EQUI': req.query.selectedBrand })
                .then((distinctValues) => {
                    if (distinctValues) {
                        res.json(distinctValues);
                    } else {
                        res.status(403).send('The request to get distinct family is valid but there is a server error');
                    }
                })
        } else {
            res.status(503).send('Error when connecting to database');
            return;
        }
    });
})

module.exports = router;