import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Editor.css";
import firebase from "firebase";
import Result from "./result";

const Editor = () => {
  const [data, setData] = useState("");
  const [padRef, setPadRef] = useState("");

  //event handlers
  const compileHandler = async (e) => {
    e.preventDefault();
    let code = {
      script: `${padRef.getText()}`,
      language: "nodejs",
      versionIndex: "0",
      clientId: "d8b6df6465e09a5bffa879c9aed5e851",
      clientSecret:
        "5bdb052b7d6d3f0a4f7e0a4aec36d9f53dbe503c46b6eff113cb53fc06e1246a",
    };

    try {
      const resp = await axios.post("https://api.jdoodle.com/v1/execute", code);
      // console.log(resp.data.output);
      setData(resp.data.output);
    } catch (err) {
      // Handle Error Here`
      console.error(err);
    }
  };
  const getExampleRef = () => {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, "");
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + "#" + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== "undefined") {
      console.log("Firebase data: ", ref.toString());
    }
    return ref;
  };

  useEffect(() => {
    var config = {
      apiKey: "AIzaSyBiQZwfqKK3vZMR9bmt0bDryBGn05h5qT4",
      authDomain: "studybuddy-f3630.firebaseapp.com",
      projectId: "studybuddy-f3630",
      storageBucket: "studybuddy-f3630.appspot.com",
      messagingSenderId: "3997630289",
      appId: "1:3997630289:web:d364d51b5bf3e52fca1d70",
      measurementId: "G-DJ43QC0W8H",
    };
    firebase.initializeApp(config);
    var firepadRef = getExampleRef();
    var codeMirror = window.CodeMirror(
      document.getElementById("firepad-container"),
      { lineWrapping: true, mode: "javascript" }
    );
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      defaultText:
        '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}',
    });
    setPadRef(firepad);

    firepad.on("ready", function () {
      console.log(firepad.getText());
    });
  }, []);

  return (
    <div className="body">
      <div className="top-section">
        <div id="firepad-container"></div>
        <div className="video-chat">
          <div className="vid"></div>
          <div className="vid"></div>
        </div>
      </div>
      <div className="middle-section">
        <button className="compile-btn" onClick={compileHandler}>
          compile
        </button>
        <button className="end-call-btn">End Session</button>
      </div>
      <div className="bottom-section">
        <Result data={data} />
      </div>
    </div>
  );
};

export default Editor;
