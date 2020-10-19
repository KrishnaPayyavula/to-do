import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";

import { AppContext } from "../../App";
import NoteStyles from "./noteStyles.module.css";
export default function Note(props) {
  const [appState, setAppState] = useContext(AppContext);
  const InitState = {
    _id: "",
    title: "",
    description: "",
    lastModified: "",
    status: "",
    media: [],
    targetDate: "",
  };
  const [noteData, setNoteData] = useState(InitState);
  useEffect(() => {
    if (JSON.stringify(props.data) !== JSON.stringify(noteData)) {
      setNoteData(props.data);
    }
  }, [props, noteData]);
  const triggerModal = () => {
    let temp = { ...appState };
    temp.activeNoteId = noteData._id;
    temp.show = true;
    temp.currentAction = "edit";
    setAppState(temp);
  };
  const deleteNote = (e) => {
    e.stopPropagation();
    let temp = { ...appState };
    temp.activeNoteId = noteData._id;
    temp.currentAction = "delete";
    setAppState(temp);
  };
  const handleSelection = (checked) => {
    setSelected(checked);
    let temp = { ...appState };
    temp.selectedNotes.push(noteData._id);
    setAppState(temp);
  };
  const [selected, setSelected] = useState(false);
  return (
    <div className={NoteStyles.note} onClick={triggerModal}>
      <div className="d-flex flex-column flex-fill">
        <div className="d-flex align-items-center mb-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => {
              handleSelection(e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <h3 className={NoteStyles.noteTitle} title={noteData.title}>
            {noteData.title}
          </h3>
          <small className="ml-auto">{noteData.lastModified}</small>
        </div>
        <p className={NoteStyles.description}>{noteData.description}</p>
      </div>
      <div className={NoteStyles.footnote}>
        <strong className={NoteStyles[`status-${noteData.status}`]}>
          {noteData.status}
        </strong>
        <div className="d-flex align-items-center">
          <button
            className={NoteStyles.removeBtn}
            onClick={(e) => deleteNote(e)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
}
