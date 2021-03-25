app.controller("songCtrl", 
    ['$scope', 'svSongs', '$location', 
    function($scope, svSongs, $location) {

        $scope.title = "Bài hát mới";
        $scope.songList = [];
        $scope.pages = 0;
        $scope.current = 1;
        $scope.lo = "bai-hat-moi"
        $scope.pageList = [];
        $scope.page = 1;

        $scope.path = $location.path();
        $scope.paths = $scope.path.split("/");
        $scope.list = $scope.paths[1];
        
        if($scope.path == "/") {
            $scope.page = 1;
        } else {
            $scope.page = parseInt($scope.paths[$scope.paths.length - 1]);
        }

        if($scope.list != 'tim-kiem') {
            svSongs.getSongs($scope.page).then((response) => {
                $scope.songList = response.data.items;
                $scope.pages = response.data.pages;
                $scope.pageList = $scope.getNumber($scope.pages);
                $scope.current = response.data.current;
            })
        } else {
            let key = $scope.paths[2];
            $scope.lo = `tim-kiem/${key}`
            svSongs.search(key,$scope.page).then((response) => {
                $scope.songList = response.data.items;
                $scope.found = response.data.found;
                $scope.title = `Có ${$scope.found} kết quả`;
                $scope.current = response.data.current;
                $scope.pages = Math.round($scope.found/10);
                $scope.pageList = $scope.getNumber($scope.pages);
            })
        }

        $scope.search = () => {
            let key = removeVietnameseTones($scope.key);
            $scope.lo = `tim-kiem/${key}/1`
            $location.path($scope.lo);
        }

        

        $scope.getNumber = function(num) {
            return new Array(parseInt(num));   
        }
    }])

app.controller("mainCtrl", ['$scope', 'svSongs', '$rootScope', '$location',
    function($scope, svSongs, $rootScope, $location){
        $scope.loading = false;
        $scope.loginModal = new bootstrap.Modal(document.getElementById('loginModal'))
        $rootScope.isLoggedIn = false;
        if (localStorage.getItem("dssn") !== null) {
            $rootScope.demoSS = JSON.parse(window.localStorage.getItem("dssn"))[0];
        
            $rootScope.session = $scope.demoSS.role;
            $rootScope.isLoggedIn = $scope.demoSS.isLoggedIn;
        } else {
            $rootScope.isLoggedIn = false;
        }
        
        $scope.logout = function () {
            var alert = confirm("Bạn muốn đăng xuất?")
            if(alert){
                logout($rootScope, $location);
                svSongs.logout().then((response) => {
                    console.log(response.data);
                })
            }
        };
        $scope.login = () => {
            $scope.loading = true;
            if ($scope.loginform.$valid) {
                let data = JSON.stringify({
                    "email": $scope.email, 
                    "pass": $scope.pass
                });

                svSongs.login(data).then((response) => {
                    $scope.result = response.data;
                    $scope.loading = false;
                    if($scope.result == 1) {
                        alert("Đăng nhập thành công");
                        $rootScope.isLoggedIn = true;
                        $rootScope.session = "admin";
                        let demoSS = [{
                            role : $rootScope.session,
                            isLoggedIn : $rootScope.isLoggedIn
                        }];
                        let setjson = JSON.stringify(demoSS);
                        window.localStorage.setItem("dssn", setjson);
                        $scope.loginModal.hide()

                        // $location.path("/");
                        // console.log($rootScope.isLoggedIn);
                    } else {
                        $rootScope.isLoggedIn = false;
                        alert("Sai email hoặc mật khẩu, bạn không thể đăng nhập");
                    }
                })
            }
                
        } 


    }])

let logout = (rootScope, location) => {
    window.localStorage.removeItem("dssn");
    rootScope.isLoggedIn = false;
    rootScope.session = null;
    // location.path("/login");
}


    