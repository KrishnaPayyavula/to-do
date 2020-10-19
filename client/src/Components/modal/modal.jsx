import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";
import ModalStyles from "./modalStyles.module.css";
import { AppContext } from "../../App";
export default function Modal(props) {
  const [appState, setAppState] = useContext(AppContext);
  const InitState = {
    _id: "",
    title: "",
    description: "",
    lastModified: "",
    status: "",
    media: [],
    file: null,
    targetDate: "",
  };
  const [modalShow, setModalShow] = useState(false);
  const [noteData, setNoteData] = useState(InitState);
  const [currentActionTitle, setCurrentActionTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    console.log("new appstate", appState);
    setModalShow(appState.show);
  }, [appState]);

  useEffect(() => {
    if (props.details !== undefined) {
      let { details } = props;
      if (details.currentAction === "edit") {
        setCurrentActionTitle("Edit Note");
        if (details.activeNoteId !== "") {
          //async function
        }
      } else {
        setCurrentActionTitle("Add Note");
      }
    }
  }, [props]);

  const closeModal = () => {
    let state = false;
    if (isEditing) {
      if (window.confirm("Are you sure ?")) {
        state = true;
      } else {
        return;
      }
    } else {
      state = true;
    }
    if (state) {
      let temp = { ...appState };
      temp.activeNoteId = "";
      temp.show = false;
      temp.currentAction = "";
      setNoteData(InitState);
      setAppState(temp);
    }
  };
  const onSubmission = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', e.target.value);

    console.log("final_____", noteData, data);
    if (currentActionTitle === "Edit note") {
      //update note //async function

    } else {
      //create note//async function
      // fetch('/api/tasks/saveTask',{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
      // })
    }
  };
  const handleNoteChanges = (key, value) => {
    if (!isEditing) {
      setIsEditing(true);
    }
    if (key == "file") {
      setNoteData({ ...noteData, [key]: value.files[0] })
      console.log("File Data :->", value.files[0])
    } else {
      setNoteData({ ...noteData, [key]: value });
    }

  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", noteData.file);
    console.log("Form Data :->", formData)
  }
  return (
    <div
      className={`${ModalStyles.modal} ${modalShow ? ModalStyles.show : null}`}
    >
      <div className={ModalStyles.modalBox}>
        <div className="d-flex justify-content-between align-items-center p-3">
          <h4 className={ModalStyles.title}>{currentActionTitle}</h4>
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={closeModal}
          />
        </div>
        <div className="container">
          <form className="was-validated" encType="multipart/form-data" onSubmit={(e) => onSubmission(e)}>
            <div className="form-group">
              <label htmlFor="noteTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="noteTitle"
                placeholder="Enter title"
                name="noteTitle"
                value={noteData.title}
                onChange={(e) => handleNoteChanges("title", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="noteDescription">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="noteDescription"
                placeholder="Enter description"
                name="noteDescription"
                value={noteData.description}
                onChange={(e) =>
                  handleNoteChanges("description", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="noteMedia">Add files</label>
              <input
                type="file"
                className="form-control"
                id="noteMedia"
                name="noteMedia"
                onChange={(e) =>
                  handleNoteChanges("file", e.target)
                }
                required
              />
              <button onClick={() => onFileUpload()}>
                Upload!
                </button>
            </div>
            <div className="form-group">
              <label htmlFor="noteTargetDate">Target Date</label>
              <input
                type="date"
                className="form-control"
                id="noteTargetDate"
                placeholder="select date"
                name="noteTargetDate"
                value={noteData.targetDate}
                onChange={(e) =>
                  handleNoteChanges("targetDate", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="noteStatus">Status</label>
              <select
                className="form-control"
                id="noteStatus"
                name="noteStatus"
                required
                value={noteData.status}
                onChange={(e) => handleNoteChanges("status", e.target.value)}
              >
                <option value="Todo">To do</option>
                <option value="In-Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mx-2">
                Submit
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
