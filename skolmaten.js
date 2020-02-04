if (window.location.href.includes("skolmaten.se")) {
  let schemaUrl;
  chrome.storage.sync.get(
    {
      savedClass: "TE17E"
    },
    function(items) {
      let selectedClass = items.savedClass;
      schemaUrl =
        "https://web.skola24.se/timetable/timetable-viewer/linkoping.skola24.se/Berzeliusskolan%20gymnasium/signatures/" +
        selectedClass +
        "/";
    }
  );
  $("header").remove();
  $("footer").remove();
  $(".back").text("Schema");
  $("#bulletins").remove();
  $(".links").remove();
  let date = new Date().getDay();
  if (date === 0 || date === 6) {
    window.location.href = "javascript:$viewer.fetchNextWeek();";
    let x = document.getElementsByClassName("row");
    let mondayExists = setInterval(() => {
      if (x[5]) {
        x[5].style =
          "background-color:aliceblue; padding:10px; outline: 2px solid lightblue";
        clearInterval(mondayExists);
      }
    }, 10);
  } else {
    let day = date % 6;
    if (day > 0) day--;
    let x = document.getElementsByClassName("row");
    x[day].style =
      "background-color:aliceblue; padding:10px; outline: 2px solid lightblue";
  }
  $(window).ready(function() {
    $(".back").attr("href", schemaUrl);
    $(document).keydown(function(e) {
      if (e.key === "a" || e.key === "ArrowLeft") {
        window.location.href = "javascript:$viewer.fetchPreviousWeek();";
      } else if (e.key === "d" || e.key === "ArrowRight") {
        window.location.href = "javascript:$viewer.fetchNextWeek();";
      } else if (e.key === "s") {
        window.location.href = schemaUrl;
      } else if (e.key === "S") {
        window.close();
      }
    });
  });
}
