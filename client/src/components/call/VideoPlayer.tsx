/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';
const socket = io(CONNECTION_PORT, { transports : ['websocket'] });

const VideoPlayer = () => {

  const [idToCall, setIdToCall] = useState('');
  // TO-DO fix typescript any
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState('');
console.log(me)
  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream: any) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => {
      console.log("socket id", id);
      setMe(id)
    });

    socket.on('callUser', ({ from, signal }) => {
      setCall({ isReceivingCall: true, from, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    //when a signal happens, we get a data
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me});
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <div className="call__right-box">
        {stream && (
          <video className="video--me" playsInline muted ref={myVideo} autoPlay/>
        )}
        <div className="call__right-box--options">
        <CopyToClipboard text={me} >
          <div className="btn btn--clear">
            <span className="before-icon">Copy Your ID</span>
            <FaCopy/>
          </div>
        </CopyToClipboard>

            <input type="text" placeholder="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} className="text-input text-input--blue"/>
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall} className="btn btn--blue" >
                Leave call
              </button>
            ) : (
              <button  onClick={() => callUser(idToCall)} className="btn btn--blue">
                Call
              </button>
            )}
        {call.isReceivingCall && !callAccepted && (
            <button type="button" className="btn btn--blue" onClick={answerCall}>
              Answer this call
            </button>
        )}
        </div>
            
        {callAccepted && !callEnded && (
          <video className="video--other" playsInline ref={userVideo} autoPlay/>
        )}
  </div>
  );
};

export default VideoPlayer;
