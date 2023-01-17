import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

class Main extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    let options = JSON.parse(localStorage.getItem("options"));
    fetch('http://localhost:8080/options').then(res=>res.json()).then(data=>{
      this.setState({ options: data?.result });
    })
  }

  render() {
    const { options } = this.state;
    return (
      <>
        <form>
          <h1>Form</h1>
          <p>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </p>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="sectors">Sectors:</label>

          <select id="sectors" name="sectors" multiple size={5}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option?.text}
              </option>
            ))}
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
