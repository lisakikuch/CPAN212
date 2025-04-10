import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Make a fetch function
  const fetchData = async () => {

    try {

      const response = await fetch(`http://localhost:8000/data`);
      
      // Turn the data in JSON formated into JavaScript Object 
      const data = await response.json();

      setMessage(JSON.stringify(data));

    } catch (error) {

      console.log(error);

    };

  };

  const loginForm = async (event) => {
    event.preventDefault();

    const submission = { email, password };

    try {

      const response = await fetch(`http://localhost:8000/login`, {
        // HTTP request is a GET method by default
        method: "POST",
        // Lets it know that the content include json format data
        headers: { "Content-Type": "application/json" },
        // Converts the submission object into a JSON string
        // includes it in the body of the request.
        body: JSON.stringify(submission)
      });

      const data = await response.json();
      setMessage(JSON.stringify(data));

    } catch (error) {

      console.log(error);

    };

  };

  return (
    <div>
      {message}
      <button onClick={fetchData}>Click me for Data</button>

      <form onSubmit={loginForm}>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          required
        />

        <button type="submit">Login</button>
      </form>

    </div>
  )
};

export default App;