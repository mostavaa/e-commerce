import qs from 'qs';

const customFetch = async (url, additionalOptions) => {
  const options = {
    ...additionalOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(additionalOptions && additionalOptions.headers),
    },
  };
  const response = await fetch(url, options);
  // if (response.status === 401) {
  //   dispatch({ type: LOG_OUT });
  // }
  // if (response.status >= 500) {
  //   navigate('AppError');
  // }
  return Promise.resolve(response);
};

export default {
  get: async (url, query = {}) => {
    const queryString =
      Object.keys(query).length === 0 && query.constructor === Object
        ? ""
        : `?${qs.stringify(query)}`;
    return customFetch(`${url}${queryString}`, {
      headers: {
        Authorization: ""
      }
    });
  },
  post: async (url, body = {}) => {
    return customFetch(`${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: ""
      },
      body: JSON.stringify(body)
    });
  },
  postWithFiles: async (url, body) => {
    const options = {
      method: "POST",
      mode: "cors",

      body: (body),
      headers: {
        Authorization: ""
      },
    };
    const response = await fetch(url, options);
    return Promise.resolve(response);
  },

}; 