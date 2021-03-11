// let app = angular.module("app.music");

app.factory("svSongs", ["$http", ($http) => {
    return {
        getSongs: (page) => {
            return $http.get(`/baihat/${page}`);
        },
        search: (key, page) => {
            return $http.get(`/timkiem/${key}/${page}`);
        },
        getSong: (name) => {
            return $http.get(`/nhac/${name}`);
        }
    }
}])

