import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "lambda", {
      entry: "lambda/index.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
    });

    const api = new apigw.LambdaRestApi(this, "myapi", {
      handler: fn,
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
    });
    const apiKey = new apigw.ApiKey(this, "ApiKey", {
      apiKeyName: "my-api-key",
    });
    const plan = api.addUsagePlan("UsagePlan", {
      name: "my-usage-plan",
    });
    plan.addApiKey(apiKey);
    plan.addApiStage({
      stage: api.deploymentStage,
    });
  }
}
