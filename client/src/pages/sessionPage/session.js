import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

import "../../css/Editor.css";
import firebase from "firebase";
import Result from "./result";

const socket = io.connect("http://localhost:8000");

const Editor = () => {
  const [data, setData] = useState("");
  const [padRef, setPadRef] = useState("");
  const [self, setSelf] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVid = useRef();
  const peerVid = useRef();
  const callRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVid.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setSelf(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: self,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      peerVid.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    callRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      peerVid.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    callRef.current = peer;
  };

  const endCall = () => {
    setCallEnded(true);
    callRef.current.destroy();
  };

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
      const resp = await axios.post(
        "https://awancors.herokuapp.com/https://api.jdoodle.com/v1/execute",
        code
      );
      console.log(resp.data.output);
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
          <div className="vid">
            {stream && <video playsInline muted ref={myVid} autoPlay />}
          </div>
          <div className="vid">
            {callAccepted && !callEnded ? (
              <video playsInline ref={peerVid} autoPlay />
            ) : null}
          </div>
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
