import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

// TODO:
/**
 * 
 * 
 1. Use express
 2. Make the routes: /graphql, /lightfunnels and /webhook
 3. LF Authentication
 4. LF Authorizer
 *
**/

const server = new ApolloServer({
  schema: schema,
  context: context,
});

server.listen().then(async ({ url }) => {
  console.log(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});
