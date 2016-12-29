var express = require('express');
var logger = require('../log/log');
var router = express.Router();

class Member {
  constructor() {}
};
class Contract {
  constructor() {}
};

/* GET member by memberId */
router.get('/members/:memberId', function(req, res, next) {
  let member = getMember(req.params.memberId);
  //logger.info('Member: ' + JSON.stringify(member));
  res.json(member);
});

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
