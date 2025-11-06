import React, { use, useEffect, useState } from "react";
import styles from "../MagicFetcher/MagicFetcher.module.css";

const MagicFetcher = () => {
  const [message, setMessage] = useState("Waiting for magic...");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    const API_URL = "http://localhost/Magic_api.php";

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setItems(data.list);
        setStatus(data.status);
        setTimestamp(data.timestamp);
        console.log("Magic Sucsess!");
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("oops! connection error");
      });
  }, []);
  return (
    <div className={styles.magic}>
      <h1 className="font-bold p-10">Magic Data Viewer</h1>
      <p>
        Status: {status} <br /> <span>{message}</span>
      </p>

      {items.length > 0 && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <h1>Time: {timestamp}</h1>
    </div>
  );
};

export default MagicFetcher;
