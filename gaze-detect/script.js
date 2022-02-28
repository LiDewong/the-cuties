
const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  faceapi.nets.faceLandmark68TinyNet.loadFromUri('./models'),
]).then(startVideo())

var cancel = false;

var earlimit = 0.27;
var limitlip = 30;
var leftlimit = 2.2;
var rightlimit = 0.78;

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  if(cancel== true){
    return;
  }
}

var counter = 0;
let number = document.getElementById('number');

let screen1 = document.querySelector("#screen1");



function increment(){
  counter++;
  console.log("Counter1"+ counter);
  if(counter==3 ){
    console.log("yawn detected")
    alert("you are yawning!")
    countergame++;


    //conversation when yawn
    if (countergame == 2) {
      countergame=0;
      if (confirm("Let's have a chat~")) {
        earlimit = 0.0;
        limitlip = 500;
        leftlimit = 100;
        rightlimit = 100;
        document.getElementById("video").style.display="none"; 
        //video.removeEventListener('play',());
        //conversation pop up in increment2
        
        
        ok();
        document.querySelector(".popup").style.display="flex"; 
        document.querySelector(".popup-content").style.display="inline"; 
        


      } else {
        txt = "You pressed Cancel!";
      }
      
    }
    counter = 0;
  }
  // number.value = counter;
  
}

var counter2=0;
function increment2(){
  counter2++;
  console.log("Counter2: " +counter2);
  if(counter2 >= 5 ){
    console.log("inattentiveness detected")
    alert('you are not paying attention!');
    countergame++;

    //conversation when inattentiveness
    if (countergame == 2) {
      countergame=0;
      if (confirm("Let's have a chat~")) {
        earlimit = 0.0;
        limitlip = 500;
        leftlimit = 100;
        rightlimit = 100;
        //conversation pop up in increment2
        document.getElementById("video").style.display="none"; 
        ok();
        
        document.querySelector(".popup").style.display="flex"; 
        document.querySelector(".popup-content").style.display="inline"; 

      } else {
        txt = "You pressed Cancel!";
      }
      
    }
    counter2 = 0;
    
  }
  // number.value = counter2;
  
}

function closevid(){

}
//close eyes increment
var counter3=0;
function increment3(){
  counter3++;
  console.log("Counter3: " +counter3);
  if(counter3 >= 5 ){
    console.log("sleepy detected")
    alert("you are sleepy!")
    countergame++;

    //Game
    if (countergame == 2) {
      countergame=0;
      if (confirm("Do u wanna play a game?")) {
        earlimit = 0.0;
        limitlip = 500;
        leftlimit = 100;
        rightlimit = 100;
        document.getElementById("video").style.display="none";
        setTimeout(function(){
          document.getElementById("video").style.display="flex"; 
          earlimit = 0.27;
          limitlip=30;
          leftlimit=2.2; 
          rightlimit=0.78;
        },12000);
        
        
        window.open("https://lowyanruo.github.io/TowerGame/");

        

      } else {
        txt = "You pressed Cancel!";
      }
      
    }
    counter3 = 0;
  }
  // number.value = counter3;
  
}


var countergame=0;


const displaySize = { width: video.width, height: video.height }


