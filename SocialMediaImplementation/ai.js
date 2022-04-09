const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const feed = document.getElementById("feed");
let x, y;
let px, py;

px = py = 0;

// Image of cursor
let cursor = document.getElementById("cursor");

let mutex = false;

const moveMouse = function (point) {
  cursor.style.left = (1 - point.x) * innerWidth + "px";
  cursor.style.top = point.y * innerHeight + "px";
};

const post = `
<div
id="post1"
class="flex border-b hover:bg-gray-100 duration-200 cursor-pointer pt-2 pl-3"
>
<div class="flex-shrink-0 my-1">
  <div id="picture" class="rounded-full">
    <div
      class="rounded-full hover:opacity-80 duration-200 overflow-hidden"
    >
      <img
        class="w-12 h-12"
        src="https://placekitten.com/320/320"
      />
    </div>
  </div>
</div>
<div class="flex-col my-1 mx-3">
  <div id="title" class="flex items-center justify-between">
    <div id="details" class="flex flex-shrink-0 space-x-1">
      <div class="text-black font-bold hover:underline">
        Lewis Lloyd
      </div>
      <div class="text-gray-500">@LloydTao</div>
      <div class="text-gray-500">·</div>
      <div class="text-gray-500 hover:underline">37s</div>
    </div>
    <div id="options">
      <div
        class="w-7 text-gray-400 hover:text-blue-400 hover:bg-blue-100 duration-200 rounded-full p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </div>
    </div>
  </div>
  <div id="body" class="pr-2">
    <div id="text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <div
      id="media"
      class="hover:bg-gray-200 duration-200 rounded-2xl border border-gray-300 cursor-pointer overflow-hidden mt-2"
    >
      <div
        id="image"
        style="
          padding-top: 56.25%;
          position: relative;
          background-image: url('https://placekitten.com/1280/400');
          background-size: cover;
          background-repeat: no-repeat;
        "
      ></div>
      <div id="body" class="px-3 py-2">
        <div id="title" class="flex-col">
          <div>Cats: The Mystery of the Universe</div>
          <div class="text-gray-500 hidden sm:block">
            Recently, I approached our cat once again meowing at our
            back door.
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div class="text-gray-500 px-1">blog.lloyd.cx</div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="buttons"
      class="flex justify-between items-center mt-1"
    >
      <div class="w-full">
        <div
          class="w-9 text-gray-400 hover:text-blue-400 hover:bg-blue-100 duration-200 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </div>
      </div>
      <div class="w-full">
        <div
          class="w-9 text-gray-400 hover:text-green-400 hover:bg-green-100 duration-200 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
      </div>
      <div class="w-full">
        <div
          class="w-9 text-gray-400 hover:text-red-400 hover:bg-red-100 duration-200 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height = "25"
            stroke="currentColor"
            class="like"
            id="like3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div class="w-full">
        <div
          class="w-9 text-gray-400 hover:text-blue-400 hover:bg-blue-100 duration-200 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    `;

feed.insertAdjacentHTML("afterbegin", post);
feed.insertAdjacentHTML("afterbegin", post);
feed.insertAdjacentHTML("afterbegin", post);
feed.insertAdjacentHTML("afterbegin", post);
feed.insertAdjacentHTML("afterbegin", post);

let cDistance = 0;
let pDistance = 0;

const getGesture = function (points) {
  if (
    points[8].y < points[7].y &&
    points[12].y > points[9].y &&
    points[16].y > points[13].y &&
    points[20].y > points[17].y &&
    points[4].y < points[3].y
  ) {
    return "pointing_up";
  } else if (
    Math.hypot(
      (points[8].x - points[4].x) * window.innerWidth,
      (points[8].y - points[4].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_index_pinch";
  } else if (
    Math.hypot(
      (points[12].x - points[4].x) * window.innerWidth,
      (points[12].y - points[4].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_middle_pinch";
  } else if (
    Math.hypot(
      (points[16].x - points[4].x) * window.innerWidth,
      (points[16].y - points[4].y) * window.innerHeight
    ) < 50
  ) {
    return "thumb_ring_pinch";
  }
};

const like = function (point) {
  let element = document.getElementById("cursor");

  x = element.getBoundingClientRect().x;
  y = element.getBoundingClientRect().y;
  let elementM = document.elementFromPoint(x, y);

  if (elementM.classList.contains("like")) {
    if (!elementM.classList.contains("red")) {
      elementM.classList.add("red");
    }
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

      if (getGesture(landmarks) == "pointing_up") {
        moveMouse(landmarks[8]);
      } else if (getGesture(landmarks) == "thumb_index_pinch") {
        cDistance =
          ((landmarks[8].y + landmarks[4].y) / 2) * window.innerHeight;
        window.scrollBy(0, (cDistance - pDistance) * -3);
        pDistance = cDistance;
      } else if (getGesture(landmarks) == "thumb_ring_pinch") {
        like();
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
