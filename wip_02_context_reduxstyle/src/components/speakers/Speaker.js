import SpeakerDetail from "./SpeakerDetail";
import {SpeakersDataContext, SpeakersDataProvider} from "../contexts/SpeakersDataContext";
import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

function SpeakerInner({ id }) {

  const {darkTheme} = useContext(ThemeContext);
  const {speakerList, loadingStatus} = useContext(SpeakersDataContext);

  if (loadingStatus === "loading") return <div>Loading...</div>

  const speakerRec = speakerList?.find((rec) => rec.id === id);

  return speakerRec ? (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <SpeakerDetail speakerRec={speakerRec} showDetails={true} />
    </div>
  ) : (
    <h2 className="text-danger">Speaker {id} not found</h2>
  );
}

export default function Speaker(props) {
  return (
    <SpeakersDataProvider>
      <SpeakerInner {...props} />
    </SpeakersDataProvider>
  )
}
