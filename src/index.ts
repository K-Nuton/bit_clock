import "./index.css";

const clock1 = document.getElementById("clock-1");
const clock1_detail = document.getElementById("clock-1-detail");

const clock2 = document.getElementById("clock-2");
const clock2_detail = document.getElementById("clock-2-detail");

(function tick() {
  setTimeout(tick, 1000);
  const time = new Date();

  clock1_detail.innerText = `current: ${getTimeStr(time)}`;
  clock2_detail.innerText = `elapsed seconds: ${getElapseSeconds(time)}`;

  mark(clock1.children, getClockBitArr(time));
  mark(clock2.children, getElapseBitArr(time));
})();

function mark(children: HTMLCollection, bitArr: (0 | 1)[]) {
  if (children.length !== bitArr.length) {
    throw new Error(
      `length is differ: children.length: ${children.length}, bitArr.length: ${bitArr.length}`
    );
  }

  for (let i = 0, len = children.length; i < len; i++) {
    const on = children[i].classList.contains("on");
    if ((bitArr[i] && on) || (!bitArr[i] && !on)) {
      continue;
    }

    children[i].classList.toggle("on");
  }
}

function p2(n: number): string {
  return n.toString().padStart(2, "0");
}

function bp(pad: number, num: number): (0 | 1)[] {
  return num
    .toString(2)
    .padStart(pad, "0")
    .split("")
    .map((s) => (s === "0" ? 0 : 1));
}

function getClockBitArr(date: Date): (0 | 1)[] {
  return [
    ...bp(5, date.getHours()),
    ...bp(6, date.getMinutes()),
    ...bp(6, date.getSeconds()),
  ];
}

function getElapseBitArr(date: Date): (0 | 1)[] {
  return bp(17, getElapseSeconds(date));
}

function getElapseSeconds(date: Date): number {
  return date.getHours() * 60 ** 2 + date.getMinutes() * 60 + date.getSeconds();
}

function getTimeStr(date: Date): string {
  return `${p2(date.getHours())}:${p2(date.getMinutes())}:${p2(
    date.getSeconds()
  )}`;
}
