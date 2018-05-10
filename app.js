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
    ref: [],
    owners: [],
    gijpocketgui: '',
}
var gijpocket = {
    gui: '',
    usergui: '',
    createddate: '',
    totalvalue: 0, // total value left
    totalspent: 0, // total spent all time
    totalgij: 0, // total gij left
    sumgij: 0, // total gij consumed all time
}
var gijpayment = {
    gui: '',
    usergui: '',
    paymenttime: '',
    paymentvalue: 0,
    ref: '',
    sender: '',
    receiver: '',
    sendingvalue: 0,
    receivingvalue: 0,
    paymentype: '',
}
var serviceprovider = {
    gui: '',
    servicename: '',
    description: '',
    discount: .1
}
var package = {
    gui: '',
    packagename: '',
    packagevalue: 0,
    description: '',
    createddate: '',
    serviceprovider: [],
    isactive: false
}
var customers = {
    gui: '',
    usergui: '',
    currentpackage = [{
        packagegui: '',
        starttime: '',
        endtime: '',
        paymentgui: ''
    }],
    createddate: '',
    lastupdate: '',
    isactive: true,

}

//*** DESIGN */
var __design_serviceprovider = {
    "_id": "_design/objectList",
    "views": {
        "findByGUI": {
            "map": "function(doc) {\r\n    if(doc.gui) {\r\n        emit(doc.gui,doc);\r\n    }\r\n}"
        },
        "countByGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.gui) {\r\n        emit(doc.gui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
var __design_package = {
    "_id": "_design/objectList",
    "views": {
        "findByGUI": {
            "map": "function(doc) {\r\n    if(doc.gui) {\r\n        emit(doc.gui,doc);\r\n    }\r\n}"
        },
        "countByGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.gui) {\r\n        emit(doc.gui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
var __design_customer = {
    "_id": "_design/objectList",
    "views": {
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "reduce": "_count",
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        }
    },
    "language": "javascript"
};
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
            "map": "function(doc) {\r\n    if(doc.ref) {\r\n        emit([doc.ref,doc.gui],doc);\r\n    }\r\n}"
        },
        "findUsedTime": {
            "map": "function(doc) {\r\n   emit([doc.usedtime,doc.gui],doc);\r\n    }"
        },
        "countUsedTime": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   emit([doc.usedtime,doc.gui],doc);\r\n    }"
        },
        "findAvailableGij": {
            "map": "function(doc) {\r\n   if(doc.usedtime&&doc.gui) emit(doc.gui,doc);\r\n    }"
        },
        "countAvailableGij": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   if(doc.usedtime&&doc.gui) emit(doc.gui,doc);\r\n    }"
        },
        "findUsedGij": {
            "map": "function(doc) {\r\n   if(!doc.usedtime&&doc.gui) emit(doc.gui,doc);\r\n    }"
        },
        "countUsedGij": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   if(!doc.usedtime&&doc.gui) emit(doc.gui,doc);\r\n    }"
        },
        "sumAllGij": {
            "reduce": "_sum",
            "map": "function(doc) {\r\n   emit(doc.pocketgui,doc.gijvalue);\r\n    }"
        },
        "sumSpent": {
            "reduce": "_sum",
            "map": "function(doc) {\r\n  if(doc.usedtime) emit(doc.pocketgui,doc.gijvalue);\r\n    }"
        },
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "reduce": "_count",
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
            "reduce": "_count",
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
        "findPaymentTime": {
            "map": `function (doc) {
                var d = new Date(doc.paymenttime);
                             if (d != null) {
                                 var key = [d.getFullYear(),
                                            (d.getMonth()+1),
                                            d.getDate()];
                                            
                                     emit(key, doc);
                             }
                             
                             //emit(null,d.getMonth());
             }`
        },
        "countPaymenTime": {
            "reduce": "_count",
            "map": "function(doc) {\r\n   emit([doc.paymenttime],doc);\r\n    }"
        },
        "findByUserGUI": {
            "map": "function(doc) {\r\n    if(doc.usergui) {\r\n        emit(doc.usergui,doc);\r\n    }\r\n}"
        },
        "countByUserGUI": {
            "reduce": "_count",
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
    init_db('gijpayment', __design_gijpayment);
    init_db('gijserviceprovider', __design_serviceprovider);
    init_db('gijpackage', __design_package);
    init_db('gijcustomer', __design_customer);
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
const express = require('express');
const app = express();
app.set('trust proxy', true);
var r_client = redis.createClient();
var moment = require('moment-timezone');
var multer = require('multer');
var path = require('path');
var passwordValidator = require('password-validator');

const Q = require('q');

var _current_system = 'gij';
var _client_prefix = ['ice-maker', 'gij', 'web-post', 'user-management', 'default'];
var _system_prefix = ['ice-maker', 'gij', 'web-post', 'user-management'];

const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server
    //port: 8081,
    //   perMessageDeflate: {
    //     zlibDeflateOptions: { // See zlib defaults.
    //       chunkSize: 1024,
    //       memLevel: 7,
    //       level: 3,
    //     },
    //     zlibInflateOptions: {
    //       chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     clientMaxWindowBits: 10,       // Defaults to negotiated value.
    //     serverMaxWindowBits: 10,       // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10,          // Limits zlib concurrency for perf.
    //     threshold: 1024,               // Size (in bytes) below which messages
    //                                    // should not be compressed.
    //   }
});

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


var _usermanager_host = 'http://localhost:6688';

