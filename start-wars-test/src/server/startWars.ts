import api from "./core"

export default {
  getPeople(page: number){
    return api.get("people/?page=" + page)
  },
  getFilms(film: string){
    return api.get("films/"+film)
  }
}