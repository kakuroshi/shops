import cl from "./App.module.css"
import Header from "./Components/Header/Js/Header";
import Menu from "./Components/Menu/Js/Menu";
import Main from "./Components/Main/Js/Main";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <main className={cl.app}>
        <Header />
        <div className={cl.main}>
          <Menu />
          <Main />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;