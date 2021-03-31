import React, {useState} from "react";

function PixkaInput({ type, placeholder /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>;
    return [value, input, setValue];
}

export default PixkaInput;