import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [infos, setInfos] = useState(false);

  return (
    <div className="formulaire">
      <div className="App">
        <h1>Vos informations </h1>
        {infos === false ? (
          <div className="input-block">
            <div>
              <p>Name</p>
              <input
                onChange={(name) => setName(name.target.value)}
                type="text"
                placeholder="Utilisateur"
                name="name"
                value={name}
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
              <p>Confirm Password</p>
              <input
                className={password !== confirmPass && "pass-border"}
                onChange={(elem) => setConfirmPass(elem.target.value)}
                type="password"
                name="confirm password"
                value={confirmPass}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  if (password !== confirmPass) {
                    alert(`Passwords are not identical ! Please retry`);
                  }
                  if (password !== confirmPass) {
                  } else if (name === "" || email === "") {
                    alert(`Your informations are not complete`);
                  } else {
                    setInfos(true);
                  }
                }}
              >
                Créer un compte
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Signup;
