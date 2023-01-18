import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from 'axios';

class Main extends Component {
  state = {
    options: [],
    name: "",
    termsAgree: false,
    selectedOptions: [],
  };

  componentDidMount() {
    // get that users info by name
    const usersName = JSON.parse(sessionStorage.getItem("name"));
    axios.get(`https://form-task-server.onrender.com/usersname/${usersName}`).then(data=>{
      const { name, termsAgree, newSelectedOptions:selectedOptions  } = data?.data?.result;
      this.setState({name, termsAgree, selectedOptions})
    }).catch(err=>console.log({getUserInfoErr: err}))
    
    // load options from own db
    axios.get('https://form-task-server.onrender.com/options').then(data=>{
      this.setState({options: data.data.result});
    }).catch(err=>console.log({err}))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, termsAgree, selectedOptions } = this.state;
    const newSelectedOptions = selectedOptions.map((option) => option?.value);
    if(newSelectedOptions.length < 1){
      return;
    }
    //user inputs data post in db
    axios.post('https://form-task-server.onrender.com/userdata', {newSelectedOptions, termsAgree, name})
    .then((res)=> {
      if(res.status === 200){
        sessionStorage.setItem('name', JSON.stringify(name));
        let message;
        if(res.data.message.lastErrorObject.updatedExisting){
          message = 'Updated'
        }else {
          message = 'Inserted'
        }
        alert(`Congrates ${name}! Your Data is ${message}`);
      };
    }).catch((err)=> {
      console.log({err});
    });
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
