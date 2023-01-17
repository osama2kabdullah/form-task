import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

class Main extends Component {
  state = {
    options: [],
    name: "",
    termsAgree: false,
    selectedOptions: [],
  };

  componentDidMount() {
    let selectedOptions = JSON.parse(localStorage.getItem("options"));//load from api
    this.setState({ selectedOptions });
    
    /**
     * TODO:
     * 1. load users data from express api and remove localstorage api
     * 2. set name | termsAgree | selectedOptions
    */
    
    fetch("http://localhost:8080/options")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ options: data?.result });
      });
  }

  controledForm = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, termsAgree, selectedOptions } = this.state;
    const newSelectedOptions = selectedOptions.map((option) => option.value);
    console.log({newSelectedOptions, termsAgree, name});
    /**
     * TODO:
     * 1. hit post api with that values
    */
  };

  render() {
    const { options, name, termsAgree, selectedOptions } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>Form</h1>
          <p>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </p>
          <label htmlFor="name">Name:</label>
          <input
            onChange={(e) => this.setState({ name: e.target.value })}
            value={name}
            type="text"
            id="name"
            name="name"
            required
          />

          <label htmlFor="sectors">Sectors:</label>

          {options.length > 0 ? (
            <select
              multiple
              onChange={(e) =>
                this.setState({
                  selectedOptions: Array.from(e.target.selectedOptions),
                })
              }
              defaultValue={selectedOptions}
            >
              {options?.map((option) => (
                <option key={option._id} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          ) : (
            "..."
          )}

          <label htmlFor="terms">
            <input
              onChange={(e) => this.setState({ termsAgree: e.target.checked })}
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAgree}
            />
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
