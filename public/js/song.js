app.controller("songCtrl", 
    ['$scope', 'svSongs', '$location', 
    ($scope, svSongs, $location) => {

        $scope.title = "Bài hát mới";
        $scope.songList = [];
        $scope.pages = 0;
        $scope.current = 1;
        $scope.lo = "bai-hat"
        $scope.pageList = [];


        $scope.path = window.location.pathname;
        // let res = $scope.path.split("/");
        // console.log(res[res.length - 1])
        if($scope.path == "/"){
            svSongs.getSongs(1).then((response) => {
                $scope.songList = response.data.items;
                $scope.pages = response.data.pages;
                $scope.pageList = $scope.getNumber(response.data.pages);
                $scope.current = response.data.current;
                console.log($scope.songList)
            })
        } else {
            let paths = $scope.path.split("/");
            let list = paths[1];
            if(list == 'bai-hat') {
                let page = paths[paths.length - 1];
                svSongs.getSongs(page).then((response) => {
                    $scope.songList = response.data.items;
                    $scope.pages = response.data.pages;
                    $scope.current = response.data.current;
                    console.log($scope.pages)
                })
            }
            else {let paths = $scope.path.split("/");
                let key = paths[2];
                let page = paths[paths.length - 1];
                $scope.lo = `tim-kiem/${key}`
                search(svSongs,key, page, $scope)
            }
        }

        $scope.search = () => {
            let key = removeVietnameseTones($scope.key);
            $scope.lo = `tim-kiem/${key}`
            if($scope.path == "/"){
                search(svSongs,key, 1, $scope)
            } else {
                let paths = $scope.path.split("/");
                let page = paths[paths.length - 1];
                search(svSongs,key, page, $scope)
            }
            
        }

        

        $scope.getNumber = function(num) {
            return new Array(parseInt(num));   
        }
    }])

let search = (sv, key, page, sc) => {
    sv.search(key,page).then((response) => {
        sc.found = response.data.found;
        sc.songList = response.data.res;
        sc.title = `Có ${sc.found} kết quả`;
        
        sc.pages = []
        for(let i = 0; i <= sc.found/10; i++) {
            sc.pages.push(i+1);
            console.log(sc.pages)
        }
    })
}


    