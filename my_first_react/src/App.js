import Nav from "./Nav";
import Comment from "./Comment";
import { getComments } from "./getdata";

export default function App() {
  const comments = getComments(10);
  return (
    <>
      <Nav />
      <input type="number" min={5} style={{ border: "3px solid" }} />
      <h2>{Date().toString()}</h2>
      <div class="ui comments">
        <h3 class="ui dividing header">Comments</h3>
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </>
  );
}
