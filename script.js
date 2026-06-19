const gregorianEl = document.getElementById("gregorianDate");
const hijriEl = document.getElementById("hijriDate");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayKey = `${year}-${month}-${day}`;

gregorianEl.textContent = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

fetch("dates.json")
  .then(response => response.json())
  .then(data => {
    const todayHijri = data.find(item => item.gregorian === todayKey);

    if (todayHijri) {
      hijriEl.textContent = todayHijri.hijri;
    } else {
      hijriEl.textContent = "Hijri date not found";
    }
  })
  .catch(error => {
    hijriEl.textContent = "Could not load Hijri date";
    console.error(error);
  });