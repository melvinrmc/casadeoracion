/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ATOMICINCREMENTER_ARN
	STORAGE_ATOMICINCREMENTER_NAME
	STORAGE_ATOMICINCREMENTER_STREAMARN
	STORAGE_MEMBER_ARN
	STORAGE_MEMBER_NAME
	STORAGE_MEMBER_STREAMARN
	STORAGE_MESAS_ARN
	STORAGE_MESAS_NAME
	STORAGE_MESAS_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ATOMICINCREMENTER_ARN
	STORAGE_ATOMICINCREMENTER_NAME
	STORAGE_ATOMICINCREMENTER_STREAMARN
	STORAGE_MEMBER_ARN
	STORAGE_MEMBER_NAME
	STORAGE_MEMBER_STREAMARN
	STORAGE_MESAS_ARN
	STORAGE_MESAS_NAME
	STORAGE_MESAS_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_ATOMICINCREMENTER_ARN
  STORAGE_ATOMICINCREMENTER_NAME
  STORAGE_ATOMICINCREMENTER_STREAMARN
  STORAGE_MEMBER_ARN
  STORAGE_MEMBER_NAME
  STORAGE_MEMBER_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "co_member";
let tableNameSequence = "AtomicIncrementer";
let tableNameMesas = "co_mesas"
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
  tableNameSequence = tableNameSequence + '-' + process.env.ENV;
  tableNameMesas = tableNameMesas + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const userIdUpdatePresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/members";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + '/register/:registerid', function (req, res) {
  const condition = {}
  condition['registerid'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['registerid']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition['registerid']['AttributeValueList'] = [convertUrlType(req.params['registerid'], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  console.log(condition);

  let queryParams = {
    TableName: tableName,
    IndexName: "registerId-id-index",
    KeyConditionExpression: "registerId = :registerId",
    ExpressionAttributeValues: {
      ":registerId": condition.registerid.AttributeValueList[0]
    },
  };

  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'DynamoDb: Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});


app.get(path + '/dpi/:dpi', function (req, res) {
  const condition = {}
  condition['dpi'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['dpi']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition['dpi']['AttributeValueList'] = [convertUrlType(req.params['dpi'], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  console.log(condition);

  let queryParams = {
    TableName: tableName,
    IndexName: "dpi-id-index",
    KeyConditionExpression: "dpi = :dpi",
    ExpressionAttributeValues: {
      ":dpi": condition.dpi.AttributeValueList[0]
    },
  };

  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'DynamoDb: Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});

app.get('/soymiembro/dpi/:dpi' , function(req, res) {
  const condition = {}
  condition['dpi'] = {
    ComparisonOperator: 'EQ'
  }
  
    condition['birthday'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['dpi']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition['dpi']['AttributeValueList'] = [ convertUrlType(req.params['dpi'], partitionKeyType) ];
      condition['birthday']['AttributeValueList'] = [ convertUrlType(req.query['birthday'], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  
  console.log(condition);

  let queryParams = {
    TableName: tableNameMesas,
    IndexName: "dpi-birthday-index",
    KeyConditionExpression: "dpi = :dpi and birthday = :birthday",
    ExpressionAttributeValues: {
      ":dpi" : condition.dpi.AttributeValueList[0],
      ":birthday" : condition.birthday.AttributeValueList[0]
    },
  };
  
  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'DynamoDb: Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

app.get(path + '/consulta', function (req, res) {
  const condition = {}
  condition['id'] = {
    ComparisonOperator: 'EQ'
  }

  condition['accessNumber'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['accessNumber']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition['id']['AttributeValueList'] = [convertUrlType(req.query['id'], partitionKeyType)];
      condition['accessNumber']['AttributeValueList'] = [convertUrlType(req.query['accessNumber'], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  console.log(condition);

  let queryParams = {
    TableName: tableName,
    IndexName: "accessNumber-id-index",
    KeyConditionExpression: "accessNumber = :accessNumber and id = :id",
    ExpressionAttributeValues: {
      ":accessNumber": condition.accessNumber.AttributeValueList[0],
      ":id": condition.id.AttributeValueList[0]
    },
  };

  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'DynamoDb: Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});

app.get('/consulta', function (req, res) {
  const condition = {}
  condition['id'] = {
    ComparisonOperator: 'EQ'
  }

  condition['accessNumber'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['accessNumber']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition['id']['AttributeValueList'] = [convertUrlType(req.query['id'], partitionKeyType)];
      condition['accessNumber']['AttributeValueList'] = [convertUrlType(req.query['accessNumber'], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  console.log(condition);

  let queryParams = {
    TableName: tableName,
    IndexName: "accessNumber-id-index",
    KeyConditionExpression: "accessNumber = :accessNumber and id = :id",
    ExpressionAttributeValues: {
      ":accessNumber": condition.accessNumber.AttributeValueList[0],
      ":id": condition.id.AttributeValueList[0]
    },
  };

  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'DynamoDb: Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});

app.get(path + '/registro/:numRegistro', function (req, res) {
  const condition = {}
  condition['numRegistro'] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition['numRegistro']['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition['numRegistro']['AttributeValueList'] = [convertUrlType(req.params['numRegistro'], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  console.log(condition);

  let queryParams = {
    TableName: tableName,
    IndexName: "numRegistro-id-index",
    KeyConditionExpression: "numRegistro = :numRegistro",
    ExpressionAttributeValues: {
      ":numRegistro": condition.numRegistro.AttributeValueList[0]
    },
  };

  console.log(queryParams)

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'DynamoDb: Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});


/********************************
 * HTTP Get method for list objects *
 ********************************/

 app.get('/scan', function (req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let queryParams = {
    TableName: tableNameMesas,
    ProjectionExpression: "id, firstName, lastName, dpi, registerEmail, mesa, birthday",
    //KeyConditions: condition
  }

dynamodb.scan(queryParams, (err, data) => {
    if (err) {
        res.statusCode = 500;
        res.json({
            error: 'Could not load items: ' + err
        });
    } else {
      res.json(data.Items);
      /*
        if (data.LastEvaluatedKey !== "undefined") {
            queryParams.ExclusiveStartKey  = data.LastEvaluatedKey;
            dynamodb.scan(queryParams, (err2, data2) => {
                if (err2) {
                    res.statusCode = 500;
                    res.json({
                        error: 'Could not load items2: ' + err2
                    });
                } else {
                    res.json(data.Items.concat(data2.Items));
                }
            });
        } else {
            res.json(data.Items);
        } */
    }
});

});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data);
      }
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function (req, res) {

  if (userIdUpdatePresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider || UNAUTH;
  }

  var moment = require("moment-timezone");
  var date = new Date();
  req.body.lastUpdated = moment(date.getTime()).tz("America/Guatemala").format("YYYY-MM-DDTHH:mm:ss.SSSZZ");

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

/************************************
* HTTP post method for nextValue Id *
*************************************/

app.post(path + '/nextvalue', function (req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableNameSequence,
    Item: req.body,
    Key: { Id: 1 },
    UpdateExpression: 'SET #val = if_not_exists(#val, :zero) + :incr',
    ExpressionAttributeNames: { '#val': 'Value' },
    ExpressionAttributeValues: { ':incr': 1, ':zero': 0 },
    ReturnValues: 'UPDATED_NEW',
  }

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'post call succeed!', url: req.url, data: data })
    }
  });
});


/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function (req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'post call succeed!', url: req.url, data: data })
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
    } else {
      res.json({ url: req.url, data: data });
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
