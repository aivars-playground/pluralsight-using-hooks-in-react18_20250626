import {useContext} from "react";
import {SpeakersDataContext} from "../contexts/SpeakersDataContext";

export default function FavoriteSpeakerToggle({ speakerRec }) {
  const { updateSpeaker } = useContext(SpeakersDataContext)
  const [updating, setUpdating] = [false, () => {}];

  return (
    <button
      className={
        speakerRec.favorite ? "heartredbutton btn" : "heartdarkbutton btn"
      }
      onClick={(e) => {
        e.preventDefault();
        const newSpeakerRec = {
          ...speakerRec,
          favorite: !speakerRec.favorite,
        };
        setUpdating(true);
        updateSpeaker(newSpeakerRec, () => {
          setUpdating(false);
        });
      }}
    >
      {updating ? (
        <i className="spinner-border text-dark" role="status" />
      ) : null}
    </button>
  );
}
