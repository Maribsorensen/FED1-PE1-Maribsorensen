import { ABSOLUTE_URL_PATH } from "./constants.mjs";


function createNavItem(text, href = "#", id = "") {
  const listItem = document.createElement("li");
  const anchorTag = document.createElement("a");
  anchorTag.textContent = text;
  anchorTag.href = href;
  if (id) anchorTag.id = id;
  listItem.appendChild(anchorTag);
  return listItem;
};

function createHamburgerMenu() {
  const unorderedList = document.createElement("ul");
  unorderedList.className = "hamburger-menu";

  const manager = createNavItem("Manage posts", `${ABSOLUTE_URL_PATH}post/manage.html`);
  const logout = createNavItem("Logout", "#", "logout");

  unorderedList.append(manager, logout);

  return unorderedList;
};

function createOwnerMenu(username) {
  const usernameList = document.createElement("li");
  usernameList.className = "username-menu";
  usernameList.textContent = username;

  const hamburgerMenu = createHamburgerMenu();
  hamburgerMenu.classList.add("hidden");
  usernameList.appendChild(hamburgerMenu);

  usernameList.addEventListener("click", function () {
    toggleHamburger(hamburgerMenu);
  });

  const unorderedList = document.createElement("ul");
  unorderedList.appendChild(usernameList);

  return unorderedList;
};

function createUserMenu() {
  const unorderedList = document.createElement("ul");
  unorderedList.appendChild(createNavItem("Login", `${ABSOLUTE_URL_PATH}account/login.html`));
  unorderedList.appendChild(createNavItem("Register", `${ABSOLUTE_URL_PATH}account/register.html`));
  return unorderedList;
};

function initializeLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  updateHamburgerMenu();
};

function updateHamburgerMenu() {
  const hamburgerMenu = document.getElementById("headerNav");
  hamburgerMenu.textContent = "";

  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  if (accessToken && username) {
    const ownerMenu = createOwnerMenu(username);
    hamburgerMenu.appendChild(ownerMenu);

    const logout = document.getElementById("logout");
    if (logout) {
      logout.addEventListener("click", initializeLogout);
    }
  } else {
    const userMenu = createUserMenu();
    hamburgerMenu.appendChild(userMenu);
  }
};

function toggleHamburger(element) {
  element.classList.toggle("visible");
}
export function initializeHeaderNav() {
  updateHamburgerMenu();
};