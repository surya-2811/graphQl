const {apolloServer} = require("apollo-server")

const server = new apolloServer({ typeDefs, resolvers });

server.listen().then(({url})=>{
    console.log(`Server is running at ${url}`);
})