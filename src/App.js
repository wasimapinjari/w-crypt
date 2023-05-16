import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [navOpenState, setNavOpenState] = useState(false);
  useEffect(() => {
    console.log(navOpenState);
  }, [navOpenState]);

  const navStateChange = () => {
    setNavOpenState((prevValue) => !prevValue);
  };
  return (
    <div className="react-container">
      <Header navOpenState={navOpenState} navStateChange={navStateChange} />
      <Main navOpenState={navOpenState} />
    </div>
  );
}

export default App;
