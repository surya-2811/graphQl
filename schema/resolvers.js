const { UserList, MovieList } = require("../FakeData")

const resolvers = {
    Query: {
        users: () => {
            return UserList
        },
        user: (parent, args) => {
            let id = Number(args.id);
            return UserList.filter((item) => item.id === id)[0]
        },
        movies: () => {
            return MovieList
        },
        movie: (parent, args) => {
            let name = args.name;
            return MovieList.find((item) => item.name === name)
        },

    },
    User: {
        favouriteMovies: () => {
            return MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            let user = args.input;
            user.id = UserList.at(-1).id + 1;
            UserList.push(user)
            return user
        },
        updateUsername: (parent, args) => {
            let { id, username } = args.input;
            const user = UserList.find(u => u.id === Number(id));
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            for (let i = 0; i < UserList.length; i++) {
                if (UserList[i].id === Number(id)) {
                    UserList[i].username = username;
                    return UserList[i];
                }
            }
        },
        deleteUser: (parent, args)=>{
          let {id } = args;
          let index = UserList.findIndex((item)=> item.id === Number(id));
          if(index === -1){
            throw new Error(`User with id ${id} not found`);
          }
          let deletedUser = UserList.splice(index, 1)
          console.log(deletedUser)
          return deletedUser[0]
        }
    }
}
module.exports = { resolvers }