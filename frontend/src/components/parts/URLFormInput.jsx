import React, { useEffect, useState } from "react";
import { useUrlStore } from "../../stores/urlStore.js";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../../stores/authStore.js";
import { Link, useNavigate } from "react-router-dom";
import URLList from './URLList.jsx';

const URLFormInput = () => {
  const navigate = useNavigate();
  const {checkAuth, authUser} = useAuthStore();
  const { isUrlGenerating, urlGeneration, fetchUrls, listOfUrls } = useUrlStore();
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      originalUrl: url,
      slug,
    };

    urlGeneration(data);
    
    setUrl("");
    setSlug("");
    await fetchUrls();
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-[200px] bg-white min-w-[315px] px-6 rounded-lg py-4">
        <h1 className="text-4xl font-bold tracking-tighter text-center mb-9">
          URL Shortener
        </h1>
        <form className="h-full flex flex-col gap-2">
          {isUrlGenerating && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <label htmlFor="url">URL: </label>
            <input
              type="text"
              placeholder="https://www.example.com"
              id="url"
              className="border border-stone-400 rounded-lg p-2 outline-none text-stone-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="slug">Slug: </label>
            <input
              type="text"
              placeholder="Enter a custom name.. "
              id="slug"
              className="border border-stone-400 rounded-lg p-2 outline-none text-stone-500"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 rounded-lg text-white tracking-tighter font-semibold cursor-pointer"
              onClick={(e) => submitHandler(e)}
            >
              Shorten URL
            </button>
          </div>
        </form>
        <URLList />
      </div>
    </>
  );
};

export default URLFormInput;
