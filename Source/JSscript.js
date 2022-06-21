const caller = document.getElementById("jsproxyfunnel");
const cfig = JSON.parse(caller.dataset.cfig);

const configData = JSON.stringify(cfig);

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

const config = objToStrMap(JSON.parse(configData));
const appendFront = config.get("Fappend")
const append = config.get("append")
const localQ = config.get("localize")
const callback = function(mutationList, observer) {

  for (var mutation of mutationList) {
    if (mutation.type === 'childList') {
      var added = mutation.addedNodes
      for (var node of added) {
        if (node.src != undefined) {
          var newSRC = node.src
          if (localQ == true) {
            newSRC = newSRC.replace("https://", "s§@")
            newSRC = newSRC.replace("http://", "h§@")
            newSRC = newSRC.split("/")
            newSRC = newSRC.slice(1, newSRC.length).join("/")
            console.log(newSRC)
            if (appendFront != "") {
              newSRC = appendFront + newSRC + append
            }
          }
          newSRC = newSRC + append
          console.log(newSRC)
          node.src = newSRC

        }
      }
    }
   if (mutation.type === 'attributes') {
      var added = mutation.target
      for (var node of added) {
        if (node.src != undefined) {
          var newSRC = node.src
          if (localQ == true) {
            newSRC = newSRC.replace("https://", "s§@")
            newSRC = newSRC.replace("http://", "h§@")
            newSRC = newSRC.split("/")
            newSRC = newSRC.slice(1, newSRC.length).join("/")
            console.log('attrs'+newSRC)
            if (appendFront != "") {
              newSRC = appendFront + newSRC + append
            }
          }
          newSRC = newSRC + append
          console.log(newSRC)
          node.src = newSRC

        }
      }
    }
  }
};
const evnconfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['src','href'],
};
const observer = new MutationObserver(callback);
observer.observe(document.body, evnconfig);
