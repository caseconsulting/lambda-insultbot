'use strict';

const insult = require('shakespeare-insult');

exports.handler = async event => {
  let response;

  const body = JSON.parse(event.body);
  const companyId = body.creator.company.id;

  if (companyId == process.env.companyId) {
    const insult = insult.random();
    response = {
      statusCode: 200,
      body: JSON.stringify(insult)
    };
    console.log('sending this insult', insult);
  } else {
    response = {
      statusCode: 403,
      body: 'Access Denied'
    };
    console.log('access denied');
  }
  return response;
};
