class MoviesApi {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;

	}

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}
	
	getMovies() {
		return fetch(`${this._baseUrl}`, {
			headers: (this._headers),
		}).then(this._onRes)
	}

}

export const moviesApi = new MoviesApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		'Content-Type': 'application/json'
	}
});
