import axios from "axios";

//Get browser
export const api = getAPIClient()

// Get SSR
export function getAPIClient(ctx?: any) {

    const api = axios.create({
        baseURL: 'http://localhost:3333'
    })

  // api.interceptors.request.use(config => {
  //   console.log(config);

  //   return config;
  // })

  // if (token) {
  //   console.log("bearer")
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // }

    return api;
}