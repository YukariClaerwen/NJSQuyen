
let music = document.querySelector('.music-element')
let playBtn = document.querySelector('.play')
let seekbar = document.querySelector('.seekbar')
let currentTime = document.querySelector('.current-time')
let duration = document.querySelector('.duration')

// player

function handlePlay() {
    if (music.paused) {
        music.play();
        playBtn.className = 'pause'
        playBtn.innerHTML = '<i class="material-icons">pause</i>'
    } else {
        music.pause();
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    }
    music.addEventListener('ended', function () {
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
        music.currentTime = 0
    });
}

music.onloadeddata = function () {
    seekbar.max = music.duration
    var ds = parseInt(music.duration % 60)
    var dm = parseInt((music.duration / 60) % 60)
    duration.innerHTML = dm + ':' + ds
}
music.ontimeupdate = function () { seekbar.value = music.currentTime }
handleSeekBar = function () { music.currentTime = seekbar.value }
music.addEventListener('timeupdate', function () {
    var cs = parseInt(music.currentTime % 60)
    var cm = parseInt((music.currentTime / 60) % 60)
    currentTime.innerHTML = cm + ':' + cs
}, false)


// like
var favIcon = document.querySelector('.favorite')
function handleFavorite() {
    favIcon.classList.toggle('active');
}


// repeat
var repIcon = document.querySelector('.repeat')
function handleRepeat() {
    if (music.loop == true) {
        music.loop = false
        repIcon.classList.toggle('active')
    }
    else {
        music.loop = true
        repIcon.classList.toggle('active')
    }
}

// volume
var volIcon = document.querySelector('.volume')
var volBox = document.querySelector('.volume-box')
var volumeRange = document.querySelector('.volume-range')
var volumeDown = document.querySelector('.volume-down')
var volumeUp = document.querySelector('.volume-up')

function handleVolume() {
    volIcon.classList.toggle('active')
    volBox.classList.toggle('active')
}

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);

function handleVolumeDown() {
    volumeRange.value = Number(volumeRange.value) - 20
    music.volume = volumeRange.value / 100
}
function handleVolumeUp() {
    volumeRange.value = Number(volumeRange.value) + 20
    music.volume = volumeRange.value / 100
}

app.controller("playCtrl", 
    ['$scope', 'svSongs', '$location', 
    ($scope, svSongs, $location) => {

        $scope.des = [];
        let path = window.location.pathname;
        let paths = path.split("/");
        let name = paths[paths.length - 1];

        console.log(name);

        svSongs.getSong(name).then((response) => {
            $scope.des = response.data.data;
        })

        $scope.hdplay = function () {
            let music = document.querySelector('.music-element')
            let playBtn = document.querySelector('.play')
            let seekbar = document.querySelector('.seekbar')
            let currentTime = document.querySelector('.current-time')
            let duration = document.querySelector('.duration')

            handlePlay(music, playBtn)
        };

        $scope.playBtn = document.querySelector('.play')
        $scope.seekbar = document.querySelector('.seekbar')
        $scope.currentTime = document.querySelector('.current-time')
        $scope.duration = document.querySelector('.duration')

        $scope.playAudio = function() {
            var music = new Audio($scope.des.location);
            // .play();

            if (music.paused) {
                music.play();
                $scope.playBtn.className = 'pause'
                $scope.playBtn.innerHTML = '<i class="material-icons">pause</i>'
            } else {
                music.pause();
                $scope.playBtn.className = 'play'
                $scope.playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
            }
            music.addEventListener('ended', function () {
                $scope.playBtn.className = 'play'
                $scope.playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
                music.currentTime = 0
            });
        };

        // function handlePlay() {
            
        // }
    }])