import React, {useEffect} from "react";


export default function DemoCustomHook_Child({useCustomState}) {

  const [text1, setText1] = useCustomState("First")
  const [text2, setText2] = useCustomState("Second")

  useEffect(() => {
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