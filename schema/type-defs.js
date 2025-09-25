const {gql} = require("apollo-server");

const typeDefs = gql`
type User{
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
}
type Query{
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
}
enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
}

type Movie{
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
}
`;

module.exports ={typeDefs}