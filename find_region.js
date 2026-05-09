const { Client } = require('pg');
const regions = ['eu-central-1', 'us-east-1', 'eu-west-1', 'eu-west-2', 'us-west-1', 'us-west-2', 'ap-southeast-1', 'ap-south-1', 'sa-east-1', 'ca-central-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-southeast-2', 'eu-west-3'];
const password = '$GreatisGod26$';
const projectRef = 'euovsbhdkzemxhtekupz';
const pswdUrlEncoded = encodeURIComponent(password);

async function findRegion() {
  for (const region of regions) {
    const url = `postgresql://postgres.${projectRef}:${pswdUrlEncoded}@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=require`;
    const client = new Client({ connectionString: url, connectionTimeoutMillis: 5000 });
    try {
      await client.connect();
      console.log('SUCCESS: ' + region);
      await client.end();
      process.exit(0);
    } catch (e) {
      if (e.code !== 'ENOTFOUND') {
        console.log('Error ' + region + ': ' + e.message);
        if (e.message.includes('password authentication failed') || e.message.includes('pgbouncer')) {
             console.log('FOUND REGION but auth error: ' + region);
             process.exit(0);
        }
      }
    }
  }
  console.log('NOT FOUND');
}
findRegion();
