import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DefineFields = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/orgs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrgs(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <div></div>
        <button
          onClick={() => {
            navigate("/add-org");
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ width: "7%" }}>Company</p>
        <p style={{ display: "flex", width: "10%" }}>Fields</p>
        <p style={{ width: "7%" }}>Details</p>
      </div>
      <div>
        {orgs.map((org, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "7%" }}>{org.company}</div>
              <div style={{ display: "flex", width: "10%" }}>
                {org.fields.map((field, j) => {
                  return (
                    <div key={j} style={{ paddingRight: 10 }}>
                      {field}
                    </div>
                  );
                })}
              </div>
              <button
                style={{
                  blockSize: 30,
                  backgroundColor: "green",
                  marginRight: 10,
                }}
                onClick={() => {
                  navigate("/edit-fields", {
                    state: { companyName: org.company },
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  navigate("/template-screen", {
                    state: { companyName: org.company },
                  });
                }}
                style={{ blockSize: 30, backgroundColor: "green" }}
              >
                View
              </button>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};
