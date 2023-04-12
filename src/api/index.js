import axios from "axios";

const apiUri = 'https://news-app.vietjax.com/api';

export const getCategories = () => axios.get(`${apiUri}/categories`);
export const getPostDetail = (post) => axios.get(`${apiUri}/news/detail?title=${post}`);
export const getPostByCategory = (category) => axios.get(`${apiUri}/get_news_as_category?category_name=${category}`);
export const getCountPostByCategory = (category) => axios.get(`${apiUri}/count/news_as_category?category_name=${category}`);
export const getPostAsDirected = (start, limit) => axios.get(`${apiUri}/news/get_news_as_directed?start=${start}&limit=${limit}`);
export const getPostAsCategoryDirected = (category, start, limit) => axios.get(`${apiUri}/get_news_as_category_directed?category_name=${category}&start=${start}&limit=${limit}`);

