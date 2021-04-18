import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Movie } from '../Movie/Movie';
import { useMovie } from '../../graphql/useMovie';
import { Loading } from '../Atoms/Loading';

export const Movies = () => {
    let render = null;
    const [pageMovies, setPageMovies] = useState(1);
    const [dataMovie, setDataMovie] = useState([]);
    const [scrollTo, setScrollTo] = useState(1);
    const { data, loading } = useMovie(pageMovies);

    useEffect(() => {
        if(data){
            setDataMovie([...dataMovie, ...data.getMoviesByPage.movies]);
        }
    }, [data]);
    
    window.onscroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight &&
            data && data.getMoviesByPage && data.getMoviesByPage.page && data.getMoviesByPage.page
        ) {
            if(window.innerHeight + document.documentElement.scrollTop > scrollTo){
                setScrollTo(window.innerHeight + document.documentElement.scrollTop);
            }
            setPageMovies(data.getMoviesByPage.page + 1);
        }
    }
    window.scrollTo(0, scrollTo);
    if(loading){
        render = (
            <Loading/>
        );
    }else {
        render = (
            <Grid container spacing={10}>
                {!loading && <Movie
                    data={dataMovie}
                />}
            </Grid>
        );
    }
    return (
        <>
            {render}
        </>
    );
}