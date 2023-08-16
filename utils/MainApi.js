class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getHeaders(){
    return {
        // authorization: this._token,
        'content-type': 'application/json',
    }
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }
    return Promise.reject({status: res.status})
  }

  getMainPhoto() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  getMayakPictures() {
    return fetch(`${this._baseUrl}/mayak`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  
  /* 
  sendMovie (movie, currentUser) {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          owner: currentUser._id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
      })
      .then(this._getJsonOrError)
  }
  
  removeMovie(id){
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJsonOrError)
  }

  setUserInfo (newName, newEmail){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newName,
        email: newEmail
      })
    })
    .then(this._getJsonOrError)
  }

  setToken(jwt) {
    this._token = `Bearer ${jwt}`;
  }
*/
  


}

const MainApi = 
new Api(  
  {baseUrl: 'http://localhost:4001'}
)

export default MainApi;

// https://api.diploma.zhukov.nomoredomains.club
// http://localhost:4000
