import { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

interface LocationState {
  url: string;
  slug: string;
  ttl: number;
}

export const SuccessPage = ({ location }: RouteComponentProps) => {
  const history = useHistory();
  const { url, slug } = location.state as LocationState;

  const slugURL = `https://472.se/${slug}`;

  const [copyText, setCopyText] = useState<string>("Copy to Clipboard");

  return (
    <div className="text-gray-700">
      <label className="block text-xl font-medium text-gray-700 mt-4">
        Your Shortened URL
      </label>
      <div className="flex mr-4 my-2 pl-5 pr-3 py-3 focus:ring text-gray-700 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm border border-gray-300 rounded-md">
        <input
          className="flex-1 outline-none text-xl"
          onFocus={(e) => e.target.select()}
          value={slugURL}
          readOnly={true}
        />
        <button
          className="flex text-white bg-teal-500 rounded-md p-2"
          onClick={() => {
            navigator.clipboard.writeText(slugURL);
            setCopyText("Copied!");
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <div className="ml-2">{copyText}</div>
        </button>
      </div>
      <button
        className="w-full text-white flex justify-center px-4 py-3 mt-6 border font-bold disabled:bg-gray-500 disabled:cursor-not-allowed text-lg border-transparent shadow-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={() => history.push("/")}
      >
        New URL
      </button>
    </div>
  );
};
