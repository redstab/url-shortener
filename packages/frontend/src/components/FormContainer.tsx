import React, { useState } from "react";
import { UrlForm } from "./UrlForm";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { SuccessPage } from "./SuccessPage";

export const Container = () => {
  return (
    <div className="w-[600px] bg-white p-8 rounded-md h-full sm:h-auto flex flex-col justify-center sm:block">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">
        URL Shortener
      </h1>

      <Switch>
        <Route exact path="/" component={UrlForm} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" />
      </Switch>

      {/* <UrlForm /> */}
    </div>
  );
};
