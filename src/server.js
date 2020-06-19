import { ApolloServer } from 'apollo-server';
import { loadTypeSchema } from './util/schema';
import { merge } from 'lodash';
import items from './App/item/item.resolver';
import users from './App/user/user.resolver'
//Define modules of your app you'll create here
const Apps = ['user', 'item']

export const start = async () => {
    const rootSchema = `
            schema {
                query: Query
            }
    `

    //const AppSchema = await Promise.all(Apps.map(loadSchemaType))
    const AppSchema = await Promise.all(Apps.map(loadTypeSchema))



    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs: [rootSchema, ...AppSchema],
        resolvers: merge({}, users, items),
        context({ req }) {
            return { user: null }
        }
    })


    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server running at ${url}`);
    });

}
