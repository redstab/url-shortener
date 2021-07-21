import React from "react";
import { useState } from "react";

export const LongURLInput = () => {
  const [url, setUrl] = useState<string>("");

  return (
    <form className="flex flex-col">
      <label className="block text-lg font-medium text-gray-700">
        Long URL
      </label>
      <input
        type="text"
        className="mr-4 my-2 px-5 py-3 outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm border border-gray-300 rounded-md"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <label className="block text-lg font-medium text-gray-700 mt-3">
        Customize URL
      </label>
      <div className="my-2 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-5 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
          472.se
        </span>
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="focus:ring outline-none focus:ring-teal-500 focus:border-teal-500 border flex-1 py-3 px-4 block w-full rounded-none rounded-r-md border-gray-300"
          placeholder="slug"
        />
      </div>

      <button
        className="px-4 py-3 mt-5 border font-bold text-lg border-transparent shadow-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={() => alert(url)}
      >
        Shorten
      </button>
    </form>
  );
};
