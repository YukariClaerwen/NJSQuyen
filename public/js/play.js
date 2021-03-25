
// let music = document.querySelector('.music-element')
// let playBtn = document.querySelector('.play')
// let seekbar = document.querySelector('.seekbar')
// let currentTime = document.querySelector('.current-time')
// let duration = document.querySelector('.duration')

// // player done

// function handlePlay() {
//     if (music.paused) {
//         music.play();
//         playBtn.className = 'pause'
//         playBtn.innerHTML = '<i class="material-icons">pause</i>'
//     } else {
//         music.pause();
//         playBtn.className = 'play'
//         playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
//     }
//     music.addEventListener('ended', function () {
//         playBtn.className = 'play'
//         playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
//         music.currentTime = 0
//     });
// }

// done
// music.onloadeddata = function () {
//     seekbar.max = music.duration
//     var ds = parseInt(music.duration % 60)
//     var dm = parseInt((music.duration / 60) % 60)
//     duration.innerHTML = dm + ':' + ds
// }
// music.ontimeupdate = function () { seekbar.value = music.currentTime }
// handleSeekBar = function () { music.currentTime = seekbar.value }
// music.addEventListener('timeupdate', function () {
//     var cs = parseInt(music.currentTime % 60)
//     var cm = parseInt((music.currentTime / 60) % 60)
//     currentTime.innerHTML = cm + ':' + cs
// }, false)


// // like done
// var favIcon = document.querySelector('.favorite')
// function handleFavorite() {
//     favIcon.classList.toggle('active');
// }


// // repeat done
// var repIcon = document.querySelector('.repeat')
// function handleRepeat() {
//     if (music.loop == true) {
//         music.loop = false
//         repIcon.classList.toggle('active')
//     }
//     else {
//         music.loop = true
//         repIcon.classList.toggle('active')
//     }
// }

// // volume
// var volIcon = document.querySelector('.volume')
// var volBox = document.querySelector('.volume-box')
// var volumeRange = document.querySelector('.volume-range')
// var volumeDown = document.querySelector('.volume-down')
// var volumeUp = document.querySelector('.volume-up')

// function handleVolume() {
//     volIcon.classList.toggle('active')
//     volBox.classList.toggle('active')
// }

// volumeDown.addEventListener('click', handleVolumeDown);
// volumeUp.addEventListener('click', handleVolumeUp);

// function handleVolumeDown() {
//     volumeRange.value = Number(volumeRange.value) - 20
//     music.volume = volumeRange.value / 100
// }
// function handleVolumeUp() {
//     volumeRange.value = Number(volumeRange.value) + 20
//     music.volume = volumeRange.value / 100
// }

app.controller("playCtrl", 
    ['$scope', 'svSongs', '$location', '$rootScope', 
    function($scope, svSongs, $location, $rootScope) {
        $scope.des = [];
        let path = window.location.pathname;
        let paths = path.split("/");
        let name = paths[paths.length - 1];
        $scope.params = $location.search();

        $scope.playBtn = document.querySelector('.play')
        $scope.seekbar = document.querySelector('.seekbar')
        $scope.currentTime = document.querySelector('.current-time')
        $scope.duration = document.querySelector('.duration')
        $scope.seek = 0;

        if($scope.params.key != '') {
            svSongs.getSong($scope.params.key).then((response) => {
                $scope.des = response.data.data;
                $scope.music = new Audio($scope.des.location);
                $scope.playAudio();
                playmusic($scope.music,$scope.seekbar,$scope.duration);
                onupdate($scope.music, $scope.seekbar);
                timeupdate($scope.music,$scope.currentTime);
            })
        } else if($scope.params.yb != '') {
            $scope.link = "https://www.youtube.com/embed/" + $scope.params.yb;
            var html = "<iframe width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+ $scope.params.yb + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
            let el = document.getElementById("videoframe")
            angular.element(el).append(html);
        }

        $scope.autoplay = () => {
            // $scope.music = new Audio($scope.des.location);
            $scope.music.play();
            $scope.playBtn.className = 'pause'
            $scope.playBtn.innerHTML = '<i class="material-icons">pause</i>'
        }

        $scope.playAudio = function() {
            
            // $scope.music = new Audio($scope.des.location);

            if ($scope.music.paused) {
                $scope.music.play();
                $scope.playBtn.className = 'pause'
                $scope.playBtn.innerHTML = '<i class="material-icons">pause</i>'
            } else {
                $scope.music.pause();
                $scope.playBtn.className = 'play'
                $scope.playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
            }
            $scope.music.addEventListener('ended', function () {
                console.log("end")
                $scope.playBtn.className = 'play'
                $scope.playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
                $scope.music.currentTime = 0
            });
        };

        $scope.handleSeekBar = () => { 
            $scope.music.currentTime = $scope.seek
        }

        // like
        $scope.favIcon = document.querySelector('.favorite');
        $scope.handleFavorite = () => {
            $scope.favIcon.classList.toggle('active');
        }

        // repeat
    
        $scope.repIcon = document.querySelector('.repeat')
        $scope.handleRepeat = () => {
            if ($scope.music.loop == true) {
                $scope.music.loop = false
                $scope.repIcon.classList.toggle('active')
            }
            else {
                $scope.music.loop = true
                $scope.repIcon.classList.toggle('active')
            }
        }

        // volume
        $scope.volIcon = document.querySelector('.volume')
        $scope.volBox = document.querySelector('.volume-box')
        $scope.volumeRange = document.querySelector('.volume-range')
        $scope.volumeDown = document.querySelector('.volume-down')
        $scope.volumeUp = document.querySelector('.volume-up')

        $scope.handleVolume = () => {
            $scope.volIcon.classList.toggle('active')
            $scope.volBox.classList.toggle('active')
        }
        $scope.volume = 50
        $scope.handleVolumeBar = () => { 
            $scope.volumeRange.value = $scope.volume
            $scope.music.volume = $scope.volumeRange.value / 100
        }

        $scope.handleVolumeDown = () => {
            $scope.volumeRange.value = Number($scope.volumeRange.value) - 20
            $scope.music.volume = $scope.volumeRange.value / 100
        }
        $scope.handleVolumeUp = () => {
            $scope.volumeRange.value = Number($scope.volumeRange.value) + 20
            $scope.music.volume = $scope.volumeRange.value / 100
        }
        
        $scope.download = () => {
            if($rootScope.isLoggedIn) {
                let link = document.createElement("a");
                link.download = $scope.des.title;
                link.href = `${$scope.des.location}&download=true`;
                console.log(link.href)
                link.click();
            } else {
                alert("Vui lòng đăng nhập để tải bài hát");
                $scope.loginModal.show()
            }
        }
        $rootScope.$on("$routeChangeStart", () => {
            $scope.music.pause();
        })
    }])

    let playmusic = (music,seekbar,duration) => {
        music.onloadeddata = function () {
            seekbar.max = music.duration
            var ds = parseInt(music.duration % 60)
            var dm = parseInt((music.duration / 60) % 60)
            duration.innerHTML = dm + ':' + ds
        }
    }

    let onupdate = (music, seekbar) => {
        music.ontimeupdate = function () { 
            seekbar.value = music.currentTime 
        }
    }

    let timeupdate = (music, currentTime) => {
        music.addEventListener('timeupdate', function () {
            var cs = parseInt(music.currentTime % 60)
            var cm = parseInt((music.currentTime / 60) % 60)
            currentTime.innerHTML = cm + ':' + cs
            // console.log(music.currentTime)
        }, false)
    }