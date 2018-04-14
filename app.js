var gij = { // as gij stock
    gui: '',
    sn: '',
    value: 0,
    createddate: '',
    importeddate: '',
    isused: false,
}
var usergij = {
    usergui: '',
    sn: '',
    gijgui: '',
    gijvalue: 0,
    usedtime: '',
    ref: '',
    gijpocketgui: '',
}
var gijpocket = {
    gui: '',
    usergui: '',
    createddate: '',
    totalvalue: 0,
    totalspent: 0,
}
var gijpayment = {
    gui: '',
    usergui: '',
    paymenttime: '',
    payemntvalue: 0,
    ref: '',
}
//*** DESIGN */
var __design_gij = {
    "_id": "_design/objectList",
    "views": {
        "findeCreatedDate": {
            "map": "function(doc) {\r\n    if(doc.createddate) {\r\n        emit(doc.createddate,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.createddate) {\r\n        emit(doc.createddate,doc);\r\n    }\r\n}"
        },

        "findeImportedDate": {
            "map": "function(doc) {\r\n    if(doc.importeddate) {\r\n        emit(doc.importeddate,doc);\r\n    }\r\n}"
        },
        "countByImportedDate": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.importeddate) {\r\n        emit(doc.importeddate,doc);\r\n    }\r\n}"
        },
        "findSN": {
            "map": "function(doc) {\r\n    if(doc.sn) {\r\n        emit(doc.sn,doc);\r\n    }\r\n}"
        },
        "findIsUsed": {
            "map": "function(doc) {\r\n            emit(doc.isused,doc);\r\n    }"
        },
        "countIsUsed": {
            "reduce": "_count",
            "map": "function(doc) {\r\n            emit(doc.isused,doc);\r\n    }"
        },
        "countAll": {
            "reduce": "_count",
            "map": "function(doc) {\r\n            emit(null,doc);\r\n    }"
        }
    },
    "language": "javascript"
};
var __design_usergij = {
    "_id": "_design/objectList",
    "views": {
        "findPaymentRef": {
            "map": "function(doc) {\r\n    if(doc.ref) {\r\n        emit([doc.ref],doc);\r\n    }\r\n}"
        },
        "findUsedTime": {
            "map": "function(doc) {\r\n   emit([doc.usedtime],doc);\r\n    }"
        },
        "countUsedTime": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   emit([doc.usedtime],doc);\r\n    }"
        },
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "findByPocketGUI": {
            "map": "function(doc) {\r\n    if(doc.pocketgui) {\r\n        emit(doc.pocketgui,doc);\r\n    }\r\n}"
        },
        "countByPocketGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.pocketgui) {\r\n        emit(doc.pocketgui,doc);\r\n    }\r\n}"
        },
        "findSN": {
            "map": "function(doc) {\r\n    if(doc.sn) {\r\n        emit(doc.sn,doc);\r\n    }\r\n}"
        },
        "findByGIJGUI": {
            "map": "function(doc) {\r\n    if(doc.gijgui) {\r\n        emit(doc.gijgui,doc);\r\n    }\r\n}"
        },
        "countByGIJGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.gijgui) {\r\n        emit(doc.gijgui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
var __design_gijpocket = {
    "_id": "_design/objectList",
    "views": {
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
var __design_gijpayment = {

    "_id": "_design/objectList",
    "views": {
        "findPaymentRef": {
            "map": "function(doc) {\r\n    if(doc.ref) {\r\n        emit([doc.ref],doc);\r\n    }\r\n}"
        },
        "findPaymenTime": {
            "map": "function(doc) {\r\n   emit([doc.paymenttime],doc);\r\n    }"
        },
        "countPaymenTime": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   emit([doc.paymenttime],doc);\r\n    }"
        },
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
initDB();

function initDB() {
    init_db('gij', __design_gij);
    init_db('usergij', __design_usergij);
    init_db('gijpocket', __design_gijpocket);
    init_db('gijpayment', gijpayment);
    //init_db('users', __design_users);
}

function init_db(dbname, design) {
    // create a new database
    var db;
    async.eachSeries([
        db = create_db(dbname),
        db = nano.use(dbname),
        db.insert(design, function (err, res) {
            if (err) {
                db.get('_design/objectList', function (err, res) {
                    if (err) console.log('could not find design ' + err.message);
                    else {
                        if (res) {
                            var d = res;
                            //console.log("d:"+JSON.stringify(d));
                            db.destroy('_design/objectList', d._rev, function (err, res) {
                                if (err) console.log(err);
                                else {
                                    //console.log(res);
                                    db.insert(design, "_design/objectList", function (err, res) {
                                        if (err) console.log('err insert new design ' + dbname);
                                        else {
                                            //console.log('insert design completed ' + dbname);
                                        }
                                    });
                                }
                            });
                        } else {
                            // console.log("could not find design");
                        }
                    }
                });
            } else {
                //console.log('created design ' + dbname);
            }

        })
    ], function (err) {
        console.log('exist ' + dbname);
    });
    //db = nano.use(dbname);
    //return db;
}

function init_redis() {
    r_client.flushdb(function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
    });
}

function create_db(dbname) {
    let db;
    nano.db.create(dbname, function (err, body) {
        // specify the database we are going to use    
        if (!err) {
            console.log('database ' + dbname + ' created!');
        } else
            console.log(dbname + " could not be created!");
    });
    db = nano.use(dbname);
    return db;
};
var util = require('util');
    const async = require('async');
    const uuidV4 = require('uuid/v4');
    const nano = require('nano')('http://admin:admin@localhost:5984');
    // const cors = require('cors');
    const fs = require('fs');
    const redis = require("redis");
    // const __browser = require('detect-browser');
    var r_client = redis.createClient();
    var moment = require('moment-timezone');
    var multer = require('multer');
    var path = require('path');
    var passwordValidator = require('password-validator');
    var passValidator = new passwordValidator();
    var userValidator = new passwordValidator();
    var phoneValidator = new passwordValidator();
    const Q = require('q');
    // const bodyParser = require('body-parser');
    // var methodOverride = require('method-override');
    // app.use(bodyParser.json());
    // app.use(methodOverride());
    // app.use(cors());
    // app.use(errorHandler);
    __design_view = "objectList";

    function convertTZ(fromTZ) {
        return moment.tz(fromTZ, "Asia/Vientiane").format();
    }

    function errorHandler(err, req, res, next) {
        console.log(err);
        var l = {
            log: err,
            logdate: convertTZ(new Date()),
            type: "error",
            gui: uuidV4()
        };
        errorLogging(l);
        if (res.headersSent) {
            return next(err);
        }
        res.status(500);
        res.render('error', {
            error: err
        });
    }
