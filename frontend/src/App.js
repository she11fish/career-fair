import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data.gz",
    frameworkUrl: "Build/Build.framework.js.gz",
    codeUrl: "Build/Build.wasm.gz",
  });

  return <Unity unityProvider={unityProvider} />;
}

function App() {
  return (
    <div className="App">
      <h1>Unity Game in React</h1>
      <UnityGame> </UnityGame>
    </div>
  );
}

export default App;
