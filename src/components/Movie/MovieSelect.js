import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from 'react-router-dom';
import { useMovieSelect } from '../../graphql/useMovie';
import { Loading } from '../Atoms/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

export const MovieSelect = () => {
    let render = null;
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const { data, loading } = useMovieSelect(parseInt(id, 10));

    const handleReturn = () => { 
        history.goBack(); 
    }

    if(loading){
        render = (
            <Loading/>
        );
    }else {
        const movie = (
            <Card className={classes.root}>
                <CardHeader
                    title={data.getMoviesById.title}
                    subheader={data.getMoviesById.release_date}
                />
                <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w185/${data.getMoviesById.backdrop_path}`}
                    title={data.getMoviesById.title}
                />
            </Card>
        );
        
        const actors = data.getMoviesById.actors.map((actor, i) => {
            return (
                <div key={i}>
                    <ListItem button key={i}>
                        <ListItemText primary={actor} />
                    </ListItem>
                </div>
            );
        });

        const genres = Object.values(data.getMoviesById.genres).map((genrer, _i) => {
            return (
                <div key={genrer.id}>
                    <ListItem button key={genrer.id}>
                        <ListItemText primary={genrer.name} />
                    </ListItem>
                </div>
            );
        });

        render = (
            <>
                <Button onClick={handleReturn} variant="contained">Volver</Button>

                <Grid key={data.getMoviesById.id} container spacing={10}>
                    <Grid item xs={12} sm={4}>
                        {movie}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {actors}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {genres}
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <>
            {render}
        </>
    );
}