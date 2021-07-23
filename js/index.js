const param_radio = document.getElementById("params-radio");
const json_radio = document.getElementById("json-radio");
const custom_para_box = document.getElementById("custom-para-box");
const request_json_box = document.getElementById("request-json-box");
const add_param_btn = document.getElementById("add-param");

let addParamCounter = 0;

//utility functions
//1. get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// add toggle to param and request json box
param_radio.addEventListener("click", () => {
  request_json_box.style.display = "none";
  custom_para_box.style.display = "block";
});

json_radio.addEventListener("click", () => {
  custom_para_box.style.display = "none";
  request_json_box.style.display = "block";
});

// add more custom param fields..
add_param_btn.addEventListener("click", () => {
  let add_param_div_box = document.getElementById("add-param-div-box");
  let string = `<div class="my-1">
                     <div class="form-row">
                     <label class="col-sm-2 col-form-label" for="json">Parameter ${
                       addParamCounter + 2
                     } :</label>
                    <div class="col-md-4">
                   <input
                     type="text"
                     class="form-control"
                    id="parameter-key-${addParamCounter + 2}"
                    placeholder="Key ${addParamCounter + 2}"
                    />
                   </div>
                 <div class="col-md-4">
                 <input
                 type="text"
                 class="form-control"
                 id="parameter-value-${addParamCounter + 2}"
                 placeholder="Value ${addParamCounter + 2}"
                />
                </div>
               <button  class="btn btn-primary deleteParam">-</button>
               </div>
               </div>`;
  // converting dom element from string
  let customFieldElement = getElementFromString(string);
  add_param_div_box.appendChild(customFieldElement);

  //remove element by clicking (-) botton on input field
  let delete_params = document.getElementsByClassName("deleteParam");
  for (const item of delete_params) {
    item.addEventListener("click", (e) => {
      // let confirmResult = confirm("Are you sure to delete... ");
      // if (confirmResult) {
      e.target.parentElement.remove();
      // }
      // addParamCounter--;
    });
  }

  addParamCounter++;
});

// fetch data when click send button
const submit_btn = document.getElementById("submit");
submit_btn.addEventListener("click", () => {
  
  document.getElementById("response-json-text").innerHTML =
    "Please Wait... Fetching Response....";

  let url = document.getElementById("url").value;
  let request_selector_value =
    document.getElementById("request-selector").value;
  let content_type = document.querySelector(
    "input[name='content-type']:checked"
  ).value;

  //log all the values for debugging..
  //   console.log(url, request_selector_value, content_type);

  //add input field parameter in object..
  if (content_type === "params") {
    data = {};
    for (i = 0; i < addParamCounter + 1; i++) {
      if (document.getElementById("parameter-key-" + (i + 1)) !== null ) {
        let key = document.getElementById("parameter-key-" + (i + 1)).value;
        let value = document.getElementById("parameter-value-" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("request-json-text").value;
  }

  // console.log(url, request_selector_value, content_type, data);

  if (request_selector_value === "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          document.getElementById("response-json-text").innerHTML = res.statusText;
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("response-json-text").innerHTML = data;
        Prism.highlightAll();
      })
      .catch((error) => {
        document.getElementById(
          "response-json-text"
        ).innerHTML = `error is : ${error}`;
      });
  } else if (request_selector_value === "POST") {
    fetch(url, {
      method: "POST",
      body: data,
      headers:{
        "content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if (!res.ok) {
          document.getElementById("response-json-text").innerHTML = res.statusText;
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("response-json-text").innerHTML = data;
      })
      .catch((error) => {
        document.getElementById(
          "response-json-text"
        ).innerHTML = `error is : ${error}`;
      });
  }
  else if(request_selector_value === "PUT"){
    fetch(url, {
      method: "PUT",
      body: data,
      headers:{
        "content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if (!res.ok) {
          document.getElementById("response-json-text").innerHTML = res.statusText;
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("response-json-text").innerHTML = data;
      })
      .catch((error) => {
        document.getElementById(
          "response-json-text"
        ).innerHTML = `error is : ${error}`;
      });
  }
  else if(request_selector_value === "PATCH"){
    fetch(url, {
      method: "PATCH",
      body: data,
      headers:{
        "content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if (!res.ok) {
          document.getElementById("response-json-text").innerHTML = res.statusText;
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("response-json-text").innerHTML = data;
      })
      .catch((error) => {
        document.getElementById(
          "response-json-text"
        ).innerHTML = `error is : ${error}`;
      });
  }
  else if(request_selector_value === "DELETE"){
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          document.getElementById("response-json-text").innerHTML = res.statusText;
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("response-json-text").innerHTML = data;
      })
      .catch((error) => {
        document.getElementById(
          "response-json-text"
        ).innerHTML = `error is : ${error}`;
      });
  }
});
