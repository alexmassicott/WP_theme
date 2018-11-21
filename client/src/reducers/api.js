import { arrayToObject } from "../utilities/convertData";
import postTypes from "../post-types";

const postTypeDefaultState = arrayToObject(postTypes);

const defaultState = {
  data: {
    ...postTypeDefaultState
  },
  menus: {},
  lists: {
    pages: [],
    partners: [],
    subcategory: [],
    posts: []
  },
  search: {
    partners: [],
    posts: [],
    tags: []
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.type]: arrayToObject(action.payload.data, "slug")
        }
      };

    case "LOAD_DATA_BY_SLUG":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.type]: {
            ...state.data[action.payload.type],
            [action.payload.slug]: action.payload.data[0]
          }
        }
      };

    case "LOAD_JSON":
      return {
        ...state,
        lists: {
          ...state.lists,
          posts: action.payload
        }
      };

    case "CLEAR_POSTS_LIST":
      return {
        ...state,
        lists: {
          ...state.lists,
          posts: []
        }
      };

    case "CLEAR_SUBCAT_LIST":
      return {
        ...state,
        lists: {
          ...state.lists,
          subcategory: []
        }
      };
    case "LOAD_SEARCH_POSTS":
      return {
        ...state,
        search: {
          ...state.search,
          posts: action.payload
        }
      };
    case "LOAD_SEARCH_TAGS":
      return {
        ...state,
        search: {
          ...state.search,
          tags: action.payload
        }
      };
    case "LOAD_SEARCH_PARTNERS":
      return {
        ...state,
        search: {
          ...state.search,
          posts: action.payload
        }
      };
    case "LOAD_PARTNERS":
      return {
        ...state,
        search: {
          ...state.search,
          partners: action.payload
        }
      };
    case "LOAD_SUBCAT":
      return {
        ...state,
        lists: {
          ...state.lists,
          subcategory: action.payload
        }
      };

    case "LOAD_PAGES_LIST":
      return {
        ...state,
        lists: {
          ...state.lists,
          pages: action.payload
        }
      };

    case "LOAD_MENU":
      return {
        ...state,
        menus: {
          ...state.menus,
          [action.payload.slug]: action.payload.menu
        }
      };

    case "CLEAR_API_CONTENT":
      return {
        ...defaultState
      };

    case "CLEAR_API_DATA_BY_SLUG":
      if (
        state.data[action.payload.type] &&
        state.data[action.payload.type][action.payload.slug]
      ) {
        let newState = { ...state };
        delete newState.data[action.payload.type][action.payload.slug];

        return newState;
      }

      return state;

    default:
      return state;
  }
};
