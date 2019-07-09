import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Button from "./components/Button";
import Scene from "./components/Scene";
import RocketIcon from "./components/RocketIcon";
import { getRandomRGB } from "./utils";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ROCKET":
      return {
        ...state,
        rockets: [...state.rockets, state.rockets.length + 1]
      };
    case "REMOVE_ROCKET":
      const rockets = [...state.rockets];
      rockets.pop();
      return {
        ...state,
        rockets
      };

    case "TOGGLE_NIGHT_MODE":
      return {
        ...state,
        nightMode: !state.nightMode
      };
    default:
      return state;
  }
};

const initialState = {
  rockets: [1],
  nightMode: true
};

const MainContext = React.createContext();

function Rocket() {
  const [color, changeColor] = useState(getRandomRGB());
  return (
    <RocketIcon
      data-testid="Rocket"
      onClick={() => {
        console.log("click");
        changeColor(getRandomRGB());
      }}
      style={{ fill: color }}
    />
  );
}

function RocketStation() {
  const {
    rockets,
    addRocket,
    removeRocket,
    toggleNightMode,
    nightMode
  } = useContext(MainContext);
  return (
    <div className="App">
      <Scene nightMode={nightMode}>
        {rockets.map(id => (
          <Rocket key={id} />
        ))}
      </Scene>
      <div className="actions">
        <Button
          variant={"success"}
          onClick={addRocket}
          disabled={rockets.length === 4}
        >
          Add rocket
        </Button>
        <Button
          variant={"danger"}
          onClick={removeRocket}
          disabled={rockets.length === 1}
        >
          Remove rocket
        </Button>
        <Button
          data-testid="LightModeBtn"
          variant={"navy"}
          onClick={toggleNightMode}
        >
          {`Night mode: ${nightMode ? "OFF" : "ON"}`}
        </Button>
      </div>
    </div>
  );
}

const Main = RocketStation;
export default Main;

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider
      value={{
        rockets: state.rockets,
        nightMode: state.nightMode,
        addRocket: () => dispatch({ type: "ADD_ROCKET" }),
        removeRocket: () => dispatch({ type: "REMOVE_ROCKET" }),
        toggleNightMode: () => dispatch({ type: "TOGGLE_NIGHT_MODE" })
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement || document.createElement("div"));
