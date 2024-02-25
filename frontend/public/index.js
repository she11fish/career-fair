import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "game/Build/Build.loader.js",
    dataUrl: "game/Build.data",
    frameworkUrl: "game/Build.framework.js",
    codeUrl: "game/Build.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default UnityGame;
