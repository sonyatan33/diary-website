var options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};

//today's date
document.getElementById("date").innerHTML = new Date().toDateString();

//the date when user creates a diary
document.getElementById("diary_date").innerHTML = new Date().toLocaleDateString(
  "en-GB",
  options
);

//when user creates a new diary, open the form
function add_diary() {
  var new_diary = document.getElementsByClassName("new-diary")[0];
  if ((new_diary.style.display = "none")) {
    new_diary.style.display = "block";
  }
}

function get_diary_information() {
  var new_diary = document.getElementsByClassName("new-diary")[0];
  if ((new_diary.style.display = "block")) {
    new_diary.style.display = "none";
  }
}

