import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import { API_URL } from "./constants/config";

const superagent = superagentPromise(_superagent, global.Promise);

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_URL}/?rest_route=${url}`).then(responseBody),
  getWithCredentials: url =>
    superagent
      .get(`${API_URL}${url}`)
      .withCredentials()
      .then(responseBody)
};

const Menus = {
  bySlug: slug => requests.get(`/react-wp-rest/menus/${slug}`)
};

const Content = {
  data: type => requests.get(`/wp/v2/${type}&_embed`),
  dataBySlug: (type, slug) =>
    requests.get(`/wp/v2/${type}&slug=${slug}&_embed`),
  dataBySubcategorySlug: slug =>
    requests.get(`/react-wp-rest/subcategory/${slug}`),
  dataByCategorySlug: slug =>
    requests.get(`/react-wp-rest/posts/${slug}&_embed`),
  previewDataBySlug: (type, slug, wpnonce) =>
    requests.getWithCredentials(
      `/react-wp-rest/preview&type=${type}&slug=${slug}&_wpnonce=${wpnonce}&_embed`
    ),
  partners: () => requests.get("/react-wp-rest/categories/list"),
  pageList: () => requests.get("/react-wp-rest/pages/list")
};

export default {
  Menus,
  Content
};
