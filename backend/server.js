const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const http = require('http');
require('dotenv').config();

// express server
const app = express();

// type query / mutation / subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

// resolvers
const resolvers = {
    Query: {
        totalPosts: () => 42
    }
};

async function startApolloServer(typeDefs, resolvers) {
    // Same ApolloServer initialization as before // graphql server
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
  
    // Required logic for integrating with Express
    await apolloServer.start();
  
    // applyMiddleware method connect ApolloServer to specific HTTP framework ie: express...
    apolloServer.applyMiddleware({app});

    // basic node server
    const httpServer = http.createServer(app);
  
    // rest endpoints
    app.get('/rest',function(req,res){
        res.json({
            data: "Congrats! You Server is started Sucessfully..!"
        });
    });

    // port
    app.listen(process.env.PORT,function() {
        console.log(`🚀 Server is ready at http://localhost:${process.env.PORT}`);
        console.log(`🚀 GQL Server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
    });

    // Modified server startup
    // await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
    // console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
}

startApolloServer(typeDefs,resolvers);