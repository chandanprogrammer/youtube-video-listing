const videosList = document.getElementById("videos-section");
const searchInput = document.getElementById("search-input");
const search = document.getElementById("search");

let filteredData = [];
let videosData = null;

// API endpoint
const url =
  "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=100";

// youtube channel logo url
const youtubeLogo =
  "https://yt3.googleusercontent.com/arHIKjc6JTqF_b4QJKPHhQC_Jr8q0XfI7LEpJ0-VuiI0ZRz9xFNz94TWl4CLOcozLx-iAhV_=s160-c-k-c0x00ffffff-no-rj";

// addEventListener for video filteration
searchInput.addEventListener("input", () => {
  filteredVideos(videosData);
});

// function: get video json data from server
async function getVideosData() {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    videosData = responseData.data.data;
    displayVideos(videosData);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// function: video display on screen
function displayVideos(videosData) {
  videosData.forEach((item) => {
    const divElement = document.createElement("div");
    divElement.classList.add("video-card");

    // calculate, video published from current date
    const now = new Date();
    let currentDate = now.toLocaleDateString().split("/");
    let publishedDate = item.items.snippet.publishedAt.split("T")[0].split("-");
    let textDate = null;

    if (Number(currentDate[2]) - Number(publishedDate[0]) > 0) {
      textDate = `${
        Number(currentDate[2]) - Number(publishedDate[0])
      } years ago`;
    } else if (Number(currentDate[0]) - Number(publishedDate[1]) > 0) {
      textDate = `${
        Number(currentDate[0]) - Number(publishedDate[1])
      } months ago`;
    }

    divElement.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${item.items.id}&ab_channel=HiteshChoudhary" target="_blank">
          <img src="${item.items.snippet.thumbnails.maxres.url}" alt="Videos">
          <div class="channel-text">
              <div class="channel-logo"><img src="${youtubeLogo}" alt=""></div>
              <div>
                  <p class="channel-title">${item.items.snippet.title}</p>
                  <p class="channel-name">${item.items.snippet.channelTitle}</p>
                  <p class="channel-views-date">${item.items.statistics.viewCount} views . ${textDate}</p>
              </div>
          </div>
          </a>
        `;
    videosList.appendChild(divElement);
  });
}

// function: video filteration according to input value
function filteredVideos(videosData) {
  const takeText = searchInput.value.toLowerCase();
  filteredData = videosData.filter((item) => {
    let title = item.items.snippet.title.toLowerCase();

    if (title.includes(takeText)) {
      return item;
    }
  });
  videosList.innerHTML = "";
  displayVideos(filteredData);
}

getVideosData();
