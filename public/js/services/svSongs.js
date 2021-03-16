app.factory("svSongs", ["$http", ($http) => {
    return {
        getSongs: (page) => {
            return $http.get(`/songlist/${page}`);
        },
        search: (key, page) => {
            return $http.get(`/search/${key}/${page}`);
        },
        getSong: (name) => {
            return $http.get(`/song/${name}`);
        },
        login: (data) => {
            return $http.post(`/login`, data);
        }
    }
}])

