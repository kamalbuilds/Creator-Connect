import React, { useEffect, useRef, useState } from "react";

import { Audio, Video } from "@huddle01/react/components";

import { usePeers , useVideo } from "@huddle01/react/hooks";
import { useRecorder } from "@huddle01/react/app-utils";
import { useRouter } from "next/router";
import { useEventListener, useHuddle01 } from "@huddle01/react";
const App = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState(router.query.roomId?.toString() || "");

  const { peers } = usePeers();

  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();

  useEffect(() => {
    setRoomId(router.query.roomId?.toString() || "");
  }, [router.query.roomId?.toString()]);

  useRecorder(roomId, process.env.NEXT_PUBLIC_PROJECT_ID || "");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  return (
    <div className="grid grid-cols-2">
      <video ref={videoRef} autoPlay muted></video>
      <div>
        Peers:
        <div className="grid grid-cols-4">
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <Video
                key={peer.peerId}
                peerId={peer.peerId}
                track={peer.cam}
                // debug
              />
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
