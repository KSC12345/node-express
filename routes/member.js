var express = require('express');
var logger = require('../log/log');
var router = express.Router();
var Member = require('../models/member');
var responseHelper = require('../helper/responseHelper');
var client = require('../helper/restClient');

/* GET member by memberId */
router.get('/members/:memberId', function(req, res, next) {
  //let member = getMember(req.params.memberId);
  //logger.info('Member: ' + JSON.stringify(member));

  Member.findOne({memberId:req.params.memberId})
      .then((member) => {
      res.status(200).json(responseHelper.successResponse(member));
      })
      .catch(e => next(e));

});


/* GET member by memberId */
router.get('/rest', function(req, res, next) {

  client.get('https://jsonplaceholder.typicode.com/posts/1', function (data, response) {
      // parsed response body as js object
      console.log("data :: "+data);
      // raw response
    res.status(200).json(responseHelper.successResponse(data));
  }).on('error', function (err) {
      console.log('something went wrong on the request', err.request.options);
      next(err);
  });

});

// POST method route
router.post('/members', function (req, res,next) {
  const member = new Member({
    memberId: '1234',
    firstName: 'Jason',
    lastName:'Shmoe'
  });

  member.save()
    .then(savedMember => res.status(200).json(savedMember))
    .catch(e => next(e));

})

module.exports = router;
