import React from "react";
import { useUrlStore } from "../../stores/urlStore.js";

const URLList = () => {
  const {listOfUrls} = useUrlStore();

  return (
    <div>
      {listOfUrls.length == 0 ? <p>No URLs found</p> : null}
      {listOfUrls.map((elem, index) => {
        return (
          <div className="p-2 flex justify-around" key={index}>
            <p>{elem.originalUrl}</p>
            <a
              href={`http://localhost:8080/v1/${elem.uniqueId}`}
              target="_blank"
            >
              {elem.uniqueId}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default URLList;
