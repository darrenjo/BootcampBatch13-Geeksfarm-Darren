import Nav from "./Nav";

export default function App() {
  return (
    <>
      <Nav />
      <input type="number" min={5} style={{ border: "3px solid" }} />
      <h2>{Date().toString()}</h2>
    </>
  );
}
