import config from "./config";
import axios from "axios";

export default {
  get(path: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.coreBaseUrl + path)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
  post(path: string, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .post(config.coreBaseUrl + path, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
  put(path: string, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .put(config.coreBaseUrl + path, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
  patch(path: string, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.coreBaseUrl + path, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
  delete(path: string) {
    return new Promise((resolve, reject) => {
      axios
        .delete(config.coreBaseUrl + path)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}