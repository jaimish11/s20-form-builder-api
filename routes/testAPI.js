var express = require('express');
var router = express.Router();
var formConfigController = require('../controllers/formConfigController');

router.get('/', function(req, res, next) {
    res.send('API working');
});

router.post('/save',formConfigController.saveForm);

router.post('/forms/entries/save',formConfigController.saveFormEntry);

router.get('/forms/:formID', formConfigController.getForm);

router.get('/forms/entries/:formID', formConfigController.getFormEntries);


module.exports = router;
