document.addEventListener("DOMContentLoaded", function () {
  var fetchButton = document.getElementById("fetch-titles");
  var sessionName = document.getElementById("session-name");
  var sessionDescription = document.getElementById("session-description");

  fetchButton.addEventListener("click", function () {
    var sessionNameText = sessionName.value !== "" ? sessionName.value : "Session Name";
    fetchButton.disabled = true;

    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      var tabLinkTitle = tabs.map(function (tab) {
        return (tab.title ? "*** [[" + tab.url + "][" + tab.title + "]]" : "*** [[" + tab.url + "]]");
      });
      
      let sessionInfo = sessionDescription.value !== "" ? `${sessionNameText}\n${getFormattedDateTime()}\n${sessionDescription.value}\n` : `${sessionNameText}\n${getFormattedDateTime()}\n`
      var sessionText = sessionInfo + tabLinkTitle.join("\n");

      navigator.clipboard.writeText(sessionText)
        .then(function () {
          console.log("Session Text copied to clipboard.");
          console.log(sessionText)
          fetchButton.textContent = "Copied";
          setTimeout(function () {
            window.close();
          }, 1000);
        })
        .catch(function (error) {
          console.error("Failed to copy session to clipboard:", error);
          fetchButton.disabled = false;
        });
    });
  });
});

function getFormattedDateTime() {
  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var day = String(currentDate.getDate()).padStart(2, "0");
  var dayOfWeek = daysOfWeek[currentDate.getDay()];

  var hours = String(currentDate.getHours()).padStart(2, "0");
  var minutes = String(currentDate.getMinutes()).padStart(2, "0");

  var formattedDate = "[" + year + "-" + month + "-" + day + " " + dayOfWeek + " " + hours + ":" + minutes + "]";
  return formattedDate;
}
