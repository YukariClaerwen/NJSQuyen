app.factory("svSongs", ["$http", ($http) => {
    return {
        getSongs: (page) => {
            return $http.get(`/songlist/${page}`);
        },
        search: (key, page) => {
            return $http.get(`/search/${key}/${page}`);
        },
        getSong: (key) => {
            return $http.get(`/song/${key}`);
        },
        login: (data) => {
            return $http.post(`/login`, data);
        }
    }
}])

