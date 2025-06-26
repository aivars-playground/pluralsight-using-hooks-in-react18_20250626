# pluralsight-using-hooks-in-react18

```shell
npm run dev
```

quality-of-life improvements
----------------------------
* React component visualizer   
  https://github.com/React-Sight/React-Sight  
  https://github.com/team-gryff/react-monocle  
  VS Code extension: https://marketplace.visualstudio.com/items?itemName=team-sapling.sapling  
  IDEA: react buddy plugin

routing
-------
app is using pages router:  
https://nextjs.org/docs#app-router-and-pages-router  
app starts from:  
./pages/[[[...route_name]].js](pages/%5B%5B...route_name%5D%5D.js)  

example http call:  
http://localhost:3000/demoHello  
example api call:  
http://localhost:3000/api/speakers  
unreachable:  
http://localhost:3000/_app  



code errors : hook rules
-----------
*  Hooks can only be called inside of the body of a function
```jsx
class ClassComponent extends React.Component {
  render() {
    useEffect(() => {}, []);
    <h3>Some text here</h3>
  }
}
```
```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```

*  Hooks cannot be called copnditionally
```jsx
if (track) {
  useEffect(() => {
    console.log(`hit`)
    document.title = `${text1.length}`
  }, [text1]);
}
```
```
Error: Rendered more hooks than during the previous render.
 or
Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
```

* hooks can be called inside a function component
```jsx
export default function DemoCustomHookNotWorking() {
  function fun() { return useState()}
  return {}
}
```
```
ESlint error: neither a component nor a custom hook
```

creating own hook - similar to useState
---------------------------------------
http://localhost:3000/demoCustomHookNotWorking
not as easy as in [demoCustomHookNotWorking.js](pages/demoCustomHookNotWorking.js)  


http://localhost:3000/DemoCustomHook_Parent
why hook rules are needed: guaranted sequence of invocation  
usestate is globnal function, all states are stored in an array  
see DemoCustomHook[DemoCustomHook_Parent.js](pages/DemoCustomHook_Parent.js)_Parent   
```currentLocalStateValueIndexGlobal, currentLocalStateValueIndexLocal```


calling api
-----------
see ./pages/api - server provides GET/POST api  
use fetch or axios  



REDUCER
-------
http://localhost:3000/DemoReducer  
can replace useState with no code...  
* second param can be renamed .. .dispatcher > setText2
* (_,action)   function ignores first param...
```jsx
const [text1, setText1] = useState("First")
const [text2, setText2] = useReducer((_,action) => action,"Second")
```

or use more conventional syntax
```jsx
const [text2, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case "set":    {return action.payload},
      default:  {}
    }
  },
  "second"
)

dispatch({type:"set", payload: "new value"})
```


useRef
======
http://localhost:3000/DemoUseRef
* persists between rerenders
* does not cause rerender
* access real DOM html
