import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import {useState} from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const [newChat,setNewChat]=useState(true);
  const [allThreads,setAllThreads]=useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0); // Signal to refresh sidebar
 
  const providerValues={
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    prevChats,setPrevChats,
    newChat,setNewChat,
    allThreads,setAllThreads,
    sidebarOpen, setSidebarOpen,
    refreshSignal, setRefreshSignal
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-dim-main font-sans text-text-dim-primary">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
