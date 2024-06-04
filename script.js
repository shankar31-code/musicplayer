console.log("let play");
let songs;
let currentfolder;
let  currentAudio=new Audio();
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


async function getsongs(folder)
{    
  currentfolder = folder;
  let a=await fetch(`${folder}`)
    let response=await a.text();
    console.log(response)
    let div=document.createElement("div")
    div.innerHTML=response;
    let aa=div.getElementsByTagName("a");
     songs=[];
     for(let i=0;i<aa.length;i++)
        {
            const element=aa[i];
      //checking element where href end with a ".mp3"
            if(element.href.endsWith(".mp3")){
                  songs.push(element.href.split(`${folder}/%5BiSongs.info%5D`)[1]);
            }

        }
         //getting list all songs
console.log(songs);
let songUI=document.querySelector(".songlist").getElementsByTagName("ul")[0];
songUI.innerHTML="";
for (const song of songs) {
  songUI.innerHTML=songUI.innerHTML +`<li><img src="icons/music.svg" alt="music" srcset="" class="invert">
  <div class="info">
      <div>${song.replaceAll("%20"," ")}</div>
      <div>shankar</div>
  </div>
  <div class="playnow">
  <img src="icons/play.svg" alt="" srcset="" class="invert">
  </div></li>`;
  
}
    
}
 const playmusic=(track,pause=false)=>{
  currentAudio.src=`/${currentfolder}//%5BiSongs.info%5D`+track
  // for playing specfied song in library
  //let audio=new Audio("/songs/%5BiSongs.info%5D"+track);
  if(!pause){

      currentAudio.play();
      play.src="icons/pause.svg";
      

    }
  

  document.querySelector(".songinfo").innerHTML=decodeURI(track)
  document.querySelector(".songtime").innerHTML="00:00/00:00";
 
    

 }


  async function main(){

   
 await getsongs("songs/album2");
playmusic(songs[0],true);



//Attach an event listene to songs
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playmusic(e.querySelector(".info").firstElementChild.innerHTML)

    })
   
  })
  //script for playing song,pause,next,perivous
  play.addEventListener("click",()=>{
    if(currentAudio.paused)
      {
        currentAudio.play()
        play.src="icons/pause.svg";//for changing icon from pause to play


      }
      else{
        currentAudio.pause();
        play.src="icons/play.svg";//for changing icon from play to pause


      }
  })
  currentAudio.addEventListener("timeupdate",()=>{
    
      document.querySelector(".songtime").innerHTML=`${formatTime(currentAudio.currentTime)}/${formatTime(currentAudio.duration)}`;
      document.querySelector(".circle").style.left=(currentAudio.currentTime/currentAudio.duration)*100 + "%";

  })
  //adding event listener to seekbar
   document.querySelector(".seekbar").addEventListener("click",e=>{
    let precent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left=precent + "%";
    currentAudio.currentTime=((currentAudio.duration)*precent)/100
   })
   //adding  eventlistener for humberger
  

   
    document.querySelector(".humburger").addEventListener("click", () => {
        document.querySelector(".leftbox").style.left="0";
    });
    //adding eventlistener for closing humburger

    document.querySelector(".close").addEventListener("click", () => {
      document.querySelector(".leftbox").style.left="-100%";
  });
  //adding event listener for previous and next
  previous.addEventListener("click",()=>{
    console.log("previous clicked")
    let index=songs.indexOf( currentAudio.src.split("%5BiSongs.info%5D").slice(-1)[0])
   
    console.log(songs,index)
    if((index-1)>=0){
    playmusic(songs[index-1])
    }
  })
  next.addEventListener("click",()=>{
    let index=songs.indexOf( currentAudio.src.split("%5BiSongs.info%5D").slice(-1)[0])
   
    console.log(songs,index)
    if((index+1)<songs.length){
    playmusic(songs[index+1])
    }
  })

 //adding eventing listener to  volume


  volume.addEventListener("click", () => {
    if (currentAudio.muted) {
        currentAudio.muted = false;
        volume.src = "icons/volume.svg"; // Change to the icon representing unmuted state
    } else {
        currentAudio.muted = true;
        volume.src = "icons/mute.svg"; // Change to the icon representing muted state
    }
});
 
    // opening different songs folders
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
      
      e.addEventListener("click",async item=>{
        console.log(item.currentTarget.dataset)
        songs= await getsongs(`songs/${item.currentTarget.dataset.folder}` )
      })
    })


  }
 main();