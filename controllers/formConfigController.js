var Mongo = require('../helpers/mongoWrapper');
var _mongo = new Mongo();
var uniqueString = require('unique-string');

/**
 * Save user built form 
 */
exports.saveForm = async (req, res) => {
    let formToSave = [];
    let formConfig = {
        fields:[]
    };
    if(req.body){
        let formID = uniqueString();
        formConfig.formID = formID;
        req.body.forEach(field=>{
            formConfig.fields.push(field)
        });
        formToSave.push(formConfig);
        _mongo.bulkInsert('forms',formToSave)
        .then(mongoRes=>{
            res.status(200).json(formToSave);
        })
        .catch(err=>{
            res.status(500).send('Mongo insert unsuccessful');
        })
        
    }
    else{
        res.status(500).send('Operation not completed - no body in request');
    }
   
};

/**
 * 
 * Save user submitted form data 
 */
exports.saveFormEntry = async (req, res) => {
    if(req.body){
        let data = {...req.body};
        var _date = new Date();
        data.timestamp = _date.toISOString();
        _mongo.bulkInsert("submissions",[data])
        .then(mongoRes=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send('Mongo upsert unsuccessful');
        })
    }
};

/**
 * 
 * Get user built form data 
 */
exports.getForm = async (req, res) => {
    let form = ''
    if(req.params){
        form = req.params.formID;
    }
    _mongo.search('forms',{formID:form})
    .then(mongoRes=>{
        res.status(200).json(mongoRes);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send('Mongo search unsuccessful');
    })
};

/**
 * 
 * Get user submitted form data
 */
exports.getFormEntries = async (req, res) => {
    let form = ''
    if(req.params){
        form = req.params.formID;
    }
    _mongo.search('submissions',{formID:form}, null, true)
    .then(mongoRes=>{
        res.status(200).json(mongoRes);
    })
    .catch(err=>{
        res.status(500).send('Mongo search unsuccessful');
    })
};