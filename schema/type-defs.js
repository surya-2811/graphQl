const { gql } = require("apollo-server");

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
    ROME
}

type Movie{
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
}

input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = ROME
}
input updateUsernameInput{
    id:ID!
    username: String!
}
type Mutation{
    createUser(input: CreateUserInput!): User
    updateUsername(input: updateUsernameInput!): User
    deleteUser(id: ID!): User
}
`;

module.exports = { typeDefs }