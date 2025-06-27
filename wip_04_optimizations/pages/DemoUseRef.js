import {useRef} from "react";

export default function DemoUseRef() {

  const imgRef = useRef();
  const mouseOverCount = useRef(0);

  return (
    <div className="container">
      <img src="/images/Speaker-1124.jpg"
           ref={imgRef}
           style={{ filter: "grayscale(80%)" }}
           onMouseOver={() => {
             mouseOverCount.current++
             imgRef.current.style.filter = "grayscale(0)"
           }}
           onMouseOut={() =>
             imgRef.current.style.filter = "grayscale(80%)"
           }
      />
      <hr />
      <button
        onClick={() => {
          alert("HI, hovered times:" + mouseOverCount.current)
        }}
      >
        click me
      </button>
      <p>scroll down</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => {
        alert("taking back to:" + imgRef.current)
        imgRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        })
      }}>back to picture</button>
    </div>
  )
}