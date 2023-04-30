import React from "react";
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";
 
const iframeConfig: IframeConfig = {
    roomUrl: "https://iframe.huddle01.com/ftd-tedx-xnp",
    height: "600px",
    width: "100%",
    noBorder: false, // false by default
};
 
export default function Meeting() {
    return (
        <div>
            <HuddleIframe config={iframeConfig} />
        </div>
    );
}
 