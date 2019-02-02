var sietk;
var result;
var store;
var tx;
var indexedDB = window.indexedDB || window.mozIndexedDB ||window.webkitIndexedDB || window.msIndexedDB;
// db creation
sietk = indexedDB.open("mydb,1");

sietk.onerror = function(e) {
console.log("error"+e)
}

sietk.onupgradeneeded = function(e){
result = e.target.result;
store = result.createObjectStore("resume", {keyPath:"name"});
}
sietk.onsuccess = function(e){
  result = e.target.result;
  function getdata(callback) {
    tx = result.transaction("resume",IDBTransaction.READ_ONLY);
    store = tx.objectStore("resume");
     data = [];
    tx.oncomplete = function(e){
      callback(result);
      console.log(result);
    }
    var cursor = store.openCursor();
    cursor.onerror = function(e) {
      console.log("error"+e);
    }
    cursor.onsuccess = function(e) {
      var resultcursor = e.target.result;
      if (resultcursor){
        data.push(resultcursor.value);
        resultcursor.continue();
      }
    }
  }

var parent = document.querySelector(".parent");
getdata(function(d) {
  console.log(d);
  for (var i in data){
    var child = document.createElement("div");
    child.classList.add("child");
    parent.append(child);
      
     var img = document.createElement("img");
     img.src="ammu.png";
     img .alt=data[i].name;
     child.append(img);

     var name = document.createElement("h2");
     name.textContent = data[i].name;
     child.append(name);

      var phonenumber= document.createElement("h2");
      phonenumber.textContent = data[i].phonenumber;
      child.append(phonenumber);

      var email = document.createElement("h2");
      email.textContent = data[i].email;
      child.append(email);

      var a = document.createElement("a");
      a.textContent = "view profile";
      a.href="resume.html?name="+data[i].name;
      child.append(a);
  }
})
}
