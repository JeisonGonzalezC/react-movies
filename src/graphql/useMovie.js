import { useQuery, gql } from '@apollo/client';

export const useMovie = (page) => {
    const GET_MOVIES_BY_PAGE = gql`
        query getMoviesByPage($page:Int!) {
            getMoviesByPage(page: $page) {
                movies {
                    id
                    title
                    release_date
                    backdrop_path
                }
                page
            }
        }
    `;

    const { data, loading, error } = useQuery(GET_MOVIES_BY_PAGE, {
        variables: {
            page
        }
    });

    return {
        data,
        loading,
        error
    }
}

export const useMovieSelect = (id) => {
    const GET_MOVIE_SELECT = gql`
        query getMoviesById($id:Int!) {
            getMoviesById(id: $id) {
                id
                title
                release_date
                backdrop_path
                actors
                genres {
                    id
                    name
                }
            }
        }
    `;

    const { data, loading, error } = useQuery(GET_MOVIE_SELECT, {
        variables: {
            id
        }
    });

    return {
        data,
        loading,
        error
    }
}