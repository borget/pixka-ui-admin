import React, {useState} from "react";

// layout for page
import { useRouter } from 'next/router'
import Auth from "layouts/Auth.js";
import {signup} from "../../firebase/auth";
import Loader from "react-loader-spinner";

function useInput({ type, placeholder /*...*/ }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>;
  return [value, input];
}

export default function Register() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [username, userInput] = useInput({ type: "text" , placeholder: "Nombre"});
  const [email, emailInput] = useInput({ type: "email" , placeholder: "Email"});
  const [password, passwordInput] = useInput({ type: "password", placeholder: "Contraseña" });


  const createAccount = async (e) => {
    e.preventDefault();
    let newUser;
    try {
      setLoading(true);
      newUser = await signup({
        userName: username,
        email: email,
        password: password
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    if (newUser) {
      await router.push(`/profile/${newUser.uid}`);
    } else {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Iniciar con
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                  <div className="text-left mt-6">
                    {isLoading ? (<Loader
                        type="Oval"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />) : null}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>O registrar con credenciales</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <>
                      {userInput}
                    </>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <>
                      {emailInput}
                    </>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <>
                      {passwordInput}
                    </>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Acepto la {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Pol&iacute;tica de privacidad
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={createAccount}
                      disabled={isLoading}
                    >
                      Crear cuenta
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