video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {

    const useTinyModel = true;

    const resizedDetections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(useTinyModel)
    //const resizedDetections = faceapi.resizeResults(detections, displaySize)

    //STUDENT LOOK
    if(resizedDetections[0]){
      var look = false //if looking left or right then true
    const nosetip = resizedDetections[0].landmarks.positions[31]
    const lefteye = resizedDetections[0].landmarks.positions[37]
    const leftcheek = resizedDetections[0].landmarks.positions[2]
    const righteye = resizedDetections[0].landmarks.positions[46]
    const rightcheek = resizedDetections[0].landmarks.positions[16]
    const dist1 = Math.sqrt(Math.pow(leftcheek.x - rightcheek.x, 2) + Math.pow(leftcheek.y - rightcheek.y, 2))
    const dist2 = Math.sqrt(Math.pow(nosetip.x - rightcheek.x, 2) + Math.pow(nosetip.y - rightcheek.y, 2))
    const lookLeft1 = dist1 / dist2
    const lookRight1 = dist2 / dist1
    const dist3 = Math.sqrt(Math.pow(lefteye.x - rightcheek.x, 2) + Math.pow(lefteye.y - rightcheek.y, 2))
    const dist4 = Math.sqrt(Math.pow(righteye.x - rightcheek.x, 2) + Math.pow(righteye.y - rightcheek.y, 2))
    const lookLeft2 = dist3 / dist4
    const lookRight2 = dist4 / dist3

     if(lookLeft1>leftlimit ){
      look = true
      increment2();
      console.log(look)
      console.log("STUDENT IS LOOKING LEFT")
     }
		
	else if(lookRight1>rightlimit ){
    look = true
    increment2();
    console.log(look)
    console.log("STUDENT IS LOOKING RIGHT")
  }
    
    else{
      look = false
      counter2 = 0;
      console.log(look)
      console.log("STUDENT IS LOOKING STRAIGHT")
    }
  







    //DROWSINESS

    var eye_status = true //closed eye

    function calc_EAR(eye) {
      const A = Math.sqrt(Math.pow(eye[1][0] - eye[5][0], 2) + Math.pow(eye[1][1] - eye[5][1], 2))
      const B = Math.sqrt(Math.pow(eye[2][0] - eye[4][0], 2) + Math.pow(eye[2][1] - eye[4][1], 2))
      const C = Math.sqrt(Math.pow(eye[0][0] - eye[3][0], 2) + Math.pow(eye[0][1] - eye[3][1], 2))
      const ear_aspect_ratio = (A + B) / (2.0 * C)
      return ear_aspect_ratio
    }

    var Leye = []
    var Reye = []
    for (let i = 36; i < 42; i++) {
      var x1 = resizedDetections[0].landmarks.positions[i].x
      var y1 = resizedDetections[0].landmarks.positions[i].y
      var coord = [x1, y1]
      Leye.push(coord)
      var next_point = i + 1
      if (i == 41)
        next_point = 36
      var x2 = resizedDetections[0].landmarks.positions[next_point].x
      var y2 = resizedDetections[0].landmarks.positions[next_point].y

    }

    for (let j = 42; j < 48; j++) {
      var x3 = resizedDetections[0].landmarks.positions[j].x
      var y3 = resizedDetections[0].landmarks.positions[j].y
      var coord = [x3, y3]
      Reye.push(coord)
      var next_point = j + 1
      if (j == 47)
        next_point = 42
      var x4 = resizedDetections[0].landmarks.positions[next_point].x
      var y4 = resizedDetections[0].landmarks.positions[next_point].y
    }

    //console.log(Leye[1][1])
    //console.log(Reye)
    const Lear = calc_EAR(Leye)
    const Rear = calc_EAR(Reye)
    
    var EAR = (Lear + Rear) / 2
    EAR = Math.round((EAR + Number.EPSILON) * 100) / 100
      if(EAR<earlimit){
        eye_status = true
        console.log(eye_status)
        console.log("DROWSY")
        increment3();
      }
      
    else{
      eye_status = false
      console.log(eye_status)
      console.log("AlERT")
      counter3=0;
    }



     //MOUTH OPEN
    var open_status = false 

    function top_lip() {
      var top_lip_pts = []
      for (let l = 50; l < 53; l++) {
        var xtl = resizedDetections[0].landmarks.positions[l].x
        var ytl = resizedDetections[0].landmarks.positions[l].y
        var c = [xtl, ytl]
        top_lip_pts.push(c)
      }
      for (let l = 61; l < 64; l++) {
        var xtl = resizedDetections[0].landmarks.positions[l].x
        var ytl = resizedDetections[0].landmarks.positions[l].y
        var c = [xtl, ytl]
        top_lip_pts.push(c)
      }
      var l = top_lip_pts.length
      var xmean = 0
      var ymean = 0
      for (let i = 0; i < l; i++) {
        xmean += top_lip_pts[i][0]
        ymean += top_lip_pts[i][1]
      }
      xmean = xmean / l;
      ymean = ymean / l;
      var final = (xmean, ymean)
      return final
    }
    function bottom_lip() {
      var bottom_lip_pts = []
      for (let l = 65; l < 68; l++) {
        var xtl = resizedDetections[0].landmarks.positions[l].x
        var ytl = resizedDetections[0].landmarks.positions[l].y
        var c = [xtl, ytl]
        bottom_lip_pts.push(c)
      }
      for (let l = 56; l < 59; l++) {
        var xtl = resizedDetections[0].landmarks.positions[l].x
        var ytl = resizedDetections[0].landmarks.positions[l].y
        var c = [xtl, ytl]
        bottom_lip_pts.push(c)
      }
      var l = bottom_lip_pts.length
      var xmean = 0
      var ymean = 0
      for (let i = 0; i < l; i++) {
        xmean += bottom_lip_pts[i][0]
        ymean += bottom_lip_pts[i][1]
      }
      xmean = xmean / l
      ymean = ymean / l
      var final = (xmean, ymean)
      return final
    }

    function mouth_open() {
      var top_lip_center = top_lip()
      var bottom_lip_center = bottom_lip()
      var lip_distance = Math.abs(top_lip_center - bottom_lip_center)
      return lip_distance
    }

    var lip_distance = mouth_open();
    










    if(lip_distance > limitlip){
      open_status = true;
      //yawnStatus = true;
      console.log("Mouth open");
      increment();
      
      // openedMouthStartTime = Date.now();
      
    }else{
      open_status = false
      // yawnStatus = false
      close = console.log("Mouth close")
      counter = 0;
      //close = parseInt(console.log(closedMouthStartTime = Date.now()));
    }
    







    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.beginPath();
    // ctx.rect(nosetip.x,nosetip.y,50,50);
    // ctx.stroke();
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }

    else {
      console.log("no face found")
      counter = 0;
      counter2 = 0;
    }
      
    
  }, 1000)
})



function ok() {


  //cancel = true;
  
  document.querySelector(".popup").style.display="flex"; 
            
        document.getElementById("nextbtn").addEventListener("click",function(){
            document.querySelector(".popup-content").style.display="none"; 
            document.querySelector(".popup2-content").style.display="inline"; 
            
        })
        
        document.querySelector(".close").addEventListener("click",function(){
            document.querySelector(".popup").style.display="none";
            

        })

        document.querySelector(".close2").addEventListener("click",function(){
            document.querySelector(".popup").style.display="none";
            document.querySelector(".popup2-content").style.display="none";  
        })

        document.getElementById("sbtbtn").addEventListener("click",function(){
            document.querySelector(".popup").style.display="none";
            document.querySelector(".popup2-content").style.display="none";
            document.getElementById("video").style.display="flex";  
            earlimit = 0.27;
            limitlip=30;
            leftlimit=2.2; 
            rightlimit=0.78; 
        })
}