const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const note = document.getElementById("state");
const canvasCtx = canvasElement.getContext("2d");

let cDistance = 0;
let pDistance = 0;

const getGesture = function (points) {
  if (
    Math.hypot(
      (points[8].x - points[4].x) * window.innerWidth,
      (points[8].y - points[4].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_index_pinch";
  }

  if (
    Math.hypot(
      (points[8].x - points[12].x) * window.innerWidth,
      (points[8].y - points[12].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_middle_pinch";
  }

  if (
    Math.hypot(
      (points[8].x - points[16].x) * window.innerWidth,
      (points[8].y - points[16].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_ring_pinch";
  }

  if (
    Math.hypot(
      (points[8].x - points[16].x) * window.innerWidth,
      (points[8].y - points[16].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_index_pinch";
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
    let count = 0;
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 3,
      });
      drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });

      if (landmarks[8].y < landmarks[7].y) {
        note.textContent =
          "X: " +
          (landmarks[8].x * window.innerWidth).toString() +
          "\nY: " +
          (landmarks[8].y * window.innerHeight).toString();
      }
      if (landmarks[8].y > landmarks[7].y) {
        note.textContent = "index finger down";
      }

      if (getGesture(landmarks) == "thumb_index_pinch") {
        cDistance =
          ((landmarks[8].y + landmarks[4].y) / 2) * window.innerHeight;
        console.log("pDistance: " + pDistance);
        console.log("cDistance " + cDistance);
        console.log(cDistance - pDistance);
        window.scrollBy(0, (cDistance - pDistance) * -3);
        pDistance = cDistance;
        console.log(count);
      } else {
        pDistance =
          ((landmarks[8].y + landmarks[4].y) / 2) * window.innerHeight;
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
