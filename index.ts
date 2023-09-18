const timePickers = document.querySelectorAll(".timepicker--panel p");
const timesContainer = document.querySelector(".times--container");
let hoursContainers = document.querySelectorAll(".hours--container");

import data from "./data.json"

type TimeFrameData = {
    current: number;
    previous: number;
};

type TimeFrame = {
    daily: TimeFrameData;
    weekly: TimeFrameData;
    monthly: TimeFrameData;
};

type ActivityData = {
    title: string;
    timeframes: TimeFrame;
    color: string;
    path: string;
};
type TimeChoiceType = keyof TimeFrame;

let timeChoice: string | undefined = Array.from(timePickers).find(time => time.classList.contains("active"))?.textContent?.toLowerCase();


const changeTime = (hoursContainers: NodeListOf<Element>, jsonData: ActivityData[]): void => {
    timePickers.forEach(time => {
        time.addEventListener("click", () => {
            timePickers.forEach(time => {
                time.classList.remove("active")
            })
            time.classList.add("active")
            timeChoice = Array.from(timePickers).find(time => time.classList.contains("active"))?.textContent?.toLocaleLowerCase();
            jsonData.forEach((object, index) => {
                let hoursContainer = hoursContainers[index];
                const {timeframes} = object;
                if(timeChoice === "daily" || timeChoice === "weekly" || timeChoice === "monthly") {
                    const {current, previous} = timeframes[timeChoice];
                    hoursContainer.innerHTML = `
                    <h1>${current}hrs</h1>
                    <p>Last Week - ${previous}hrs</p>`
                }
            })
        });
    });
};

const fetchData = async (): Promise<ActivityData[]> => {
    const response = await fetch("/data.json")
    const jsonData: ActivityData[] = await response.json();
    return jsonData;
};

const createContainers = (object: ActivityData): void => {
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
    `
    timesContainer?.append(div)
};

const handleData = async (): Promise<void> => {
    const jsonData = await fetchData();
    jsonData.forEach((object) => createContainers(object))
    hoursContainers = document.querySelectorAll(".hours--container");
    changeTime(hoursContainers, jsonData);
};


fetchData(); 
handleData();