r_client.monitor(function (err, res) {
    console.log("Entering monitoring mode.");
});
r_client.on("monitor", function (time, args, raw_reply) {
    //console.log(time + ": " + args); // 1458910076.446514:['set', 'foo', 'bar']
    args = args.toString();
    if (args.indexOf('set') != 0) //capture the set command only
        return;
    //args=args.replace('\\','');
    let js = JSON.parse(args.substring(args.indexOf('{'), args.lastIndexOf('}') + 1));
    let arr = args.split(',');
    //console.log(arr);
    let command = arr[0];
    let key = arr[1];
    let mode = '';
    let timout = 0;
    if (arr[arr.length - 1].indexOf('}') < 0) {
        mode = arr[arr.length - 2];
        timeout = arr[arr.length - 1]
    }
    let clients = wss.clients;
    if (command == "set")
        wss.clients.forEach(function each(ws) {
            const element = ws;
            //console.log(element);
            if (_current_system + "_client_" + element.gui == key) {
                console.log('client-changed');
                element.send(JSON.stringify(js));
            }
            if (_current_system + "_error_" + element.gui == key) {
                console.log('error-changed');
                element.send(JSON.stringify(js));
                var l = {
                    log: JSON.stringify(js),
                    logdate: convertTZ(new Date()),
                    type: "error",
                    gui: uuidV4()
                };
                errorLogging(l);
            }
            if (element['client'] !== undefined) {
                if (_current_system + "_login_" + element.client.logintoken == key) {
                    console.log('login-changed');
                    element.send(JSON.stringify(js));
                }
                if (_current_system + "_usergui_" + element.client.logintoken == key) {

                    console.log('gui-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
                if (_current_system + "_forgot_" + element.client.logintoken == key) {

                    console.log('forgot-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
                if (_current_system + "_phone_" + element.client.logintoken == key) {

                    console.log('phone-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
                if (_current_system + "_secret_" + element.client.logintoken == key) {

                    console.log('secret-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
                if (_current_system + "_message_" + element.client.logintoken == key) {

                    console.log('message-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
                if (_current_system + "_notification_" + element.client.logintoken == key) {

                    console.log('notification-changed');
                    if (_system_prefix.indexOf(element.client.prefix) > -1)
                        element.send(JSON.stringify(js));
                }
            }
        });
});

function setPhoneStatus(client, secret) {
    r_client.set(_current_system + '_phone_' + client.gui, JSON.stringify({
        command: 'phone-changed',
        secret: secret
    }), 'EX', 60 * 3);
}

function setUserGUIStatus(client, gui) {
    r_client.set(_current_system + '_usergui_' + client.logintoken, JSON.stringify({
        command: 'usergui-changed',
        gui: gui
    }), 'EX', 60 * 5);
}

function setLoginStatus(client) {
    r_client.set(_current_system + '_login_' + client.logintoken, JSON.stringify({
        command: 'login-changed',
        client: client
    }), 'EX', 60 * 5);
}

function setForgotStatus(client) {
    r_client.set(_current_system + '_forgot_' + client.gui, JSON.stringify({
        command: 'forgot-changed',
        forgot: keys
    }), 'EX', 60 * 3);
}

function setClientStatus(client) {
    r_client.set(_current_system + '_client_' + client.gui, JSON.stringify({
        command: 'client-changed',
        client: client
    }), 'EX', 60 * 5);
}

function setOnlineStatus(client) {
    try {
        r_client.get('_online_' + client.username, (err, res) => {
            if (err) {
                client.data.message = err;
                setErrorStatus(client);
            } else {
                let arr = [{
                    logintoken: client.logintoken,
                    loginip: client.loginip,
                    clientip: client.clientip,
                    gui: client.gui
                }];
                if (res) {
                    res = JSON.parse(res);
                    if (res.client.login !== undefined) {
                        // res.client.login.push(arr[0]);
                        // arr=res.login;
                        let exist = false;
                        for (let index = 0; index < res.client.login.length; index++) {
                            const element = res.client.login[index];
                            if (element.gui === client.gui && element.clientip === client.clientip && element.loginip === client.loginip) {
                                exist = true;
                                console.log('exist');
                                break;
                            }
                        }
                        if (!exist) {
                            arr = res.client.login.concat(arr);
                        }
                    }
                }
                r_client.set('_online_' + client.username, JSON.stringify({
                    command: 'online-changed',
                    client: {
                        username: client.username,
                        onlinetime: convertTZ(new Date()),
                        system: _current_system,
                        login: arr,
                    }
                }), 'EX', 60 * 5);
            }
        });
    } catch (error) {
        console.log(error);
        client.data.message = error;
        setErrorStatus(client);
    }
}

function setErrorStatus(client) {
    r_client.set(_current_system + '_error_' + client.logintoken, JSON.stringify({
        command: 'error-changed',
        client: client
    }), 'EX', 60 * 5);
}

function setNotificationStatus(client) {
    r_client.set(_current_system + '_notification_' + client.logintoken, JSON.stringify({
        command: 'notification-changed',
        client: data
    }), 'EX', 60 * 5); // client side could not see this , the other server as a client can see this .
}

function LTCserviceSMS(c) {
    try {
        let client = JSON.parse(JSON.stringify(c));
        client.data.command = 'send-sms'
        client.prefix = 'gij';
        let ws_client = new WebSocket('ws://nonav.net:8081/'); //ltcservice
        ws_client.binaryType = 'arraybuffer';
        ws_client.on('open', function open() {
            ws_client.send(JSON.stringify(client), function (err) {
                if (err) {
                    client.data.message = err;
                    client.data.sms.content = '';
                    setErrorStatus(client);
                }
                console.log('socket open...');

            });
        });
        ws_client.on('message', function incoming(data) {
            console.log("RECIEVED  FROM SMS : ");
            client =  JSON.parse(ab2str(data));
            //console.log(client);
            client.data.sms.content = '';
            client.data['notification'] = 'SMS has been sent out';
            client.prefix = '';

            setNotificationStatus(client);
            //setOnlineStatus(client);

        });
        ws_client.on("error", (err) => {
            client.data.message = err;
            setErrorStatus(client);
        });
    } catch (error) {
        client.data.message = err;
        setErrorStatus(client);
    }

}

function commandReader(js) {
    const deferred = Q.defer();
    // const isValid=validateTopup(js.client);
    // if(!isValid.length)
    getUserInfoByLoginToken(js).then(res => {
        if (res) {
            switch (js.client.data.command) {
                case 'register-gij':
                    register_gij_ws(js).then(res => {
                        deferred.resolve(res);
                    }).catch(err => {
                        deferred.reject(err);
                    });
                    break;
                case 'sum-gij':
                    sum_gij_ws(js).then(res => {
                        deferred.resolve(res);
                    }).catch(err => {
                        deferred.reject(err);
                    });
                    break;
                case 'check-gij':
                    check_gij_ws(js).then(res => {
                        deferred.resolve(res);
                    }).catch(err => {
                        deferred.reject(err);
                    });
                    break;
                case 'check-pocket':
                    check_pocket_ws(js).then(res => {
                        deferred.resolve(res);

                    }).catch(err => {
                        deferred.reject(err);
                    });
                    break;
                case 'transfer-gij':
                    transfer_gij_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);

                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'get-payment-list':
                    get_payment_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                    // case 'topup-gij-request':
                    //     topup_gij_ws(js).then(res => {
                    //         deferred.resolve(res);
                    //         //console.log(res);

                    //     }).catch(err => {
                    //         //console.log(err);
                    //         deferred.reject(err);
                    //     });
                    //     break;
                    // case 'list-topup-gij-request':
                    //     list_topup_gij_ws(js).then(res => {
                    //         deferred.resolve(res);
                    //         //console.log(res);

                    //     }).catch(err => {
                    //         //console.log(err);
                    //         deferred.reject(err);
                    //     });
                    //     break;
                case 'pay-gijservice':
                    pay_gijservice(js).then(res => { // pay for service such as : topup
                        deferred.resolve(res);
                        //console.log(res);
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'get-gijpackage':
                    getGijPackages(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'check-gij-stock': // ADMiN ONLY
                    check_gij_stock_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);

                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'import-gij-stock': // ADMiN ONLY
                    check_gij_stock_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);

                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'generate-gij-stock': // ADMiN ONLY
                    check_gij_stock_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);

                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'topup-gij': // ADMiN ONLY
                    topup_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);

                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'approve-topup-gij-request': // ADMiN ONLY
                    topup_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'approve-list-topup-gij-request': // ADMiN ONLY
                    topup_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                    // case 'system-prefix':
                    //     deferred.resolve(get_system_prefix());
                    // break;
                default:
                    break;
            }
        } else {
            js.client.data.message = new Error('ERROR not found the key');
            deferred.reject(js);
        }
    }).catch(err => {
        js.client.data.message = err;
        deferred.reject(js);
    });
    return deferred.promise;
}

function getUserInfoByLoginToken(js) {
    let deferred = Q.defer();
    try {
        let client = js.client;
        client.command = 'get-user-gui';
        client.prefix = 'gij';
        let ws_client = new WebSocket('ws://nonav.net:6688/'); // user-management
        ws_client.binaryType = 'arraybuffer';
        ws_client.on('open', function open() {
            ws_client.send(JSON.stringify(client), function (err) {
                if (err) {
                    setErrorStatus(client);
                    deferred.reject(err);
                }
            });
        });
        ws_client.on('message', function incoming(data) {
            client =  JSON.parse(ab2str(data));
            delete data.prefix;
            //delete data.res.SendSMSResult.user_id;
            //js.client=data;
            setUserGUIStatus(client, data.data.user.gui);
            if (data.data.user.gui) {
                data.data.command = js.client.data.command;
                js.client = data;
                deferred.resolve(js);
            } else {
                deferred.reject(new Error('Error user not login'))
            }

        });
        ws_client.on("error", (err) => {
            //js.client.data.message=err;
            setErrorStatus(client);
            deferred.reject(err);

        });
    } catch (error) {
        console.log(error);
        //js.client.data.message=error;
        setErrorStatus(client);
        deferred.reject(error);
    }

    return deferred.promise;
}

function register_gij_ws(js) {
    let deferred = Q.defer();
    try {
        findGijPocketByGUI(js.client.data.user.gui).then(res => {
            if (res) {
                js.client.data.message = new Error('Error pocket exist');
                deferred.reject(js);
            } else {
                let db = create_db('gijpocket')
                const p = {
                    gui: uuidV4(),
                    usergui: js.client.data.user.gui,
                    createddate: convertTZ(new Date()),
                    totalvalue: 0,
                    totalspent: 0,
                };
                db.insert(p, p.gui, (err, res) => {
                    if (err) {
                        js.client.data.message = err;
                        deferred.reject(js);
                    } else {
                        js.client.data.message = 'OK register';
                        filterObject(js.client.data);
                        deferred.resolve(js);
                    }
                });
            }
        }).catch(err => {
            js.client.data.message = err;
            deferred.reject(js);
        });
    } catch (error) {
        js.client.data.message = error;
        deferred.reject(js);
    }

    return deferred.promise;
}

function findGijPocketByGUI(gui) {
    let deferred = Q.defer();
    let db = create_db('gijpocket');
    db.view(__design_view, 'findByPocketGUI', {
        key: gui + '',
        limit: 1
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            if (res.rows.length) {
                deferred.resolve(res.rows[0].value);
            } else {
                deferred.reject('');
            }
        }
    });
    return deferred.promise;
}

function getPocketByUserGUI(ugui) {
    let deferred = Q.defer();
    let db = create_db('gijpocket');
    db.view(__design_view, 'findByUserGUI', {
        key: gui + '',
        limit: 1
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            if (res.rows.length) {
                deferred.resolve(res.rows[0].value);
            } else {
                deferred.reject('');
            }
        }
    });
    return deferred.promise;
}

function check_pocket_ws(js) {
    let deferred = Q.defer();
    try {
        getPocketByUserGUI(js.client.data.user.gui).then(res => {
            if (res) {
                js.client.data.message = 'OK'
                js.client.data.gijpocket = res;
                filterObject(js.client.data);
                deferred.resolve(js);
            } else {
                js.client.data.message = new Error('Error no pocket');
                deferred.reject(js);
            }
        }).catch(err => {
            js.client.data.message = err;
            deferred.reject(js);
        });
    } catch (error) {
        js.client.data.message = error;
        deferred.reject(js);
    }

    return deferred.promise;
}

function check_exist_pocket(gui) {
    let deferred = Q.defer();
    findGijPocketByGUI(gui).then(res => {
        let arr = [];
        for (let index = 0; index < res.rows.length; index++) {
            const element = res.rows[index].value;
            arr.push(element);
        }
        deferred.resolve(arr);
    }).catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;
}

function getCountGij(pgui) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    try {
        db.view(__design_view, 'countByPocketGUI', {
            key: pgui + ''
        }, (err, res) => {
            if (err) deferred.reject(err);
            else {
                if (res.rows.length) {
                    deferred.resolve(rews.rows[0].value);
                } else {
                    deferred.reject(new Error('ERROR no gij found'));
                }
            }
        });
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

function getGijList(pgui, page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    try {
        getCountGij(pgui).then(res => {
            let count = res;
            if (!maxpage || maxpage === undefined || maxpage > 100)
                maxpage = 10;
            if (!page || page === undefined)
                page = 1;
            db.view(__design_view, 'findByPocketGUI', {
                key: pgui + '',
                limit: maxpage,
                skip: page,
                descending: true
            }, (err, res) => {
                if (err) deferred.reject(err);
                else {
                    let arr = [];
                    for (let index = 0; index < res.rows.length; index++) {
                        const element = res.rows[index].value;
                        arr.push(element)
                    }
                    deferred.resolve({
                        arr: arr,
                        count: count
                    })
                }
            });
        }).catch(err => {
            deferred.reject(err);
        });
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

function check_gij_ws(js) {
    let deferred = Q.defer();
    try {
        check_exist_pocket(js.client.data.user.gui).then(res => {
            if (res.length) {
                let p = res[0];
                getGijList(p.gijpocketgui, js.client.data.page, js.client.data.maxpage).then(g => {
                    js.client.data.gijs = g;
                    js.client.data.gijpocket = p;
                    filterObject(js.client.data);
                    deferred.resolve(js);
                }).catch(err => {
                    js.client.data.message = err;
                    deferred.reject(js);
                });
            } else {
                js.client.data.message = new Error('ERROR pocket not found');
                deferred.reject(js);
            }
        }).catch(err => {
            js.client.data.message = err;
            deferred.reject(js);
        });
    } catch (error) {
        js.client.data.message = error
        deferred.reject(js);
    }

    return deferred.promise;
}

function getSumPocketFromGij(js) {
    let deferred = Q.defer();
    try {
        var usergij = {
            usergui: '',
            sn: '',
            gijgui: '',
            gijvalue: 0,
            usedtime: '',
            ref: [],
            gijpocketgui: '',
        }
        let db = create_db('usergij');
        db.view(__design_view, 'sumAllGij', {
            key: js.client.data.gijpocket.gui + ''
        }, (err, res) => {
            if (err) deferred.reject(err);
            else {
                const summAll = res.rows[0].value;
                db.view(__design_view, 'sumSpent', {
                    key: js.client.data.gijpocket.gui + ''
                }, (err, res) => {
                    if (err) deferred.reject(err);
                    else {
                        const sumSpent = res.rows[0].value;
                        deferred.resolve({
                            total: sumAll,
                            spent: sumSpent
                        });
                    }
                });
            }
        });
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

function updateUser(js) {
    let client = js.client;
    client.prefix = 'gij';
    client.data.command = 'edit-profile';
    let ws_client = new WebSocket('ws://nonav.net:6688/'); // user-management
    ws_client.binaryType = 'arraybuffer';
    ws_client.on('open', function open() {
        ws_client.send(JSON.stringify(client), function (err) {
            if (err)
                setErrorStatus(client);
        });
    });
    ws_client.on('message', function incoming(data) {
        client =  JSON.parse(ab2str(data));
        delete data.prefix;
        //delete data.res.SendSMSResult.user_id;
        setNotificationStatus(client);
        setOnlineStatus(client);
    });
    ws_client.on("error", (err) => {
        setErrorStatus(client);
    });

    return deferred.promise;
}

function updateGijPocket(gp) {
    let deferred = Q.defer();
    try {
        let db = create_db('gijpocket');
        console.log(gp);
        db.insert(gp, gp._id, function (err, res) {
            if (err) deferred.reject(err);
            else {
                deferred.resolve('OK ' + JSON.stringify(res));
            }
        });
    } catch (error) {
        deferred.reject(error)
    }

    return deferred.promise;
}

function sum_gij_ws(js) {
    let deferred = Q.defer();
    try {
        check_exist_pocket(js.client.data.user.gui).then(res => {
            if (res.length) {
                let p = res[0];
                js.client.data.gijpocket = p;
                getSumPocketFromGij(js).then(sum => {
                    if (sum) {
                        findUserByGUI(js).then(res => {
                            js.client.data.message = 'OK gij sum';
                            res.totalgij = sum.sumAll;
                            res.totalgijspent = sum.sumSpent;
                            res.gijvalue = res.totalgij - res.totalgijspent;

                            p.totalvalue = res.gijvalue;
                            p.totalgij = res.totalgij;
                            p.totalgijspent = res.totalgijspent;

                            js.client.data.gijpocket = p;
                            js.client.data.user = res;
                            updateUser(js).then(res => {
                                js.client.data.message = 'OK gij sum Ok update user';
                                deferred.resolve(js);
                                updateGijPocket(p).then(res => {
                                    js.client.data.message = 'OK gij sum Ok update user OK Update gijpocket';
                                    filterObject(js.client.data);
                                    deferred.resolve(js);
                                }).catch(err => {
                                    js.client.data.message = err;
                                    deferred.reject(js);
                                });
                            }).catch(err => {
                                js.client.data.message = err;
                                deferred.reject(js);
                            });
                        }).catch(err => {
                            js.client.data.message = err;
                            deferred.reject(js);
                        });
                    } else {
                        js.client.data.message = 'ERROR could not sum gij';
                        deferred.reject(js);
                    }
                }).catch(err => {
                    js.client.data.message = err;
                    deferred.reject(js);
                });
            } else {
                js.client.data.message = new Error('ERROR pocket not found');
                deferred.reject(js);
            }
        }).catch(err => {
            js.client.data.message = err;
            deferred.reject(js);
        });
    } catch (error) {
        js.client.data.message = error
        deferred.reject(js);
    }
    return deferred.promise;
}

function checkUserName() {

}

function checkPhonenumber() {

}

function updateGijServiceProvider(doc) {
    let deferred = Q.defer();
    let db = create_db('gijserviceprovider');
    if (!doc._rev) {
        doc.gui = uuidV4();
    }
    db.insert(doc, doc.gui, (err, res) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

function getGijServiceProviders(page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('gijserviceprovider');
    db.list({
        include_docs: true,
        limit: maxpage,
        skip: page
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const element = array[index].doc;
                arr.push(arr);
            }
            deferred.resolve(arr);
        }
    });
    return deferred.promise;
}

function check_gij_stock_ws() {

}

function getGijPackages(page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('gijpackage');
    db.list({
        include_docs: true,
        limit: maxpage,
        skip: page
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const element = array[index].doc;
                arr.push(arr);
            }
            deferred.resolve(arr);
        }
    });
    return deferred.promise;
}

function getGijPackageByGui(gui) {
    let deferred = Q.defer();
    let db = create_db('gijpackage');
    db.view(__design_view, 'findByGUI', {
        key: gui
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const element = array[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr[0]);
        }
    });
    return deferred.promise;
}

function updateGijPackage(doc) {
    let deferred = Q.defer();
    let db = create_db('gijpackage');
    if (!doc._rev) {
        doc.gui = uuidV4();
    }
    db.insert(doc, doc.gui, (err, res) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

function getGijCustomers(page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('gijcustomer');
    db.list({
        include_docs: true,
        limit: maxpage,
        skip: page
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const element = array[index].doc;
                arr.push(arr);
            }
            deferred.resolve(arr);
        }
    });
    return deferred.promise;
}

function getGijCustomerByUserGui(gui) {
    let deferred = Q.defer();
    let db = create_db('gijcustomer');
    db.view(__design_view, 'findByUserGUI', {
        key: gui
    }, (err, res) => {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const element = array[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr[0]);
        }
    });
    return deferred.promise;
}

function updateGijCustomer(doc) {
    let deferred = Q.defer();
    let db = create_db('gijcustomer');
    if (!doc._rev) {
        doc.gui = uuidV4();
    }
    db.insert(doc, doc.gui, (err, res) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

function deductGij(array, v, ref) {
    let sum = 0;
    left = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index * element.gijvalue <= v) {
            element.usedtime = convertTZ(new Date());
            element.ref.push(ref);
            sum += element.gijvalue
        } else {
            left += element.gijvalue;
        }

    }
    return sum + left - v;
}

function pay_gijservice(js) {
    const deferred = Q.defer();
    const db = create_db('gijpayment');
    js.client.data.gijpayment.paymentype = 'pay-package';
    js.client.data.gijpayment.gui = uuidV4();
    js.client.data.gijpayment.usergui = js.client.data.user.gui;
    js.client.data.gijpayment.sender = js.client.username;
    js.client.data.gijpayment.receiver = '@service-provider@';
    getGijPackageByGui(js.client.data.gijpayment.ref + '').then(res => {
        if (res) {
            getGijCustomerByUserGui(js.client.data.user.gui).then(res => {
                if (res) {

                } else {
                    let c = {
                        gui: uuidV4(),
                        usergui: this.client.data.user.gui,
                        currentpackage = [{
                            packagegui: res.gui,
                            starttime: convertTZ(new Date()),
                            endtime: moment(new Date()).add(1, 'months').format(),
                            paymentgui: ''
                        }],
                        createddate: convertTZ(new Date()),
                        lastupdate: convertTZ(new Date()),
                        isactive: true,

                    };
                    updateGijCustomer()
                }
            });
            let p = res;
            if (integer.parse(res.packagevalue + '') === integer.parse(js.client.data.gijpayment.paymentvalue + '')) {
                getPocketByUserGUI(js.client.data.user.gui).then(res => {
                    let p_sender = res;
                    findAvailableGij(p_sender.gui).then(res => {
                        if (res) {
                            let a_gij = res;
                            if (p_sender.totalvalue >= js.client.data.gijpayment.paymentvalue) {
                                let left = deductGij(a_gij, js.client.data.gijpayment.paymentvalue, js.client.data.gijpayment.gui);
                                left >= 0 ? p_sender.totalvalue = left : p_sender.totalvalue -= js.client.data.gijpayment.paymentvalue;
                                p_sender.totalspent += js.client.data.gijpayment.paymentvalue;
                                updateGijPayment(js.client.data.gijpayment).then(res => {
                                    updateUserGij(a_gij).then(res => {
                                        updateGijPocket(p_sender).then(res => {
                                            findUserByGUI(js).then(res => {
                                                let u = res;
                                                u.gijvalue = p_sender.totalvalue;
                                                u.totalgijspent = p_sender.totalspent;
                                                js.client.data.user = u;
                                                updateUser(js).then(res => {

                                                    // filterObject(js.client);
                                                    // setNotificationStatus(js.client);
                                                    getGijServiceProviders(30, 0).then(res => {
                                                        let str = '';
                                                        for (let index = 0; index < res.length; index++) {
                                                            const element = res[index];
                                                            if (p.serviceprovider.indexOf(element.gui)) {
                                                                str = `${element.servicename},${element.discount},
                                                                ${element.description}
                                                                `;
                                                            }
                                                        }
                                                        deferred.resolve(`OK pay service
                                                            ${p.packagename}, value: ${p.packagevalue},
                                                            (${p.description}),
                                                            ${str}`);
                                                    });
                                                });
                                            });

                                        });
                                    });
                                });
                            } else {
                                throw new Error('ERROR insufficient value ');
                            }
                        } else {
                            throw new Error('Error no availalbe gij');
                        }
                    })
                    // let c_js=JSON.parse(JSON.stringify(js));
                    // c_js.client.data.user.username=js.client.data.gijpayment.receiver;
                    // findUserByUsername(c_js).then(res=>{
                    //     let receiver=res;
                    //     getPocketByUserGUI(receiver.gui).then(res=>{
                    //         let p_receiver=res;

                    //     }).catch(err=>{
                    //         js.client.data.message=err;
                    //         deferred.reject(js);
                    //     });
                    // }).catch(err=>{
                    //     js.client.data.message=err;
                    //     deferred.reject(js);
                    // });        
                });
            } else {
                throw new Error('ERROR please check package value');
            }

        } else {
            throw new Error('ERROR no package found');
        }
    }).catch(err => {
        js.client.data.message = err;
        deferred.reject(js);
    });

    return deferred.promise;
}

function get_payment_ws(js) {
    let deferred = Q.defer();
    let db = create_db('gijpayment');
    try {
        db.view(__design_view, 'findPaymentTime', {
                key: {
                    year: js.client.data.paymentlist.year,
                    month: js.client.data.paymentlist.month,
                    date: js.client.data.paymentlist.date
                },
                descending: true
            },
            (err, res) => {
                if (err) {
                    js.client.data.message = err;
                    deferred.reject(js);
                } else {
                    let arr = [];
                    for (let index = 0; index < res.rows.length; index++) {
                        const element = res.rows[index].value;
                        filterObject(element);
                        arr.push(element);
                    }
                    deferred.resolve(arr);
                }
            });
    } catch (error) {
        js.client.data.message = error;
        deferred.reject(js);
    }

    return deferred.promise;
}

function check_payment_ws(js) {
    let deferred = Q.defer();

    return deferred.promise;
}

function findUserByGUI(js) {
    let deferred = Q.defer();
    let client = js.client;
    client.prefix = 'gij';
    client.data.command = 'get-user-info';
    let ws_client = new WebSocket('ws://localhost:6688/'); // user-management
    ws_client.binaryType = 'arraybuffer';
    ws_client.on('open', function open() {
        ws_client.send(JSON.stringify(client), function (err) {
            if (err) {
                setErrorStatus(client);
                js.client.data.message = err;
                deferred.reject(js);
            }
        });
    });
    ws_client.on('message', function incoming(data) {
        client =  JSON.parse(ab2str(data));
        delete client.prefix;
        //delete data.res.SendSMSResult.user_id;
        setNotificationStatus(client);
        setOnlineStatus(client);
        js.client = client;
        deferred.resolve(js)
    });
    ws_client.on("error", (err) => {
        setErrorStatus(client);
        js.client.data.message = err;
        deferred.reject(js);
    });
    return deferred.promise;
}

function findUserByUsername(js) {
    let deferred = Q.defer();
    let client = js.client;
    client.data.command = 'find-by-username';
    client.prefix = 'gij';
    ws_client.on('open', function open() {
        ws_client.send(JSON.stringify(client), function (err) {
            if (err) {
                setErrorStatus(client);
                js.client.data.message = err;
                deferred.reject(js);
            }
        });
    });
    ws_client.on('message', function incoming(data) {
        client =  JSON.parse(ab2str(data));
        delete data.prefix;
        //delete data.res.SendSMSResult.user_id;
        setNotificationStatus(client);
        setOnlineStatus(client);
        js.client = client;
        deferred.resolve(js)
    });
    ws_client.on("error", (err) => {
        setErrorStatus(client);
        js.client.data.message = err;
        deferred.reject(js);
    });
    return deferred.promise;
}

function countAvailableGij(pgui) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    db.view(__design_view, 'countAvailableGij', {
        key: pgui + ''
    }, function (err, res) {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr[0]);
        }
    });
}

function findAvailableGij(pgui) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    db.view(__design_view, 'findAvailableGij', {
        key: pgui + ''
    }, function (err, res) {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr);
        }
    });
}

function getAvailableGij(pgui, page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    countAvailableGij(pgui).then(res => {
        let count = res;
        db.view(__design_view, 'findAvailableGij', {
            key: pgui + '',
            limit: maxpage,
            skip: page
        }, function (err, res) {
            if (err) deferred.reject(err);
            else {
                let arr = [];
                for (let index = 0; index < res.rows.length; index++) {
                    const element = res.rows[index].value;
                    arr.push(arr);
                }
                deferred.resolve({
                    arr: arr,
                    count: count
                });
            }
        });
    }).catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;
}

function countUsedGij(pgui) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    db.view(__design_view, 'countUsedGij', {
        key: pgui + ''
    }, function (err, res) {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr[0]);
        }
    });
}

