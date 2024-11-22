function verifyLogin() {
    const statusLogin = localStorage.getItem("login") === "true";
    
    if (statusLogin) {
      const registroForm = document.getElementById("registroForm");
      const buttonLogin = document.getElementById("buttonLogin");
      const buttonLogout = document.getElementById("buttonLogout");
  
      if (registroForm) registroForm.style.display = "none";
      if (buttonLogin) buttonLogin.style.display = "none";
      if (buttonLogout) buttonLogout.style.display = "block";
      if (contactameForm) contactameForm.style.display = "block";
    } else {
      const registroForm = document.getElementById("registroForm");
      const buttonLogin = document.getElementById("buttonLogin");
      const buttonLogout = document.getElementById("buttonLogout");
  
      if (registroForm) registroForm.style.display = "block";
      if (buttonLogin) buttonLogin.style.display = "block";
      if (buttonLogout) buttonLogout.style.display = "none";
    }
  }
  
  async function logoutUser() {
    localStorage.setItem("login", "false");
    setTimeout(() => verifyLogin());
  }
  
  async function loginUser(email, password) {
    try {
      const response = await fetch("server/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&password=${password}`,
      });
  
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("login", "true");
        document.getElementById("formLogin").reset();
        alert("Ya iniciaste session");
        setTimeout(() => verifyLogin());
      } else {
        logoutUser();
        alert("Error al iniciar session");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al logearte");
      logoutUser();
    }
  }
  
  async function registerUser(name, email, phone, password) {
    try {
      const response = await fetch("server/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&name=${name}&phone=${phone}&password=${password}`,
      });
  
      const result = await response.json();
      if (result.success) {
        document.getElementById("formRegister").reset();
        alert("Usuario registrado exitosamente");
      } else {
        alert("Error al registrarse");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al registrarse");
    }
  }
  
  
  (() => {
    const formRegister = document.getElementById("formRegister");
    if (formRegister) {
        formRegister.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("nameUser").value;
            const email = document.getElementById("emailUser").value;
            const phone = document.getElementById("phoneUser").value;

            await registerUser(name, email, phone, password);
        });
    }

    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        document
            .getElementById("formLogin")
            .addEventListener("submit", async (event) => {
                event.preventDefault();

                const name = document.getElementById("emailUserLogin").value;
                const password = document.getElementById("passwordUserLogin").value;

                await loginUser(name, password);
            });
    }

    const buttonLogout = document.getElementById("buttonLogout");
    if (buttonLogout) {
        document
            .getElementById("buttonLogout")
            .addEventListener("click", async (event) => {
                logoutUser();
            });
    }

    verifyLogin();
})();
  //codigo jquery que debe mejorar
  function verifyLogin() {
    const statusLogin = localStorage.getItem("login") === "true";
    
    if (statusLogin) {
      $("#registroForm").hide();
      $("#buttonLogin").hide();
      $("#buttonLogout").show();
    } else {
      $("#registroForm").show();
      $("#buttonLogin").show();
      $("#buttonLogout").hide();
    }
  }
  
  function logoutUser() {
    localStorage.setItem("login", "false");
    setTimeout(() => verifyLogin());
  }
  
  function loginUser(email, password) {
    $.ajax({
      url: "server/login.php",
      type: "POST",
      data: { email: email, password: password },
      success: function(result) {
        if (result.success) {
          localStorage.setItem("login", "true");
          $("#formLogin")[0].reset();
          alert("Inicio exitoso de sesión");
          setTimeout(() => verifyLogin());
        } else {
          logoutUser();
          alert("Error al querer iniciar sesión");
        }
      },
      error: function(error) {
        console.error("Error:", error);
        alert("Ocurrió un error al logearte");
        logoutUser();
      }
    });
  }
  
  function registerUser(name, email, phone, password) {
    $.ajax({
      url: "server/register.php",
      type: "POST",
      data: { name: name, email: email, phone: phone, password: password },
      success: function(result) {
        if (result.success) {
          $("#formRegister")[0].reset();
          alert("Usuario registrado exitosamente");
        } else {
          alert("Error al registrarse");
        }
      },
      error: function(error) {
        console.error("Error:", error);
        alert("Ocurrió un error al registrarse");
      }
    });
  }
  
  const init = () => {
    const formRegister = $("#formRegister");
    if (formRegister.length) {
      formRegister.on("submit", async (event) => {
        event.preventDefault();
  
        const name = $("#nameUser").val();
        const email = $("#emailUser").val();
        const phone = $("#phoneUser").val();
        const password = $("#passwordUser").val();
  
        registerUser(name, email, phone, password);
      });
    }
  
    const formLogin = $("#formLogin");
    if (formLogin.length) {
      formLogin.on("submit", async (event) => {
        event.preventDefault();
  
        const email = $("#emailUserLogin").val();
        const password = $("#passwordUserLogin").val();
  
        loginUser(email, password);
      });
    }
  
    const buttonLogout = $("#buttonLogout");
    if (buttonLogout.length) {
      buttonLogout.on("click", async () => {
        logoutUser();
      });
    }
  
    verifyLogin();
  };
  
  $(document).ready((() => {
          const formRegister = document.getElementById("formRegister");
          if (formRegister) {
              formRegister.addEventListener("submit", async (event) => {
                  event.preventDefault();

                  const name = document.getElementById("nameUser").value;
                  const email = document.getElementById("emailUser").value;
                  const phone = document.getElementById("phoneUser").value;

                  await registerUser(name, email, phone, password);
              });
          }

          const formLogin = document.getElementById("formLogin");
          if (formLogin) {
              document
                  .getElementById("formLogin")
                  .addEventListener("submit", async (event) => {
                      event.preventDefault();

                      const name = document.getElementById("emailUserLogin").value;
                      const password = document.getElementById("passwordUserLogin").value;

                      await loginUser(name, password);
                  });
          }

          const buttonLogout = document.getElementById("buttonLogout");
          if (buttonLogout) {
              document
                  .getElementById("buttonLogout")
                  .addEventListener("click", async (event) => {
                      logoutUser();
                  });
          }

          verifyLogin();
      }));