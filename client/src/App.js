import React, { useState, useEffect, createContext } from "react";
import Note from "./Components/Note/noteIndex";
import Modal from "./Components/modal/modal";
import styles from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const AppContext = createContext();

function App() {
  const [noteList, setNoteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationValue, setPaginationValue] = useState(20);
  const [appState, setAppState] = useState({
    currentAction: "",
    activeNoteId: "",
    show: false,
    selectedNotes: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (isSearching) {
      let stored = JSON.parse(localStorage.getItem("notesList"));
      let filtered = [];
      if (searchInput.trim() !== "") {
        if (stored.length > 0) {
          stored.forEach((note) => {
            if (String(note.title).search(searchInput) > -1) {
              filtered.push(note);
            }
          });
          console.log("filtered", filtered);
          setNoteList(filtered);
        }
      } else {
        setNoteList(stored);
      }
      setIsSearching(false);
    }
  }, [isSearching, searchInput, noteList]);

  const handleSearch = (value) => {
    if (!isSearching) {
      setIsSearching(true);
    }
    setSearchInput(value);
  };

  const addNote = () => {
    let temp = { ...appState };
    temp.show = true;
    temp.currentAction = "add";
    setAppState(temp);
  };
  const removeSelectedNotes = () => {
    //remove selected
    //below process is temporary, here we will make API call to delete selected
    console.log("hit", appState.selectedNotes);
    if (appState.selectedNotes.length > 0) {
      let selected = [...appState.selectedNotes];
      let deleteCounts = 0;
      let current = [...noteList];
      selected.forEach((id) => {
        current.forEach((note, index) => {
          if (note._id === id) {
            current.splice(index, 1);
            deleteCounts++;
            return;
          }
        });
      });
      setNoteList(current);
      if (deleteCounts === selected.length) {
        setAppState({ ...appState, selectedNotes: [] });
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    //async function
    const mock = [
      {
        _id: "#93487539845438567567",
        title: "first note somethings",
        description: "doijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgf",
        lastModified: "Oct-25",
        status: "Done",
        media: [1, 2, 3],
        targetDate: "",
      },
      {
        _id: "#9348753asd3454354",
        title: "second notasdasdasdasdasasasde somethings",
        description:
          "doijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgfdoijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgfdoijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgfdoijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgf",
        lastModified: "Oct-25",
        status: "Todo",
        media: [1, 2, 3],
        targetDate: "",
      },
      {
        _id: "#87539845435487539845",
        title: "third note somethings",
        description: "doijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgf",
        lastModified: "Oct-25",
        status: "In-Progress",
        media: [],
        targetDate: "",
      },
    ];
    setTimeout(() => {
      setNoteList(mock);
      localStorage.setItem("notesList", JSON.stringify(mock));
      setIsLoading(false);
    }, 1000);
  }, []);
  //Below is temp and need to make api call
  useEffect(() => {
    if (appState.activeNoteId !== "" && appState.currentAction === "delete") {
      let newList = noteList.filter(
        (note) => note._id !== appState.activeNoteId
      );
      setNoteList(newList);
      setAppState({ ...appState, activeNoteId: "", currentAction: "" });
    }
  }, [appState, noteList]);
  return (
    <AppContext.Provider value={[appState, setAppState]}>
      <div className={styles.parent}>
        <nav className="d-flex justify-content-between align-items-center px-4 py-3">
          <div className={styles.leftNav}>
            <h2>To-Do</h2>
            <div className="d-flex ml-3">
              <input
                type="text"
                placeholder="search"
                className={styles.searchInput}
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className={styles.addNoteBtn} onClick={addNote}>
                Add
              </button>
              <button
                className={styles.deleteNoteBtn}
                onClick={removeSelectedNotes}
                disabled={!appState.selectedNotes.length > 0}
              >
                Delete
              </button>
            </div>
          </div>
          <div className={styles.rightNav}>
            <label>
              Pagination
              <input
                type="number"
                className={styles.paginationInput}
                value={paginationValue}
                onChange={(e) => setPaginationValue(e.target.value)}
              />
            </label>

            <p className="mx-1">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Prev
            </p>
            <p className="mx-1">
              Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </p>
          </div>
        </nav>
        <main className={styles.main}>
          <section className={styles.notesWrapper}>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : !isLoading && noteList.length > 0 ? (
              noteList.map((note, index) => {
                return <Note data={note} key={index + note._id} />;
              })
            ) : (
              <h3>No data</h3>
            )}
          </section>
        </main>
        {appState.show && <Modal details={appState} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
