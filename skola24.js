/* global $ */
if (window.location.href.includes("skola24")) {
  $(".w-page-header").remove();
  $(".scheduleselection")
    .children()
    .eq(0).append(`<div class="selectordiv w-col w-s6 w-m3 w-l2">
                                <a href="http://skolmaten.se/berzeliusskolan/" class="w-button w-block">
                                    Skolmaten &#127860;
                                </a>
                            </div>`);
  $(".scheduleselection")
    .children()
    .eq(0).append(`<div class="selectordiv w-col w-s2 w-m1 w-l1">
                                <button class="w-button w-block" id="previousWeek">
                                    <
                                </button>
                            </div>`);
  $(".scheduleselection")
    .children()
    .eq(0).append(`<div class="selectordiv w-col w-s2 w-m1 w-l1">
                                <button class="w-button w-block" id="nextWeek">
                                    >
                                </button>
                            </div>`);

  let savedClass = window.location.pathname.split("/")[
    window.location.pathname.split("/").length - 2
  ];
  document.getElementById(
    "signatures"
  ).outerHTML = `<input id="signatures" autocomplete="off" type="text" data-role="textbox" data-bind="enabled: timetableSelectionEnabled" value="${savedClass}" placeholder="Ange ID" class="w-input w-block">`;
  chrome.storage.sync.get(
    {
      darkMode: false
    },
    function(items) {
      if (items.darkMode) {
        const css = `
    #schemaContent {
     filter: invert(90%); 
     outline: 1px solid black;
    }
    .w-panel{
      background-color:rgb(29, 30, 33);
      color:white;
      outline: 1px solid white;
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

  document.addEventListener("keydown", function(event) {
    if (!$("#signatures").is(":focus")) {
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

  $("#previousWeek").click(function(event) {
    previousWeek();
  });
  $("#nextWeek").click(function(event) {
    nextWeek();
  });

  function nextWeek() {
    let currentWeek = parseInt($("#selectedWeekDropDown").val());
    if (currentWeek === 52) {
      currentWeek = 0;
    }
    document.getElementsByClassName(
      "k-list"
    )[0].parentElement.style.opacity = 0;
    document.getElementsByClassName(
      "k-list"
    )[1].parentElement.style.opacity = 0;
    $("#selectedWeekDropDown")
      .val(currentWeek + 1)
      .trigger("change");
    $(".weekcontainer")
      .children()
      .children()
      .click();
    setTimeout(() => {
      $(".schoolcontainer")
        .children()
        .children()
        .click();
      setTimeout(() => {
        $(".weekcontainer")
          .children()
          .children()
          .click();
        setTimeout(() => {
          document.getElementsByClassName(
            "k-list"
          )[0].parentElement.style.opacity = 100;
          document.getElementsByClassName(
            "k-list"
          )[1].parentElement.style.opacity = 100;
        }, 100);
      }, 1);
    }, 1);
    $(".k-input:eq(1)").text("Vecka " + parseInt(currentWeek + 1));
  }

  function previousWeek() {
    let currentWeek = parseInt($("#selectedWeekDropDown").val());
    if (currentWeek === 1) {
      currentWeek = 53;
    }
    document.getElementsByClassName(
      "k-list"
    )[0].parentElement.style.opacity = 0;
    document.getElementsByClassName(
      "k-list"
    )[1].parentElement.style.opacity = 0;
    $("#selectedWeekDropDown")
      .val(currentWeek - 1)
      .trigger("change");
    $(".weekcontainer")
      .children()
      .children()
      .click();
    setTimeout(() => {
      $(".schoolcontainer")
        .children()
        .children()
        .click();
      setTimeout(() => {
        $(".weekcontainer")
          .children()
          .children()
          .click();
        setTimeout(() => {
          document.getElementsByClassName(
            "k-list"
          )[0].parentElement.style.opacity = 100;
          document.getElementsByClassName(
            "k-list"
          )[1].parentElement.style.opacity = 100;
        }, 100);
      }, 1);
    }, 1);
    $(".k-input:eq(1)").text("Vecka " + parseInt(currentWeek - 1));
  }
}
