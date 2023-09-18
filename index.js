var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const timePickers = document.querySelectorAll(".timepicker--panel p");
const timesContainer = document.querySelector(".times--container");
let hoursContainers = document.querySelectorAll(".hours--container");
let timeChoice = (_b = (_a = Array.from(timePickers).find(time => time.classList.contains("active"))) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
const changeTime = (hoursContainers, jsonData) => {
    timePickers.forEach(time => {
        time.addEventListener("click", () => {
            var _a, _b;
            timePickers.forEach(time => {
                time.classList.remove("active");
            });
            time.classList.add("active");
            timeChoice = (_b = (_a = Array.from(timePickers).find(time => time.classList.contains("active"))) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();
            jsonData.forEach((object, index) => {
                let hoursContainer = hoursContainers[index];
                const { timeframes } = object;
                if (timeChoice === "daily" || timeChoice === "weekly" || timeChoice === "monthly") {
                    const { current, previous } = timeframes[timeChoice];
                    hoursContainer.innerHTML = `
                    <h1>${current}hrs</h1>
                    <p>Last Week - ${previous}hrs</p>`;
                }
            });
        });
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("/data.json");
    const jsonData = yield response.json();
    return jsonData;
});
const createContainers = (object) => {
    const { title, timeframes, color, path } = object;
    const { current, previous } = timeframes.weekly;
    const div = document.createElement("div");
    div.classList.add("time--container");
    div.style.backgroundColor = `${color}`;
    div.innerHTML = `
        <div class="image--container">
            <img src=${path} alt="picture">
        </div>
          <div class="time--info dark">
            <div class="activity--panel">
              <h2>${title}</h2>
              <svg class="ellipsis" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </div>
            <div class="hours--container">
              <h1>${current}hrs</h1>
              <p>Last Week - ${previous}hrs</p>
            </div>
          </div>
    `;
    timesContainer === null || timesContainer === void 0 ? void 0 : timesContainer.append(div);
};
const handleData = () => __awaiter(void 0, void 0, void 0, function* () {
    const jsonData = yield fetchData();
    jsonData.forEach((object) => createContainers(object));
    hoursContainers = document.querySelectorAll(".hours--container");
    changeTime(hoursContainers, jsonData);
});
fetchData();
handleData();
export {};