function findUsedGij(pgui) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    db.view(__design_view, 'findUsedGij', {
        key: pgui + ''
    }, function (err, res) {
        if (err) deferred.reject(err);
        else {
            let arr = [];
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].value;
                arr.push(arr);
            }
            deferred.resolve(arr);
        }
    });
    return deferred.promise;
}

function getUsedGij(pgui, page, maxpage) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    countUsedGij(pgui).then(res => {
        let count = res;
        db.view(__design_view, 'findUsedGij', {
            key: pgui + '',
            limit: maxpage,
            skip: page
        }, function (err, res) {
            if (err) deferred.reject(err);
            else {
                let arr = [];
                for (let index = 0; index < res.rows.length; index++) {
                    const element = res.rows[index].value;
                    arr.push(arr);
                }
                deferred.resolve({
                    arr: arr,
                    count: count
                });
            }
        });
    }).catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;
}

function sumArray(arr, prop, isaverage) {
    let sum = 0;
    try {
        for (let index = 0; index < arr.length; index++) {
            sum += Int.parse(arr[index][prop] + '');
        }
    } catch (error) {
        throw error;
    }
    return isaverage || isaverage !== undefined ? sum / arr.length : sum;
}

function updateUserGij(g) {
    let deferred = Q.defer();
    let db = create_db('usergij');
    if (g._rev)
        g.gui = uuidV4();
    db.insert(g, g.gui, (err, res) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

function updateGijPayment(t) {
    let deferred = q.defer();
    let db = create_db('gijpayment');
    if (!t._rev)
        t.gui = uuidV4();
    db.insert(t, t.gui, (err, res) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve('OK');
        }
    });
    return deferred.promise;
}

