const getUsers = async () => {
  const response = await fetch("https://reqres.in/api/users");
  const data = await response.json();
  console.log(response);
  console.log(data.data);
  let users = "";
  Object.entries(data.data).forEach(([key, data]) => {
    users += `
      <div class="col-md-4 col-12 mb-2">
        <img src="${data.avatar}">
      </div>
      <div class="col-md-8 col-12 mb-2 ml-2">
        <p class="fw-bold text-primary" style="font-size: 13px; margin-bottom: 1px;">
        ${data.first_name + " " + data.last_name}</p>
        <p style=" margin-bottom: 1px;">${data.email}</p>
        <button type="button" onclick="getById(${
          data.id
        })" class="btn bg-warning btn-circle "><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" onclick="deleteUser(${
          data.id
        })" class="btn bg-danger text-white btn-circle "><i class="fa-solid fa-trash"></i></button>
      </div>
            
            <hr>
        `;
  });
  document.getElementById("users").innerHTML = users;
};
getUsers();

document.getElementById("btnCreate").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  const userData = {
    name: name,
    job: job,
  };

  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((data) => {
      console.log(data);
      window.alert("Registro exitoso!");
      getUsers();
      cleanForm();
    })
    .catch((error) => {
      window.alert("Error al registrar: " + error);
    });
});

const cleanForm = () => {
  const name = (document.getElementById("name").value = "");
  const job = (document.getElementById("job").value = "");
};

const getById = async (id) => {
  const response = await fetch(`https://reqres.in/api/users/${id}`);
  const data = await response.json();
  console.log(response);
  console.log(data);

  const nameInput = document.getElementById("name");
  const jobInput = document.getElementById("job");
  const idInput = document.getElementById("id");

  nameInput.value = data.data.first_name;
  jobInput.value = data.data.job;
  idInput.value = data.data.id;

  document.getElementById("btnCreate").style.display = "none";
  document.getElementById("btnUpdate").style.visibility = "visible";
  document.getElementById("btnCancel").style.visibility = "visible";
};

const cancel = () => {
  document.getElementById("btnCreate").style.display = "block";
  document.getElementById("btnUpdate").style.visibility = "hidden";
  document.getElementById("btnCancel").style.visibility = "hidden";
};

document.getElementById("btnUpdate").addEventListener("click", function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: name,
      description: job,
    }),
  })
    .then((data) => {
      console.log(data);
      window.alert("Se modifico con exito!");
      getUsers();
      cleanForm();
      cancel();
    })
    .catch((error) => {
      console.error(error);
      window.alert("Error: " + error);
    });
});


const deleteUser = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          window.alert("Se eliminó con éxito");
          getUsers();
          cleanForm();
          cancel();
        } else {
          window.alert("Error: No fue posible eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        window.alert("Error: " + error);
      });
  }
  


