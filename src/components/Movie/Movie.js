import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

export const Movie = (props) => {
    const classes = useStyles();
    if(!props.data){ return null; }
    const items = props.data.map((movie, _i) => {
        return (
            <Grid key={movie.id} item xs={12} sm={4}>
                <Card className={classes.root}>
                    <CardHeader
                        title={movie.title}
                        subheader={movie.release_date}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
                        title={movie.title}
                    />
                    <Link to={`/movie/${movie.id}`}>
                        Ver Película
                    </Link>
                </Card>
            </Grid>
        );
    });

    return (
      <>
        {items}
      </>
    );
}