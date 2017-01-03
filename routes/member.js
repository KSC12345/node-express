var express = require('express');
var logger = require('../log/log');
var router = express.Router();
var Member = require('../models/member');
var responseHelper = require('../helper/responseHelper');

/* GET member by memberId */
router.get('/members/:memberId', function(req, res, next) {
  //let member = getMember(req.params.memberId);
  //logger.info('Member: ' + JSON.stringify(member));

  Member.findOne({memberId:req.params.memberId})
      .then((member) => {
      res.json(responseHelper.successResponse(member));
      })
      .catch(e => next(e));

});

// POST method route
router.post('/members', function (req, res,next) {
  const member = new Member({
    memberId: '1234',
    firstName: 'Jason',
    lastName:'Shmoe'
  });

  member.save()
    .then(savedMember => res.json(savedMember))
    .catch(e => next(e));

})

function getMember(memberId) {
  logger.info(`find memberId: ${memberId}`);
  let m = new Member();
  m.firstName = 'Jason';
  m.lastName = 'Shmoe';
  m.middleName = 'The';

  let c = new Contract();
  c.type = 'HEALTH';
  m.defaultContract = c;
  return m;
}

module.exports = router;
