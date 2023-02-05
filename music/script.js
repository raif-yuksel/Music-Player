let e = document
const image = e.getElementById("cover")
const title = e.querySelector(".title")
const artist = e.querySelector(".artist")
const music = e.querySelector("audio")
const currentTimeEl = e.getElementById("current-time")
const durationEl = e.getElementById("duration")
const progress = e.getElementById("progress")
const progressContainer = e.getElementById("progress-container")
const prevBtn = e.getElementById("prev")
const playBtn = e.getElementById("play")
const nextBtn = e.getElementById("next")
const background = e.getElementById("background")
const songs = [
	{path:"./müzik/sen-yokken.mp3",musicName:"Sen Yokken",artist:"Hande Ünsal",cover:"https://i.scdn.co/image/ab67616d00001e029a9810ea30babffec1be69fd"},
	{path:"./müzik/cano.mp3",musicName:"Cano",artist:"Burak Bulut",cover:"https://mp3kutu.com/album/burak-bulut-hasat.jpg"},
	{path:"./müzik/mabel-matiz.mp3",musicName:"Antidepresan",artist:"Mabel Matiz",cover:"https://www.gitaregitim.net/wp-content/uploads/2022/12/mert-demir-mabel-matiz.jpg"},
	{path:"./müzik/seni-yazdım.mp3",musicName:"Seni Yazdım",artist:"Müslüm Gürses",cover:"https://i.ytimg.com/an/wtOHNhG0EZc/2cb41168-be6b-4386-aecd-2014676b352c_mq.jpg?v=5d1276b8"}
]

songs.forEach(function(song,index){
    let satir=$("<div>")
    let hucre2=$("<h2>").text(song.musicName)
    let hucre3=$("<h3>").text(song.artist)
    satir.append(hucre2)
    satir.append(hucre3)
    $(".music-area").append(satir)
})

let isLoading = false
function playSong(){
	isLoading = true
	playBtn.classList.replace("fa-play", "fa-pause");
	playBtn.setAttribute("title", "Pause");
	music.play()
}
function pauseSong(){
	isLoading = false
	playBtn.classList.replace("fa-pause", "fa-play");
  	playBtn.setAttribute("title", "Play");
	music.pause()
}
function playToggle(){
	if (isLoading) {
		pauseSong()
	} else {
		playSong()
	}
}
function loadSongs(song){
	title.innerHTML = song.musicName
	artist.innerHTML = song.artist
	music.src = song.path
	changeCover(song.cover)
}
function changeCover(cover) {
	image.classList.remove("active");
	setTimeout(function(){
		image.src = cover
		image.classList.add("active");
	},100)
	background.src = cover
}
let songIndex = 0
function prevSong(){
	songIndex--
	if(songIndex < 0) {
		songIndex = 2
	}
	loadSongs(songs[songIndex])
	playSong()
}
function nextSong(){
	songIndex++
	if(songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSongs(songs[songIndex])
	playSong()
}
loadSongs(songs[songIndex])
function updateProgressBar(){
	if(isLoading){
		const duration = music.duration
	let currentTime = music.currentTime
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = progressPercent + "%"
	const durationMinutes = Math.floor(duration / 60)
	let durationSeconds = Math.floor(duration % 60)
	if (durationSeconds < 10){
		durationSeconds = "0" + durationSeconds
	}
	if (durationSeconds){
		durationEl.innerHTML = durationMinutes + ":" + durationSeconds
	}
	const currentMinutes = Math.floor(currentTime / 60)
	let currentSeconds = Math.floor(currentTime % 60)
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds
	}
	currentTimeEl.innerHTML = currentMinutes + ":" + currentSeconds
	}
}
function setProgressBar(e) {
	const width = this.clientWidth;
  	const clickX = e.offsetX;
  	const duration = music.duration;
  	music.currentTime = (clickX / width) * duration;
}
playBtn.addEventListener("click",playToggle)
prevBtn.addEventListener("click",prevSong)
nextBtn.addEventListener("click",nextSong)
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);