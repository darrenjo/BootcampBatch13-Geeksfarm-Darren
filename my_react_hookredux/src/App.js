// import logo from "./logo.svg";
import "./App.css";
import Home from "./pages";
import About from "./pages/about";
import Contact from "./pages/contact";
import Navbar from "./navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router";
// import { Provider } from "react-redux";
// import Counter from "./ReduxApp/counter";
// import store from "./ReduxApp/store";
import FormComponent from "./ReduxApp/hookForm";

function App() {
  return (
    <Router>
      <Navbar />
      <FormComponent />
      {/* <Provider store={store}>
        <Counter />
      </Provider> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
