import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

class Main extends Component {
  render() {
    return (
      <>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="sectors">Sectors:</label>
          <select id="sectors" name="sectors">
            <option value=""></option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>

          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" required />
            Agree to terms
          </label>

          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
