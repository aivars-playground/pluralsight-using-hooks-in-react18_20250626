import React, {useContext} from "react";
import SpeakerDetail from "./SpeakerDetail";
import {SpeakersDataContext} from "../contexts/SpeakersDataContext";
import {ThemeContext} from "../contexts/ThemeContext";
import useSpeakerSortAndFilter from "../hooks/useSpeakerSortAndFilter";

export default function SpeakersList() {

  const {speakerList, loadingStatus} = useContext(SpeakersDataContext)
  const speakerListFiltered = useSpeakerSortAndFilter(speakerList)

  if (loadingStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      {speakerListFiltered.map(function (speakerRec) {
        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerRec={speakerRec}
            showDetails={false}
          />
        );
      })}
    </>
  );
}
