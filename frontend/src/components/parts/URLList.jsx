import React, { useEffect } from "react";
import { useUrlStore } from "../../stores/urlStore.js";

const URLList = () => {
  const {listOfUrls, fetchUrls} = useUrlStore();
  const URI = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    fetchUrls();
  }, [listOfUrls])
  if (!listOfUrls || listOfUrls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }
  return (
    <div className="mt-4 px-4 bg-white overflow-y-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left">Original URL</th>
            <th className="px-6 py-4 text-left">Short URL</th>
          </tr>
        </thead>
      <tbody>
      {listOfUrls.map((elem, index) => {
        return (
            <tr key={index}>
              <td className="text-sm px-6 py-4">{elem.originalUrl}</td>
              <td><a href={`${URI}/v1/${elem.uniqueId}`} target="_blank" className="text-blue-500 text-sm">{`${URI}/${elem.uniqueId}`}</a></td>
            </tr>
        );
      })}
      </tbody>
      </table>
    </div>
  );
};

export default URLList;
