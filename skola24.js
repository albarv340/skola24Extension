/* global $ */
if (window.location.href.includes("skola24")) {
  $(".w-page-header").remove();
  $(".w-panel-content").children().eq(0).append(
    `<div class="w-col w-s6 w-m3 w-l2">
      <div style="width: 100%;">
      <label for="bd13cbe1f8feb66258859320dbfac1b6" class="">
      <span>Skolmaten</span> <!---->
      </label> <div class="w-flex">
      <a href="http://skolmaten.se/berzeliusskolan/" class="w-button w-block">
                                    Skolmaten &#127860;
                                </a></div></div></div>`
  );
  $(".w-panel-content").children().eq(0).append(
    `<div class="w-col w-s6 w-m3 w-l2">
      <div style="width: 100%;">
      <label for="bd13cbe1f8feb66258859320dbfac1b6" class="">
      <span>Vecka</span> <!---->
      </label> <div class="w-flex">
                                <button class="w-button w-block" style="margin-right:10px" id="previousWeek">
                                    <
                                </button>
                                <button class="w-button w-block" id="nextWeek">
                                    >
                                </button>
                            </div></div></div>`
  );

  let savedClass = window.location.pathname.split("/")[
    window.location.pathname.split("/").length - 2
  ];
  // document.getElementById(
  //   "signatures"
  // ).outerHTML = `<input id="signatures" autocomplete="off" type="text" data-role="textbox" data-bind="enabled: timetableSelectionEnabled" value="${savedClass}" placeholder="Ange ID" class="w-input w-block">`;
  chrome.storage.sync.get(
    {
      darkMode: false,
    },
    function (items) {
      if (items.darkMode) {
        const css = `
    .w-timetable {
     filter: invert(90%); 
     outline: 1px solid black;
    }
    .w-panel{
      background-color:rgb(29, 30, 33);
      color:white;
      outline: 1px solid white;
    }
    .w-block{
      background-color:black;
    }
    .w-icon{
      color: white;
    }
    input{
      filter: invert(98%); 
      color:black;
    }
    .k-widget{
      filter: invert(100%); 
    }
    .w-button{
      background-color:white;
      filter: invert(98%); 
    }
    body{
      background-color:rgb(32, 33, 36);
    }
    li{
      background-color:black;
      color:white;
    }
    #timetablePlaceholder{
      filter: invert(90%); 
    }
    `,
          head = document.head || document.getElementsByTagName("head")[0],
          style = document.createElement("style");
        head.appendChild(style);
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
      }
    }
  );
  // $("body")
  //   .children()
  //   .append(
  //     `<iframe src="https://berzan.tk/skolmaten" width="100%" height="1200px"></iframe>`
  // );

  // $(window).bind("load", function() {
  //   setTimeout(() => {
  //     $("*").css("background-color", "lightgray");
  //     $("*").css("color", "black");
  //     $("rect").attr("fill", "lightgray");
  //   }, 1000);
  // });
  // $(document).click(e => {
  //   console.log(e);
  // });

  document.addEventListener("keyup", function (event) {
    if (!$("input").is(":focus")) {
      if (event.key == "d" || event.key == "ArrowRight") {
        nextWeek();
      } else if (event.key == "a" || event.key == "ArrowLeft") {
        previousWeek();
      } else if (event.key == "s") {
        window.location.href = "http://www.skolmaten.se/berzeliusskolan";
      } else if (event.key == "S") {
        window.open("http://www.skolmaten.se/berzeliusskolan");
      } else if (event.code == "Space") {
        location.reload();
      }
    }
  });

  $("#previousWeek").click(function (event) {
    previousWeek();
  });
  $("#nextWeek").click(function (event) {
    nextWeek();
  });

  function nextWeek() {
    let currentWeek = parseInt(
      $(`[data-identifier="weekSelection"]`).children().eq(2).val()
    );
    currentWeek++;
    let child;
    if (currentWeek <= 26) {
      child = 26 + currentWeek;
    } else {
      child = child = currentWeek - 26;
    }
    document
      .querySelector(
        `body > div:nth-child(3) > div > div > div.w-panel > div.w-panel-content > div:nth-child(1) > div:nth-child(2) > div > div > ul > li:nth-child(${child}) > a`
      )
      .click();
  }

  function previousWeek() {
    let currentWeek = parseInt(
      $(`[data-identifier="weekSelection"]`).children().eq(2).val()
    );
    currentWeek--;
    let child;
    if (currentWeek <= 26) {
      child = 26 + currentWeek;
    } else {
      child = child = currentWeek - 26;
    }
    document
      .querySelector(
        `body > div:nth-child(3) > div > div > div.w-panel > div.w-panel-content > div:nth-child(1) > div:nth-child(2) > div > div > ul > li:nth-child(${child}) > a`
      )
      .click();
  }
}
