import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export const EditFileds = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Predefined Value");
  useEffect(() => {
    fetch(`http://localhost:8080/orgs/${location.state.companyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInputValue(data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <div>
        <label> Company Name: </label>
        {location.state.companyName}
      </div>
      <br />
      <div>
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
      <div>
        <button
          style={{ marginTop: 10 }}
          onClick={async () => {
            console.log(inputValue);
            await fetch(
              "http://localhost:8080/orgs/" + location.state.companyName,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValue),
              }
            );
            navigate("/");
            // console.log("Edited Org info");
          }}
        >
          Edit Fields
        </button>
      </div>
    </div>
  );
};