function transfer_gij_ws(js) {
    let deferred = Q.defer();
    let sendGij = js.client.data.payment.sendingvalue;
    let receiveGij = js.client.data.payment.receivingvalue;
    js.client.data.payment.transactiontime = convertTZ(new Date());
    js.client.data.payment.gui = uuidV4();
    js.client.data.payment.sender = js.client.username;
    //js.client.data.gijtransaction.ref=
    try {
        if (sendGij == receiveGij) {
            let c_js = JSON.parse(JSON.stringify(js));
            findUserByGUI(c_js).then(res => {
                let sender = res;
                c_js.client.data.user = {};
                c_js.client.data.user.username = js.client.data.payment.receiver;
                findUserByUsername(c_js).then(res => {
                    if (res) {
                        let reciver = res;
                        getPocketByUserGUI(sender.gui).then(res => {
                            if (res) {
                                let senderpocket = res;
                                getPocketByUserGUI(sender.gui).then(res => {
                                    if (res) {
                                        let recieverpocket = res;
                                        findAvailableGij(senderpocket.gui).then(res => {
                                            let s_a_gij = res;
                                            findUsedGij(recieverpocket.gui).then(res => {
                                                let s_u_gij = res;
                                                findAvailableGij(recieverpocket.gui).then(res => {
                                                    let r_a_gij = res;
                                                    findUsedGij(recieverpocket.gui).then(res => {
                                                        let r_u_gij = res;
                                                        // check gij and pocket  for both  sender and receiver
                                                        //check usued
                                                        //check available
                                                        const rsumu = sumArray(r_u_gij, 'gijvalue');
                                                        const rsuma = sumArray(r_a_gij, 'gijvalue');
                                                        const ssumu = sumArray(s_a_gij, 'gijvalue');
                                                        const ssumu = sumArray(s_u_gij, 'gijvalue');
                                                        // check with gij pocket
                                                        if (recieverpocket.totalgij === (rsuma + rsumu)) {
                                                            if (recieverpocket.totalspent <= rsumu) {
                                                                if (recieverpocket.gijvalue <= rsuma) {
                                                                    if (senderpocket.totalgij === (ssuma + ssumu)) {
                                                                        if (senderpocket.totalspent <= ssumu) {
                                                                            if (senderpocket.gijvalue <= ssuma) {
                                                                                // move gij from sender to reciever
                                                                                let gijpayment = {
                                                                                    gui: uuidV4(),
                                                                                    usergui: this.client.data.user.gui,
                                                                                    paymenttime: convertTZ(new Date()),
                                                                                    paymentvalue: Int.parse(js.client.data.payment.sendGij + ''),
                                                                                    ref: uuidV4(),
                                                                                    sender: js.client.data.payment.sender,
                                                                                    receiver: js.client.data.payment.receiver,
                                                                                    paymentype: 'transfer',
                                                                                    sendingvalue: Int.parse(js.client.data.payment.sendingvalue + ''),
                                                                                    receivingvalue: Int.parse(js.client.data.payment.receivingvalue + ''),
                                                                                }
                                                                                if (sendGij < ssuma) {
                                                                                    let aver = ssumu / s_a_gij.length;
                                                                                    if (sendGij / aver < 1) {
                                                                                        js.client.data.message = new Error('ERROR the value is lower than individual gij');
                                                                                        deferred.reject(js);
                                                                                    } else {
                                                                                        updateGijPayment(gijpayment).then(res => {
                                                                                            // transfer gijs from current user to target user and sum all 
                                                                                            for (let index = 0; index < s_a_gij.length; index++) {
                                                                                                const element = s_a_gij[index];
                                                                                                if (element.gijvalue * i <= sendGij) {
                                                                                                    //element.usedtime=convertTZ(new Date());
                                                                                                    element.usergui = recieverpocket.usergui;
                                                                                                    element.gijpocketgui = recieverpocket.gui;
                                                                                                    if (Array.isArray(element.owners))
                                                                                                        element.owners.push(recieverpocket.usergui);
                                                                                                    else {
                                                                                                        element.owners = [];
                                                                                                        element.owners.push(recieverpocket.usergui);
                                                                                                    }
                                                                                                    if (Array.isArray(element.ref))
                                                                                                        element.ref.push('transfer');
                                                                                                    else {
                                                                                                        element.ref = [];
                                                                                                        element.ref.push('transfer');
                                                                                                    }
                                                                                                    element.ref.push(gijpayment.gui);
                                                                                                } else
                                                                                                    break;
                                                                                            }
                                                                                            updateUserGij(s_a_gij).then(res => {
                                                                                                // update gij pocket  
                                                                                                recieverpocket.totalgij += sendGij
                                                                                                recieverpocket.totalvalue += sendGij;
                                                                                                recieverpocket.sumgij + sendGij;
                                                                                                updateGijPocket(recieverpocket).then(res => {
                                                                                                    //updateUserGij(s_a_gij).then(res=>{                                                                                                
                                                                                                    senderpocket.totalgij -= sendGij;
                                                                                                    senderpocket.totalspent += sendGij;
                                                                                                    //senderpocket.sumgij+=send;
                                                                                                    updateGijPocket(senderpocket).then(res => {
                                                                                                        js.client.data.message = 'OK transfered :' + sendGij;
                                                                                                        deferred.resolve(js);
                                                                                                    }).catch(err => {
                                                                                                        js.client.data.message = err;
                                                                                                        deferred.reject(js);
                                                                                                    });
                                                                                                }).catch(err => {
                                                                                                    js.client.data.message = err;
                                                                                                    deferred.reject(js);
                                                                                                });
                                                                                            }).catch(err => {
                                                                                                js.client.data.message = err;
                                                                                                deferred.reject(js);
                                                                                            });
                                                                                        }).catch(err => {
                                                                                            js.client.data.message = err;
                                                                                            deferred.reject(js);
                                                                                        });
                                                                                    }
                                                                                } else {
                                                                                    js.client.data.message = new Error('ERROR unsufficience fund');
                                                                                    deferred.reject(js);
                                                                                }

                                                                            } else {
                                                                                js.client.data.message = new Error('Error sender has wrong  gij value');
                                                                                deferred.reject(js);
                                                                            }
                                                                        } else {
                                                                            js.client.data.message = new Error('Error sender has wrong spent gij value');
                                                                            deferred.reject(js);
                                                                        }
                                                                    } else {
                                                                        js.client.data.message = new Error('Error sender has wrong total gij value');
                                                                        deferred.reject(js);
                                                                    }
                                                                } else {
                                                                    js.client.data.message = new Error('Error receiver has wrong gij value');
                                                                    deferred.reject(js);
                                                                }
                                                            } else {
                                                                js.client.data.message = new Error('Error receiver has wrong spent gij value');
                                                                deferred.reject(js);
                                                            }
                                                        } else {
                                                            js.client.data.message = new Error('Error receiver has wrong total gij value');
                                                            deferred.reject(js);
                                                        }
                                                    }).catch(err => {
                                                        js.client.data.message = err;
                                                        deferred.reject(js);
                                                    });
                                                }).catch(err => {
                                                    js.client.data.message = err;
                                                    deferred.reject(js);
                                                });
                                            }).catch(err => {
                                                js.client.data.message = err;
                                                deferred.reject(js);
                                            });
                                        }).catch(err => {
                                            js.client.data.message = err;
                                            deferred.reject(js);
                                        });
                                    } else {
                                        js.client.data.message = new Error('ERROR has no pocket');
                                        deferred.reject(js);
                                    }
                                }).catch(err => {
                                    js.client.data.message = err;
                                    deferred.reject(js);
                                });
                            } else {
                                js.client.data.message = new Error('ERROR has no pocket');
                                deferred.reject(js);
                            }
                        }).catch(err => {
                            js.client.data.message = err;
                            deferred.reject(js);
                        });
                    } else {
                        js.client.data.message = new Error('ERROR target user not found');
                        deferred.reject(js);
                    }
                }).catch(err => {
                    js.client.data.message = err;
                    deferred.reject(js);
                });
            }).catch(err => {
                js.client.data.message = err;
                deferred.reject(js);
            });
        }
    } catch (error) {
        js.client.data.message = err;
        deferred.reject(js);
    }
    return deferred.promise;
}


