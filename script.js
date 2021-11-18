var container = document.createElement("div");
container.setAttribute("class", "container");
 
var heading = document.createElement("div");
heading.setAttribute("class", "heading");

/*user name include in text*/
var userName = document.createElement("input");
userName.setAttribute("class", "search-user");
userName.setAttribute("type", "text");
userName.setAttribute("placeholder", "Enter GitHub Username");

var btn = document.getElementsByTagName("button");
var userInput = document.getElementById("userid");




/* Common method to create DOM elements */

function createElement(
  elType,
  classNames,
  attributeNames = {},
  visibleText
) {
  var inputDiv = document.createElement(elType);
  inputDiv.classList.add(...classNames);

  for (var [key, value] of Object.entries(attributeNames)) {
    inputDiv.setAttribute(key, value);
  }
  inputDiv.innerHTML = visibleText;
  return inputDiv;
}

/*  Async fetch function  */

async function fetchAPI(url, callbck) {
  try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    var data = await resp.json();
    callbck(data);
  } catch (error) {
    rowDiv.innerHTML = "";
    alert("Error in fetching  data , Getting " + error);
  }
}

/*  heading */
var h1 = createElement(
  "h1",
  ["display-2", "text-center", "mb-3"],
  {},
  "GitHub Repositorie"
);

/*  User input field  and Search Button*/

var form = createElement(
  "form",
  ["form-inline", "justify-content-center"],
  {},
  ""
);

var mydiv = createElement(
  "div",
  ["form-group", "mx-sm-3", "mb-2"],
  {},
  ""
);

var label = createElement(
  "label",
  ["sr-only"],
  { for: "userid" },
  "Username"
);

var input = createElement(
  "input",
  ["form-control"],
  {
    type: "text",
    id: "userid",
    placeholder: "Enter github user name ",
   
  },
  ""
);

var button = createElement(
  "button",
  ["btn", "btn-primary", "mb-2"],
  { type: "submit", },
  "Search"
);
button.setAttribute('class','btn');

mydiv.append(label, input);

form.append(mydiv, button);

document.body.append(h1, form);

/* Event Listener for search Btn */

btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  var userBtn = document.getElementById("userid");
  if (userBtn.value) {
    fetchAPI(
      `https://api.github.com/users/${userBtn.value}/repos`,
      createRepo
    );
  } else {
    alert("Please enter the user name first");
  }

  userBtn.value = "";
  userBtn.blur();
});

var container1 = createElement("div", ["container", "my-5"], {}, "");

var row = createElement("div", ["row", "row-cols-2"], {}, "");
row.setAttribute('class','box')
/* Method for creating html for user repos */

function createRepo(data) {
  row.innerHTML = "";
  if (data) {
    data.forEach((el) => {
      var column = createElement("div", ["col", "d-flex"], {}, "");

      var card = createElement(
        "div",
        ["card", "flex-fill", "mb-3", "border-success", "bg-warning"],
        { style: "max-width:540px" },
        ""
      );

      var childRow = createElement(
        "div",
        ["row", "no-gutters"],
        {},
        ""
      );

      var childCol = createElement("div", ["col-md-4"], {}, "");

      var img = createElement(
        "img",
        ["card-img"],
        {
          src: el.owner.avatar_url,
          alt: "user image",
        },
        ""
      );

      var colCard = createElement("div", ["col-md-8"], {}, "");

      var CardBody = createElement("div", ["card-body"], {}, "");

      var CardTitle = createElement(
        "h5",
        ["card-header", "font-weight-bold", "mb-3"],
        {},
        el.name[0].toUpperCase() + el.name.slice(1)
      );

      var link = createElement(
        "a",
        ["card-text"],
        { target: "_blank", role: "button", href: el.html_url },
        el.html_url
      );

      var Description = createElement(
        "p",
        ["card-text"],
        {},
        el.description
      );

      var fork = createElement(
        "p",
        ["card-text"],
        {},
        `Forked ${el.forks_count} times & Starred ${el.stargazers_count} times`
      );

      CardBody.append(CardTitle, Description, fork, link);

      colCard.append(CardBody);

      childCol.append(img);

      childRow.append(childCol, colCard);

      card.append(childRow);

      column.append(card);

      row.append(column);
    });
  } else {
    alert("Please check with the user once, it seems it's incorrect!!! ");
  }

  container1.append(row);

  document.body.append(container1);
}