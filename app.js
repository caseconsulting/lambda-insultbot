import insult from 'shakespeare-insult';

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
export const handler = async (event, context) => {
  let response;

  try {
    const body = JSON.parse(event.body);
    const companyId = body.creator.company.id;

    if (companyId == process.env.companyId) {
      const subject = body.command;

      const sgid = body.creator.attachable_sgid;
      const creator = `<bc-attachment sgid="${sgid}"></bc-attachment>`;

      const msg = insult.random();
      const startsWithVowel = msg.match('^[aieouAIEOU].*');
      const result = `${creator} says ${subject} is ${startsWithVowel ? 'an' : 'a'} ${msg}.`;

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
    console.log('Something went wrong:', err);
    return err;
  }

  return response;
};
