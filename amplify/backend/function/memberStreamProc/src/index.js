/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

exports.handler = async (event) => {


    await sqs.sendMessage({
        "MessageBody": JSON.stringify(event.Records[0].dynamodb.NewImage),
        "QueueUrl": "https://sqs.us-east-1.amazonaws.com/646101853261/members_queue_dev"
    }).promise();



  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