function submit_topup_gij_request(js) {
    let deferred = Q.defer();

    return deferred.promise;
}

function list_topup_gij_request(js) {
    let deferred = Q.defer();

    return deferred.promise;
}

function update_topup_gij_request(js) {
    let deferred = Q.defer();

    return deferred.promise;
}

function filterObject(obj) {
    var need = ['gui', '_rev', '_id', 'password', 'oldphone', 'system', 'parents', 'roles', 'isActive'];
    //console.log(key);
    for (var i in obj) {
        //if(i==='password')
        //console.log(obj[i]);
        for (x = 0; x < need.length; x++) {
            let key = need[x];
            if (!obj.hasOwnProperty(i)) {} else if (Array.isArray(obj[i])) {
                if (i.toLowerCase().indexOf(key) > -1)
                    obj[i] = [];
            } else if (typeof obj[i] === 'object') {
                filterObject(obj[i]);
            } else if (i.indexOf(key) > -1) {
                obj[i] = '';
            }
        }
    }
    return obj;
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function heartbeat() {
    if (!this.lastupdate && !this.gui) {
        console.log('HEART BEAT:' + this.gui + " is alive:" + this.isAlive + " " + this.lastupdate + " logout");
        this.isAlive = false;
    }
    let startDate = moment(this.lastupdate)
    let endDate = moment(convertTZ(new Date()));

    const timeout = endDate.diff(startDate, 'seconds');
    // if(this.gui!=this.gui){
    //     this.isAlive=false;
    //     console.log('HEART BEAT:'+this.gui+" is alive:"+this.isAlive+" "+this.lastupdate+" timeout"+timeout);
    //     return;
    // }
    if (timeout > 60 * 3)
        this.isAlive = false;
    else
        this.isAlive = true;

    console.log('HEART BEAT:' + this.gui + " is alive:" + this.isAlive + " " + this.lastupdate + " timeout" + timeout);
    //this.send(this.client);
}
wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    console.log('connection from ' + ip);
    ws.binaryType = 'arraybuffer';
    //const ip = req.headers['x-forwarded-for'];
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('error', function (err) {
        //js.client.data.message=JSON.stringify(err);
        var l = {
            log: err,
            logdate: convertTZ(new Date()),
            type: "error",
            gui: uuidV4()
        };
        errorLogging(l);
    })
    ws.on('message', function incoming(data) {
        let js = {};
        try {
            js.client = data = JSON.parse(ab2str(data));
            js.ws = ws;
            ws.client = data;
            commandReader(js).then(res => {
    
                // CLEAN ALL GUI BEFORE SEND OUT
                filterObject(js.client.data); // TODO HERE 
                ws.send(Buffer.from(JSON.stringify(js.client)), {
                    binary: true
                });
            }).catch(err => {
                js = err;
                var l = {
                    log: js.client.data.message,
                    logdate: convertTZ(new Date()),
                    type: "error",
                    gui: uuidV4()
                };
                //console.log(err);
                errorLogging(l);
                console.log('ws sending');
                js.client.data.message = js.client.data.message.message;
                ws.send(Buffer.from(JSON.stringify(js.client)), {
                    binary: true
                });
            });
        } catch (error) {
            js.client.data.message = error.message;
                ws.send(Buffer.from(JSON.stringify(js.client)), {
                    binary: true
                });
        }
    });

});
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        try {
            if (ws.isAlive === false) return ws.terminate();
            console.log('TIME INTERVAL');
            ws.isAlive = false;
            ws.ping(noop);
        } catch (error) {
            console.log(error);
        }
    });
}, 30000); // set 60 seconds 
server.listen(8888, "0.0.0.0", function () {
    console.log('Example app listening on port 8888!')
});