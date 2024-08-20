import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const TemplateScreen = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const [cols, setCols] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/template/${location.state.companyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch(`http://localhost:8080/orgs/${location.state.companyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCols(data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: 10,
        }}
      >
        <button
          onClick={() => {
            navigate("/add-user", {
              state: { companyName: location.state.companyName },
            });
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", paddingBottom: 10 }}
      >
        {cols.map((col, j) => (
          <div
            key={j}
            style={{
              width: "10%",
              backgroundColor: "skyblue",
              marginLeft: 10,
              paddingLeft: 10,
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {users.map((user, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {cols.map((col, j) => (
            <div
              key={j}
              style={{
                marginLeft: 10,
                paddingLeft: 10,
                width: "10%",
                backgroundColor: "black",
                color: "white",
              }}
            >
              {user[col]}
            </div>
          ))}
        </div>
      ))}

      <br />
    </div>
  );
};
