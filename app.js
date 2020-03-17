let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    const insult = require('shakespeare-insult');

    const body = JSON.parse(event.body);
    const companyId = body.creator.company.id;

    if (companyId == process.env.companyId) {
      const anInsult = insult.random();
      response = {
        statusCode: 200,
        body: JSON.stringify(anInsult)
      };
      console.log('Sending this insult:', anInsult);
    } else {
      response = {
        statusCode: 403,
        body: 'Access Denied'
      };
      console.log('Access Denied');
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
