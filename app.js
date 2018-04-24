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
    sn:'',
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

const Q = require('q');

var _current_system = 'gij';
var _client_prefix = ['ice-maker', 'gij', 'web-post', 'user-management','default'];
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

function LTCserviceSMS(client) {
    client.prefix = 'user-management';
    let ws_client = new WebSocket('ws://localhost:8081/'); // ltcservice
    ws_client.on('open', function open() {
        ws_client.send(JSON.stringify(client), function (err) {
            if (err)
                r_client.set(_current_system+'_error_' + client.gui, JSON.stringify({
                    command: 'error-changed',
                    err: err
                }), 'EX', 60 * 5);
        });
    });
    ws_client.on('message', function incoming(data) {
        data = JSON.parse(data);
        delete data.prefix;
        //delete data.res.SendSMSResult.user_id;
        r_client.set(_current_system+'_client_' + client.gui, JSON.stringify({
            command: 'client-changed',
            client: data
        }), 'EX', 60 * 60 / 2);
    });
    ws_client.on("error", (err) => {
        r_client.set(_current_system+'_error_' + client.gui, JSON.stringify({
            command: 'error-changed',
            err: err
        }), 'EX', 60 * 5);

    });
}

function commandReader(js) {
    const deferred = Q.defer();
    // const isValid=validateTopup(js.client);
    // if(!isValid.length)
    getUserInfoByLoginToken(js).then(res=>{
        if(res){
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
                case 'check-payment':
                    check_payment_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
        
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'transfer-gij':
                    check_payment_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
        
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'list-transfer-gij':
                    check_payment_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
        
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'topup-gij-request':
                    topup_gij_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
        
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'list-topup-gij-request':
                    list_topup_gij_ws(js).then(res => {
                        deferred.resolve(res);
                        //console.log(res);
        
                    }).catch(err => {
                        //console.log(err);
                        deferred.reject(err);
                    });
                    break;
                case 'pay-gij':
                    pay_gij(js).then(res => { // pay for service such as : topup
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
        }else{
            js.client.data.message=new Error('ERROR not found the key');
            deferred.reject(js);
        }
    }).catch(err=>{
        js.client.data.message=err;
        deferred.reject(js);
    });    
    return deferred.promise;
}

function getUserInfoByLoginToken(js) {
    let deferred = Q.defer();
    try {
        let client=js.client;
        client.command='get-user-gui';
        client.prefix = 'gij';
        let ws_client = new WebSocket('ws://localhost:6688/'); // user-management
        ws_client.on('open', function open() {
            ws_client.send(JSON.stringify(client), function (err) {
                if (err){
                    r_client.set(_current_system+'_error_' + client.gui, JSON.stringify({
                        command: 'error-changed',
                        err: err
                    }), 'EX', 60 * 5);
                    deferred.reject(err);
                }
            });
        });
        ws_client.on('message', function incoming(data) {
            data = JSON.parse(data);
            delete data.prefix;
            //delete data.res.SendSMSResult.user_id;
            //js.client=data;
            r_client.set(_current_system+'_usergui_' + client.logintoken, JSON.stringify({
                command: 'usergui-changed',
                client: data
            }), 'EX', 60 * 60 / 2);
            if(data.data.user.gui){
                    deferred.resolve(data);
                }
            else{
                    deferred.reject(new Error('Error user not login'))
            }   
    
        });
        ws_client.on("error", (err) => {
            //js.client.data.message=err;
                r_client.set(_current_system+'_error_' + client.gui, JSON.stringify({
                    command: 'error-changed',
                    err: err
                }), 'EX', 60 * 5);
            deferred.reject(err);
                
        });
    } catch (error) {
        console.log(error);
        //js.client.data.message=error;
        r_client.set(_current_system+'_error_' + client.gui, JSON.stringify({
            command: 'error-changed',
            err: err
        }), 'EX', 60 * 5);
        deferred.reject(error);
    }

    return deferred.promise;
}
function register_gij_ws(js) {
    let deferred = Q.defer();
    try {
        findGijPocketByGUI(js.client.data.user.gui).then(res=>{
            if(res){
                js.client.data.message=new Error('Error pocket exist');
                deferred.reject(js);
            }else{
                let db=create_db('gijpocket')
            
                const p = {
                    gui: uuidV4(),
                    usergui: js.client.data.user.gui,
                    createddate: convertTZ(new Date()),
                    totalvalue: 0,
                    totalspent: 0,
                }
                db.insert(p,p.gui,(err,res)=>{
                    if(err){
                        js.client.data.message=err;
                        deferred.reject(js);
                    }esle{
                        js.client.data.message='OK register';
                        deferred.resolve(js);
                    }
                })
            }
        }).catch(err=>{
            js.client.data.message=err;
            deferred.reject(js);
        });
    } catch (error) {
        js.client.data.message=error;
        deferred.reject(js);
    }
    
    return deferred.promise;
}
function findGijPocketByGUI(gui){
        let deferred = Q.defer();
        let db=create_db('gijpocket');
        db.view(__design_view,'findByUserGUI',{key:gui,limit:1},(err,res)=>{
            if(err) deferred.reject(err);
            else{
                if(res.rows.length){
                    deferred.resolve(res.rows[0].value);
                }else{
                    deferred.reject('');
                }
            }
        });
        return deferred.promise;
    }
    function getPocketByUserGUI(ugui){
        let deferred=Q.defer();
        let db=create_db('gijpocket');
        db.view(__design_view,'findByPocketGUI',{key:gui,limit:1},(err,res)=>{
            if(err) deferred.reject(err);
            else{
                if(res.rows.length){
                    deferred.resolve(res.rows[0].value);
                }else{
                    deferred.reject('');
                }
            }
        });
        return deferred.promise;
    }
    function check_pocket_ws(js){
        let deferred=Q.defer();
        try {
            getPocketByUserGUI(js.client.data.user.gui).then(res=>{
                if(res){
                    js.client.data.message='OK'
                    js.client.data.gijpocket=res;
                }else{
                    js.client.data.message=new Error('Error no pocket');
                    deferred.reject(js);
                }
                
            }).catch(err=>{
                js.client.data.message=err;
                deferred.reject(js);
            });
        } catch (error) {
            js.client.data.message=error;
            deferred.reject(js);
        }
        
        return deferred.promise;
    }
    function check_exist_pocket(gui){
        let deferred = Q.defer();
        findGijPocketByGUI(gui).then(res=>{
            let arr=[];
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].value;
                arr.push(element);
            }
            deferred.resolve(arr);
        }).catch(err=>{
            deferred.reject(err);
        });
        return deferred.promise;
    }
    function getCountGij(pgui){
        let deferred = Q.defer();
        let db=create_db('usergij');
        try {
            db.view(__design_view,'countByPocketGUI',{key:pgui},(err,res)=>{
                if(err)deferred.reject(err);
                else{
                    if(res.rows.length){
                        deferred.resolve(rews.rows[0].value);
                    }else{
                        deferred.reject(new Error('ERROR no gij found'));
                    }
                }
            });
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    }
    function getGijList(pgui,page,maxpage){
        let deferred = Q.defer();
        let db=create_db('usergij');
        try {
            getCountGij(pgui).then(res=>{
                let count=res;
                if(!maxpage||maxpage===undefined||maxpage>100)
                    maxpage=10;
                if(!page||page===undefined)
                    page=1;
                db.view(__design_view,'findByPocketGUI',{key:pgui,limit:maxpage,skip:page,descending:true},(err,res)=>{
                    if(err)deferred.reject(err);
                    else{
                        let arr=[];
                        for (let index = 0; index < res.rows.length; index++) {
                            const element = res.rows[index].value;
                            arr.push(element)
                        }
                        deferred.resolve({arr:arr,count:count})
                    }
                });
            }).catch(err=>{
                deferred.reject(err);
            });
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    }
    function cleanGijList(gij){
        for (let index = 0; index < gij.length; index++) {
            const element = gij[index];
            element.gui='';
            element._id='';
            element._rev='';
            element.usergui='';
            element.gijpocketgui='';
        }
    }
    function cleanPocket(p){
        for (let index = 0; index < p.length; index++) {
            const element = p[index];
            element.gui='';
            element._id='';
            element._rev='';
            element.usergui='';            
        }
    }
    function check_gij_ws(js) {
        let deferred = Q.defer();
        try {
            check_exist_pocket(js.client.data.user.gui).then(res=>{
                if(res.length){                    
                    let p=res[0];                            
                    getGijList(p.gijpocketgui,js.client.data.page,js.client.data.maxpage).then(g=>{
                        cleanGijList(g);
                        cleanPocket(res);
                        js.client.data.gijlist=g;
                        deferred.resolve(js);
                    }).catch(err=>{
                        js.client.data.message=err;
                        deferred.reject(js);
                    });
                }else{
                    js.client.data.message=new Error('ERROR pocket not found');
                    deferred.reject(js);
                }
            }).catch(err=>{
                js.client.data.message=err;
                deferred.reject(js);
            });            
        } catch (error) {
            js.client.data.message=error
            deferred.reject(js);
        }
        
        return deferred.promise;
    }
    function getSumPocketFromGij(js){
        let deferred=Q.defer();
        try {
            var usergij = {
                usergui: '',
                sn:'',
                gijgui: '',
                gijvalue: 0,
                usedtime: '',
                ref: '',
                gijpocketgui: '',
            }
            let db=create_db('usergij');
            db.view(__design_view,'sumAllGij',{key:js.client.data.gijpocket.gui},(err,res)=>{
                if(err) deferred.reject(err);
                else{
                    const summAll=res.rows[0].value;
                    db.view(__design_view,'sumSpent',{key:js.client.data.gijpocket.gui},(err,res)=>{
                        if(err) deferred.reject(err);
                        else{
                            const sumSpent=res.rows[0].value;
                            deferred.resolve({total:sumAll,spent:sumSpent});
                        }
                    });
                }
            });
        } catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    }
    function sum_gij_ws(js){
        let deferred=Q.defer();
        try {
            check_exist_pocket(js.client.data.user.gui).then(res=>{
                if(res.length){                    
                    let p=res[0];          
                    js.client.data.gijpocket=p;                  
                    getSumPocketFromGij(js).then(res=>{
                        if(res){
                            js.client.data.message='OK gij sum';
                            deferred.resolve(js);   
                        }else{
                            js.client.data.message='ERROR could not sum gij';
                            deferred.reject(js);
                        }
                    }).catch(err=>{
                        js.client.data.message=err;
                        deferred.reject(js);
                    });
                }else{
                    js.client.data.message=new Error('ERROR pocket not found');
                    deferred.reject(js);
                }
            }).catch(err=>{
                js.client.data.message=err;
                deferred.reject(js);
            });            
        } catch (error) {
            js.client.data.message=error
            deferred.reject(js);
        }
        return deferred.promise;
    }
    function check_payment_ws(js) {
        let deferred = Q.defer();

        return deferred.promise;
    }

    function check_payment_ws(js) {
        let deferred = Q.defer();

        return deferred.promise;
    }

    function transfer_gij_ws(js) {
        let deferred = Q.defer();

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
    function cleanJSONGUI(data){

    }
    wss.on('connection', function connection(ws, req) {
        const ip = req.connection.remoteAddress;
        console.log('connection from ' + ip);
        //const ip = req.headers['x-forwarded-for'];
        ws.isAlive = true;
        //ws.on('pong', heartbeat);
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
            js.client = data = JSON.parse(data);
            js.ws = ws;
            ws.client = data;
            commandReader(js).then(res => {

                // CLEAN ALL GUI BEFORE SEND OUT
                cleanJSONGUI(js.client.data);
                ws.send(JSON.stringify(js.client));
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
                ws.send(JSON.stringify(js.client));
            });
        });

    });
    server.listen(8888, "0.0.0.0", function () {
        console.log('Example app listening on port 8888!')
    });