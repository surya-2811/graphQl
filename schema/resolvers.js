const {UserList, MovieList } = require("../FakeData")

const resolvers = {
    Query: {
        users: () => {
            return UserList
        },
        user: (parent,args)=>{
            console.log("kjkjk")
             let id = Number(args.id);
             return UserList.filter((item)=> item.id === id)[0]
        },
        movies: ()=>{
            return MovieList
        },
        movie: (parent, args)=>{
           let name = args.name;
           return MovieList.find((item)=> item.name === name)
        },

    },
     User:{
          favouriteMovies: () => {
            return MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
      }  
}
module.exports ={resolvers}