import { AmplifyDDBResourceTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyDDBResourceTemplate) {
        
    resources.dynamoDBTable.billingMode ="PAY_PER_REQUEST";

    resources.dynamoDBTable.provisionedThroughput = {
        readCapacityUnits: 0,
        writeCapacityUnits: 0
      };

}
