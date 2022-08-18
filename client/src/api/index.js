import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:5000'});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;

})


export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post("/posts", newPost);
export const UpdatePost=(id,UpdateDPost)=>API.patch(`/posts/${id}`,UpdateDPost);
export const DeletePost=(id)=>API.delete(`/posts/${id}`);
export const LikePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/searching?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const signin=(formData)=>API.post(`/user/signin`,formData);
export const signup=(formData)=>API.post(`/user/signup`,formData);



