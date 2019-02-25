import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import style from './PostsContainer.module.css';


const styles = {
    post: {
        height: "100px",
        backgroundColor: "rgb(220, 79, 71)",
        marginTop: "20px",
        textAlign: "center",
        borderRadius: "10px"
    }
};

class PostsContainer extends Component {
    render() {
        let rows = [];
        for (let i = 1; i <= 10; i++) {
            rows.push(
                <Grid
                    item
                    xs={8}
                    style={styles.post}
                >
                    Post
                    {' ' + i}
                </Grid>
            );
        }

        return (
            <Grid
                container
                justify="center"
                className={style.postsContainer}
            >
                {rows}
            </Grid>
        );
    }
}

export default PostsContainer;