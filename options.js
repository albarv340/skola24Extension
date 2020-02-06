// Saves options to chrome.storage
function save_options() {
  let savedClass = document.getElementById("inputClass").value;
  chrome.storage.sync.set(
    {
      savedClass: savedClass
    },
    function() {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

function save_dark_mode(mode) {
  chrome.storage.sync.set(
    {
      darkMode: mode
    },
    function() {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

$("#nightModeToggle").mouseup(e => {
  if ($("body").css("background-color") === "rgb(0, 0, 0)") {
    $("body").css("background-color", "rgb(245, 245, 245)");
    $("body").css("color", "black");
    save_dark_mode(false);
  } else {
    $("body").css("background-color", "black");
    $("body").css("color", "rgb(245, 245, 245)");
    save_dark_mode(true);
  }
});
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      darkMode: false
    },
    function(items) {
      if (items.darkMode) {
        $("#nightModeCheckbox").attr("checked", "");
        $("body").css("background-color", "black");
        $("body").css("color", "rgb(245, 245, 245)");
      }
    }
  );
  chrome.storage.sync.get(
    {
      savedClass: "TE17E"
    },
    function(items) {
      document.getElementById("inputClass").value = items.savedClass;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
