import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  // MES USESTATE
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infos, setInfos] = useState(false);

  // MES VARIABLES
  const navigate = useNavigate();

  return (
    <form className="formulaire">
      <div className="App">
        <h1>Vos informations </h1>
        {infos === false ? (
          <div className="input-block">
            <div>
              <p>Nom d'Utilisateur</p>
              <input
                onChange={(username) => setName(username.target.value)}
                type="text"
                placeholder="Utilisateur"
                name="name"
                value={username}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                onChange={(elem) => setEmail(elem.target.value)}
                type="email"
                placeholder="youraddress@mail.com"
                name="email"
                value={email}
              />
            </div>
            <div>
              <p>Password</p>
              <input
                onChange={(elem) => setPassword(elem.target.value)}
                type="password"
                name="password"
                value={password}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  if (username === "" || email === "") {
                    alert(`Your informations are not complete`);
                  } else {
                    setInfos(true);

                    const data = async () => {
                      try {
                        const response = await axios.post(
                          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                          {
                            email: email,
                            username: username,
                            password: password,
                            newsletter: true,
                          }
                        );
                        console.log(response.data.token);
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    data();
                    navigate("/");
                  }
                }}
              >
                Créer un compte
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default Signup;
