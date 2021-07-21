import React from "react";
import { LongURLInput } from "./LongURLInput";

export const Container = () => {
  return (
    <div className="w-[600px] bg-white p-8 rounded-md">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">
        URL Shortener
      </h1>
      <LongURLInput />
    </div>
  );
};
