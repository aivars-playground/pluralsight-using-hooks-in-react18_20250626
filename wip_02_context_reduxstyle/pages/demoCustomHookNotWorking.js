import React, {useEffect, useState} from "react";


let localStateValue = undefined;
function useStateMyVersion(initial) {
  if (localStateValue === undefined) {
    localStateValue = initial;
  }

  const setValue = (value) => {
    localStateValue = value;
  }

  const response = [localStateValue, setValue]
  return response;
}


export default function DemoCustomHookNotWorking() {

  const [text1, setText1] = useState("First")
  const [text2, setText2] = useStateMyVersion("Second")

  useEffect(() => {
    console.log(`hit`)
    document.title = `${text1.length}`
  }, [text1]);

  return (
    <div className="container">
      <h3>Some text here</h3>
      <input onChange={e => setText1(e.target.value)} value={text1} />
      <hr />
      <input onChange={e => setText2(e.target.value)} value={text2} />
      <hr />
      <h2>
        <i>{text1} {text2}</i>
      </h2>
    </div>
  )
}