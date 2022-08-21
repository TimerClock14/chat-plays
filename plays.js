var keysNDS = ["a", "b", "left", "right", "up", "down", "x", "y", "select"];

(function (d, script) {
  script = d.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.onload = function () {
    // remote script has loaded
    // var socket = io.connect('http://localhost:8000');

    // create an observer instance
    new MutationObserver((mutations) => {
      //   console.log("madeit", mutations);
      document.append(`<div>${JSON.stringify(mutations)}</div>`);

      //   var lastChatMessage = mutations[0].target.lastChild;
      //   const input = lastChatMessage.children[1].children[2].textContent.trim();

      //   //get rid of new line/spaces, remove name
      //   var key = input.toLowerCase().trim();

      //   if (key === "u") {
      //     key = "up";
      //   } else if (key === "d") {
      //     key = "down";
      //   } else if (key === "l") {
      //     key = "left";
      //   } else if (key === "r") {
      //     key = "right";
      //   }

      //   //trivial way
      //   // socket.emit('i', { i: key });
      //   console.log("emitted", key);
    }).observe(document.getElementById("#items"), {
      subtree: true,
      childList: true,
    });
  };
  //   script.src = "http://localhost:8000/socket.io/socket.io.js";
  d.getElementsByTagName("head")[0].appendChild(script);
})(document);
