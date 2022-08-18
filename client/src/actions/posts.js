import { START_LOADING, END_LOADING,FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,FETCH_BY_SEARCH,FETCH_POST} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const  {data}  = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
   
  

    
  } catch (error) {
    console.log(error.message);
  }
};


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const  {data}  = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
   
  

    
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
   
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);

    dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
    dispatch({ type: END_LOADING });

   
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdatePost=(post,CurrentId)=>async(dispatch)=>{
  try{
    const {data}=await api.UpdatePost(CurrentId,post);
    dispatch({type:UPDATE,payload:data});
  }catch (error) {
    console.log(error.message);
  }

}
export const DeletePost=(id)=>async(dispatch)=>{
  try{
    await api.DeletePost(id);
    dispatch({type:DELETE,payload:id});

  }catch (error) {
    console.log(error.message);
  }

}
export const LikePost=(id)=>async(dispatch)=>{
  try{
    try {
      const { data } = await api.LikePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }


  }catch (error) {
    console.log(error.message);
  }
}

