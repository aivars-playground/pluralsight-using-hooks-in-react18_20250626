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

scrolling - a listener is necessary to trigger callback on scroll  
and listener has to be removed to avoid memory leaks  
setIsLoading(false); will trigger rerender after loaing
[SpeakerImageToggleOnScroll.js](src/components/speakers/SpeakerImageToggleOnScroll.js)
```jsx
  useEffect(() => {
  setInView(isInView());
  setIsLoading(false);
  window.addEventListener("scroll", scrollHandler);
  return () => {
    window.removeEventListener("scroll", scrollHandler);
  };
}, []);
```

avouid strange image sizes:
```jsx
      const gif1x1Transparent =
        "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

    <img
        src={isLoading ? gif1x1Transparent : imageUrl}
```


Context Provider
----------------
the code looks cleaner when extracting context to a separate file  
[ThemeContext.js](src/components/contexts/ThemeContext.js)  

Custom Hooks
------------
use generalised crud hook  
[useGeneralizedCrudMethods.js](src/components/hooks/useGeneralizedCrudMethods.js)  
adjust for easier use with a specialized hook  
[useSpeakersData.js](src/components/hooks/useSpeakersData.js)




Optimization
============

* useMemo

useMemo does shallow compare -> if change speakerlst item choild component - memo does not rebuild
use text representation of json....
```jsx
const speakerListJson = JSON.stringify(speakerList);

const speakerListFiltered = useMemo(
        () =>
                useSpeakerSortAndFilter(...)
        [speakingSaturday, speakingSunday, searchText, loadingStatus, speakerListJson] // dependencies
```

* memo
if input parameters do not change, memorizes the result
```jsx
  const SpeakerLine = memo(
    ({ speakerRec, toggleFavoriteSpeaker, updating, highlight }) => {return <div/>}
  )
```
!!! important - toggleFavoriteSpeaker a function that can be created each time copmponent is rendered  
solution: add useCallback with dependency. this case: `[speakerRec.favorite]` boolean value
```jsx
    <SpeakerLine
        key={speakerRec.id}
        speakerRec={speakerRec}
        updating={updatingId === speakerRec.id ? updatingId : 0}
        toggleFavoriteSpeaker={useCallback(
                () => toggleFavoriteSpeaker(speakerRec),
                [speakerRec.favorite]
        )}
        highlight={highlight}
```

* useDeferedValue
what we arte solving - user input triggers a request, slowing down an inpuit in ui

```jsx
const [search, setSearch] = useContext("")
const deferredSearch = useDeferredValue(search)

return (
  <>
    <input value={search} onChange={e => setSearch(e.currentTarget.value)} />
    <SlowQuery query={deferredSearch} />
    </>
)
```

* useTransition

updates input, based on `currentSearch` at higher priority, 
and `search` - triggering a slow task with lower priority
--- `isPending` watning that ui os not consistent with requrst
```jsx
const [search, setSearch] = useContext("")
const [isPending, startTransition] = useTransition()
const [currentSearch, setCurrentSearch] = useContext("")

return (
  <>
    <input value={currentSearch} onChange={e => {
            setCurrentSearvh((e.currentTarget.value)
            startTransition(() => setSearch(e.currentTarget.value))
    }} />
    {isPending && <div>spinner, ui upopdated faster than reqwues triggered</div>}
    <SlowQuery query={deferredSearch} />
    </>
)
```