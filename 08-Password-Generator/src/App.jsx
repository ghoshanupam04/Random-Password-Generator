import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react';

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook:
  const passwordRef=useRef(null);
  

  //Password Generator function:
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdedghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "@#$%^&*~";
    for (let i = 0; i <= length; i++) {
      let chr = Math.floor(Math.random() * str.length + 1);
      pass+= str.charAt(chr);
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  //Copy Button function:
  const copyPasswordtoClibboard=useCallback(()=>{
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3); //create range when the password was copy
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},
  [length, numberAllowed, characterAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8
      text-orange-500 bg-gray-700 text-center'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
      text-orange-500 bg-gray-700 text-center'>
          <h1 className='text-white  text-center font-bold underline my-3'>
            Password Generator
          </h1>
          <div className='flex shado rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef} />
            <button onClick={copyPasswordtoClibboard}
            className='outline-none bg-blue-700 text-white 
          px-3 py-0.5 shrink-0 '>Copy</button>
          </div>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(eve) => { setLength(eve.target.value) }}
            />
            <label htmlFor=""> Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id='charInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

