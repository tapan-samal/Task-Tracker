import axios from "axios";
import * as constant from './constant';

// wrapper for axios client
export const client = axios.create({
    baseURL: constant.BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGFwYW4gU2FtYWwiLCJlbWFpbCI6InRhcGFuc2FtYWxAZ21haWwuY29tIiwiaWQiOiI2NjEwZGI3MWEzNDM5NThiMGE5ODhhMDYifSwiaWF0IjoxNzEyNTU4MzUzLCJleHAiOjE3MjQ1NTgzNTN9.-BuJpIb3d55nbX-OqUchXilf2L4wq61nlCvgXcDzBbY'
    }
})

