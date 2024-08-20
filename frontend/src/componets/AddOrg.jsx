import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddOrg = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [fields, setFields] = useState([]);
  let data = {};

  return (
    <div>
      <div>
        <label> Company Name: </label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
      </div>
      <div>
        <label> Fields (Input fields separated by commas): </label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setFields(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          style={{ marginTop: 10 }}
          onClick={async () => {
            data.company = company;
            data.fields = fields.split(",");
            console.log(data);
            await fetch("http://localhost:8080/orgs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            navigate("/");
            console.log("Added Org: " + company);
          }}
        >
          Add Organization
        </button>
      </div>
    </div>
  );
};
