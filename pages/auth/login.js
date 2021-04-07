import React, {useState} from "react";
import Link from "next/link";
import PixkaInput from 'components/PixkaInput/PixkaInput'
// layout for page

import Auth from "layouts/Auth.js";
import {useRouter} from "next/router";
import {signin} from "../../firebase/auth";
import Loader from "react-loader-spinner";

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [email, emailInput] = PixkaInput({ type: "email" , placeholder: "Email"});
  const [password, passwordInput] = PixkaInput({ type: "password", placeholder: "Contraseña" });

  const login = async () => {
    let user;
    try {
      setLoading(true);
      user = await signin({
        email: email,
        password: password
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    if (user) {
      await router.push(`/admin/dashboard/`);
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
                        Remember me
                      </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={login}
                          disabled={isLoading}
                      >
                        Iniciar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <a href="#pablo" className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

Login.layout = Auth;