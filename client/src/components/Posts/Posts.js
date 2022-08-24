import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({currentId,setCurrentId}) => {
  const posts = useSelector((state) => state.posts.posts);
  const isLoading=useSelector((state)=>state.posts.isLoading);
  
  


  const classes = useStyles();

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post}  setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
