import SpeakerLine from "./SpeakerLine";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {reducer} from "next/dist/client/components/reducer";

function List({state, dispatch}) {
  const [updatingId, setUpdatingId] = useState(0)
  const isPending = false;

  function toggleFavoriteSpeaker(speakerRec) {
    const speakerRecUpdated = {...speakerRec, favorite: !speakerRec.favorite};
    dispatch({type:"updateSpeaker", speaker: speakerRecUpdated});
    async function updateAsync(rec) {
      setUpdatingId(rec.id);
      await axios.put(`/api/speakers/${rec.id}`, rec)
      setUpdatingId(0);
    }
    updateAsync(speakerRecUpdated)
  }

  return (
    <div className="container">
      <div className="border-0">
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Speaker toolbar filter"
        >
          <div className="toolbar-trigger mb-3 flex-grow-04">
            <div className="toolbar-search w-100">
              <input
                value=""
                onChange={(event) => {}}
                type="text"
                className="form-control"
                placeholder="Highlight Names"
              />
            </div>
            <div className="spinner-height">
              {isPending && (
                <i className="spinner-border text-dark" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {state.speakers.map(function (speakerRec) {
          const highlight = false;
          return (
            <SpeakerLine
              key={speakerRec.id}
              speakerRec={speakerRec}
              updating={updatingId === speakerRec.id ? updatingId : 0}
              toggleFavoriteSpeaker={() => toggleFavoriteSpeaker(speakerRec)}
              highlight={highlight}
            />
          );
        })}
      </div>
    </div>
  );
}

const SpeakerList = () => {
  const darkTheme = false;

  const initialState = {
    speakers: [],
    loading: true,
  }

  function reducer(state, action) {
    switch (action.type) {
      case "speakersLoaded":
        return { ...state, loading: false, speakers: action.speakers };
      case "setLoadingStatus":
        return { ...state, loading: true };
      case "updateSpeaker":
        const speakerUpdated = state.speakers.map(
          speaker => action.speaker.id === speaker.id ? action.speaker : speaker
        )
        return { ...state, speakers: speakerUpdated };
      default:
        throw new Error("Unknown action type");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchSpeakers() {
      dispatch({type:"setLoadingStatus"});
      const response = await axios.get("/api/speakers");
      dispatch({type:"speakersLoaded", speakers: response.data});
    }
    fetchSpeakers();
  }, []);

  if (state.loading) return <div>loading...</div>

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <List state={state} dispatch={dispatch} />
    </div>
  );
};

export default SpeakerList;
