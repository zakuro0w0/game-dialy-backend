import { DynamoDB, S3 } from 'aws-sdk';

const dynamoDB = new DynamoDB();
const s3 = new S3();

const createTableParams = {
  TableName: 'GameDiary',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

const createBucketParams = {
  Bucket: 'game-diary-screenshots',
};

dynamoDB.createTable(createTableParams, (err, data) => {
  if (err) console.error(err);
  else console.log('Created DynamoDB table:', data);
});

s3.createBucket(createBucketParams, (err, data) => {
  if (err) console.error(err);
  else console.log('Created S3 bucket:', data);
});