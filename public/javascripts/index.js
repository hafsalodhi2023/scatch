const xmark = document.querySelector(".fa-xmark");
const errorPopup = document.querySelector(".error");

xmark.addEventListener("click", () => {
  errorPopup.className =
    "error absolute top-0 left-[40%] p-3 bg-red-100 border border-red-500 text-red-500 hidden";
});
