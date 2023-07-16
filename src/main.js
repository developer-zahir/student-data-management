const students_list_container = document.querySelector(".students_list_container");
const user_form = document.getElementById("user_form");
const msg = document.querySelector(".msg");
const profile_image = document.querySelector("#profile_image");

// show student data
const show_students_data = () => {
  // if local storage data exist or not
  if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
  }

  let content = "";
  data.forEach((item, index) => {
    content += `
    <tr>
    <td>${index + 1 <= 9 ? `0${index + 1}` : index + 1}</td>
    <td><img src="${item.profile_image}" alt="" class="img-thumbnail" style="width: 60px" /></td>
    <td>${item.name}</td>
    <td><a class="text-decoration-none text-black" href="malto:${item.email}">${item.email}</a></td>
    <td><a class="text-decoration-none text-black" href="tel:${item.phone}">${item.phone}</a></td>
    <td><span onclick= delete_student_data(${index}) class="delete-student-data bg-danger p-2 text-white" ><i class="bi bi-trash"></i></span></td>
    </tr>
    `;
  });
  if (data.length != 0) {
    students_list_container.innerHTML = content;
  } else {
    students_list_container.innerHTML = '<tr><td colspan="6" class="text-center bg-danger-subtle">Data not found!</td></tr>';
  }
};
show_students_data();

// Get the user submitted data, and send it to ls
user_form.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);

  // if local storage data exist or not
  if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
  }

  // get all form data when click the submite button
  const stu_submite_data = Object.fromEntries(form_data);

  // Validation: submit field empty or not
  if (!stu_submite_data.name || !stu_submite_data.email || !stu_submite_data.phone || !stu_submite_data.profile_image) {
    msg.innerHTML = create_alert("All fields are required");
  } else if (!isMobile(stu_submite_data.phone)) {
    msg.innerHTML = create_alert("Invalid phone number", "warning");
  } else if (!isEmail(stu_submite_data.email)) {
    msg.innerHTML = create_alert("Invalid email address", "warning");
  } else {
    msg.innerHTML = create_alert("Data submit done!", "success");
    data.push(stu_submite_data);
    profile_image.nextElementSibling.children[0].setAttribute("src", "");
    user_form.reset();
  }

  // send data to ls
  localStorage.setItem("data", JSON.stringify(data));
  show_students_data();
};

// select profile image, show preview and remove select image and preview
let profile_image_url;
profile_image.oninput = (e) => {
  profile_image_url = profile_image.value;
  profile_image.nextElementSibling.children[0].setAttribute("src", profile_image_url);
};

const reset = document.querySelector(".reset");
reset.onclick = () => {
  profile_image.nextElementSibling.children[0].setAttribute("src", "");
};

profile_image.nextElementSibling.onclick = (e) => {
  profile_image.value = "";
  profile_image.nextElementSibling.children[0].setAttribute("src", "");
};

// delete student data --------------
const delete_student_data = (index) => {
  const updata_data = data.filter((item, idx) => idx != index);
  localStorage.setItem("data", JSON.stringify(updata_data));
  show_students_data();
};
