// @ts-ignore
import axios from "axios";

const apiKey = 1;
const baseUrl = `https://www.themealdb.com/api/json/v1/${apiKey}`;

export interface Callbacks {
  onSuccess(...args: any[]): void;

  onError(...args: any[]): void;
}

class Api {
  getRandom = ({ onSuccess, onError }: Callbacks) => {
    this._get("filter", { onSuccess, onError }, { i: "chicken_breast" });
  };

  getBySearch(query: string, { onSuccess, onError }: Callbacks) {
    this._get(
      "search",
      { onSuccess, onError },
      { s: query.replace(/ /g, "_") }
    );
  }

  getById(id: number | string, { onSuccess, onError }: Callbacks) {
    this._get("lookup", { onSuccess, onError }, { i: id });
  }

  _get(route: string, { onSuccess, onError }: Callbacks, params?: object) {
    axios
      .get(`${baseUrl}/${route}.php`, { params })
      .then((res) => {
        onSuccess(res.data.meals);
      })
      .catch((err) => {
        onError(err);
      });
  }
}

export default Api;
