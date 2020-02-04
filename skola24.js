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
