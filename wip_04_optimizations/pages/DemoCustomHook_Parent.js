import React, {useEffect, useState} from "react";
import DemoCustomHook_Child from "./DemoCustomHook_Child";

const localStateValues = [];
let currentLocalStateValueIndexGlobal = 0

export default function DemoCustomHook_Parent() {

  function useStateMyVersion(initial) {

    const currentLocalStateValueIndexLocal = currentLocalStateValueIndexGlobal

    if (localStateValues[currentLocalStateValueIndexLocal] === undefined) {
      localStateValues[currentLocalStateValueIndexLocal] = initial;
    }

    const setValue = (value) => {
      rerenderMe()
      localStateValues[currentLocalStateValueIndexLocal] = value;
    }

    currentLocalStateValueIndexGlobal++
    const response = [localStateValues[currentLocalStateValueIndexLocal], setValue]
    return response;
  }

  //just for debugging
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    console.log("...rendering...");
  }, [cnt])
  function rerenderMe() {
    setCnt(cnt+1);
    console.log("...rerenderMe...");
  }

  currentLocalStateValueIndexGlobal = 0

  return <DemoCustomHook_Child useCustomState={useStateMyVersion}/>
}