chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      let tab = tabs[0];
      let url = tab.url;
      chrome.storage.sync.get(
        {
          savedClass: "TE17E"
        },
        function(items) {
          let selectedClass = items.savedClass;
          if (!url.includes("//newtab/")) {
            chrome.tabs.create({
              url:
                "https://web.skola24.se/timetable/timetable-viewer/linkoping.skola24.se/Berzeliusskolan%20gymnasium/signatures/" +
                selectedClass +
                "/"
            });
          } else {
            chrome.tabs.update({
              url:
                "https://web.skola24.se/timetable/timetable-viewer/linkoping.skola24.se/Berzeliusskolan%20gymnasium/signatures/" +
                selectedClass +
                "/"
            });
          }
        }
      );
    }
  );
  // chrome.tabs.query(
  //   {
  //     url: "https://web.skola24.se/*"
  //   },
  //   tabs => {
  //     console.log(tabs);
  //   }
  // );
});
