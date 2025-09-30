import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
    users {
        id
        age
        name
        username
        nationality
        friends {
        id
        name
        }
        favouriteMovies {
        id
        name
        yearOfPublication
        isInTheaters
        }
    }
    }
    
`
const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
      movies{
      id
      name
      isInTheaters
      yearOfPublication
    }
  }
`

const GET_MOVIE_BY_NAME = gql`
query GetMovie($name: String!){
   movie(name: $name) {
     id
     name
     isInTheaters
     yearOfPublication
   }
}
`

const CREATE_USER_MUTATION = gql`
   mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input){
        name
        id
    }
   }

`


function DisplayData() {
    const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS)
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
    const [moviesSearched, setMoviesSearched] = useState("");
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
    const [createUser] = useMutation(CREATE_USER_MUTATION);

    // create user states
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("")

    console.log(movieData, "here")
    if (loading) {
        return <h1>Data is loading ....</h1>
    }
    if (data.users) {
        console.log(data.users)
    }
    if (error) {
        console.log(error)
    }
    return <div>
        <input type="text" placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
        />
        <input type="text" placeholder="username..."
            onChange={(e) => setUsername(e.target.value)}
        />
        <input type="number" placeholder="age..."
            onChange={(e) => setAge(Number(e.target.value))}
        />
        <input type="text" placeholder="Nationality..."
            onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
            onClick={() => {
                createUser({
                    variables: {
                        input: {
                            name,
                            username,
                            age,
                            nationality,
                        },
                    },
                });
                refetch();
            }}
        >
            Create Data
        </button>


        {data && data.users.map((item) => {
            return <div><p>name: {item.name}</p>
                <p>user Name: {item.username}</p>
                <p>Age: {item.age}</p>
            </div>
        })}
        {
            movieData && movieData.movies.map((item) => {
                return <div><p>Movie Name: {item.name}</p>
                </div>
            })
        }
        <div>
            <input type="text" placeholder="intersteller..." onChange={(e) => setMoviesSearched(e.target.value)} />
            <button onClick={() => fetchMovie({
                variables: {
                    name: moviesSearched
                }
            })}> Fetch Data</button>
            <div>
                {movieSearchData && <div>
                    <p>Movie Name: {movieSearchData.movie.name}</p>
                    <p>Year Of Publication: {movieSearchData.movie.yearOfPublication}</p>
                    <p>In Theaters: {movieSearchData.movie.isInTheaters ? "Yes" : "No"}</p>
                </div>}
                {movieError && <p>Something went wrong</p>}
            </div>
        </div>
    </div>
}

export default DisplayData