const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const feed = document.getElementById("feed");
//Test comment

let messageContent = document.querySelector(".text-input");
const send = document.querySelector(".send");
let box = document.querySelector(".messagebox");
let d = new Date();
let Ctime = 0;
let Ptime = 0;

const sendMessage = function () {
  Ptime = d.getTime() + 5000;
  let content = messageContent.value;

  if (content != "") {
    let msg = `<div class="chat-message">
<div class="flex items-end justify-end">
  <div
    class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
  >
    <div>
      <span
        class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
        >${content}</span
      >
    </div>
  </div>
  <img
    src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
    alt="My profile"
    class="w-6 h-6 rounded-full order-2"
  />
</div>`;
    box.insertAdjacentHTML("beforeend", msg);
    messageContent.value = "";
    console.log();
  }
};

const writeMessage = function (gesture) {
  messageContent.value = gesture;
};

send.addEventListener("click", sendMessage);

const getSign = function (points) {
  if (
    points[4].y < points[3].y &&
    points[8].y < points[7].y &&
    points[12].y < points[11].y &&
    points[16].y < points[15].y &&
    points[20].y < points[19].y &&
    points[20].x < points[16].x &&
    points[16].x < points[12].x &&
    points[12].x < points[8].x &&
    points[8].x < points[4].x
  ) {
    console.log("Sign for Hello");
    return "Hello";
  } else if (
    points[20].y < points[19].y &&
    points[16].y > points[14].y &&
    points[12].y > points[10].y &&
    points[8].y < points[7].y &&
    points[4].y < points[3].y
  ) {
    console.log("Sign for I Love You");
    return "I love you";
  } else if (
    points[6].y < points[7].y &&
    points[10].y < points[11].y &&
    points[14].y < points[15].y &&
    points[18].y < points[19].y &&
    points[4].y > points[11].y &&
    points[4].y > points[15].y &&
    points[4].x < points[8].x &&
    points[4].y > points[16].y
  ) {
    console.log("Sign for Yes");
    return "Yes";
  } else if (
    Math.hypot(points[4].x - points[8].x, points[4].y - points[8].y) < 0.1 &&
    Math.hypot(points[4].x - points[12].x, points[4].y - points[12].y) < 0.1 &&
    points[20].y > points[19].y &&
    points[16].y > points[15].y &&
    points[4].y < points[16].y
  ) {
    console.log("Sign for No");
    return "No";
  } else {
    return "";
  }
};

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 3,
      });
      drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });

      d = new Date();
      Ctime = d.getTime();
      if (Ptime - Ctime < 0) {
        sendMessage(writeMessage(getSign(landmarks)));
      }
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 300,
  height: 200,
});
camera.start();

//scrolling stuff
window.scroll({
  top: 100,
  left: 100,
  behavior: "smooth",
});
