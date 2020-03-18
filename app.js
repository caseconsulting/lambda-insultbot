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
    const subject = body.command;
    const companyId = body.creator.company.id;

    if (companyId == process.env.companyId) {
      const msg = insult.random();
      var matched = msg.match('^[aieouAIEOU].*');
      const result = `${subject} is ${matched ? 'an' : 'a'} ${insult.random()}.`;
      response = {
        statusCode: 200,
        body: result
      };
      console.log('Sending this response:', result);
    } else {
      response = {
        statusCode: 403,
        body: 'Your mother was a hamster, and your father smelt of elderberries.'
      };
      console.log('Access Denied');
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
