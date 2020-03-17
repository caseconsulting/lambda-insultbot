'use strict';

const insult = require('shakespeare-insult');

exports.handler = function(event, context, callback) {
  let body = JSON.parse(event.body);
  const companyId = body.creator.company.id;

  if (companyId == process.env.companyId) {
    const insult = insult.random();
    response = {
      statusCode: 200,
      body: insult
    };
    console.log('sending this insult', insult);
    callback(null, response);
  } else {
    response = {
      statusCode: 403,
      body: 'Access Denied'
    };
    console.log('access denied');
    callback(null, response);
  }
};
