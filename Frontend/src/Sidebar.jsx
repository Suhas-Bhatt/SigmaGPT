import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
    sidebarOpen,
    setSidebarOpen,
    refreshSignal
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${API_BASE_URL}/api/thread`);
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId, refreshSignal]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    setSidebarOpen(false);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${API_BASE_URL}/api/thread/${newThreadId}`
      );
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setSidebarOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${API_BASE_URL}/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      await response.json();
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );
      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-all duration-500 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`
        fixed top-0 left-0 h-screen w-80 bg-bg-dim-sidebar border-r border-border-dim flex flex-col 
        transition-all duration-500 ease-in-out z-50 
        lg:static lg:translate-x-0
        ${sidebarOpen ? "translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-5 gap-3">
          {/* New Chat Button */}
          <button
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 shadow-lg transition-all group mb-8 active:scale-[0.98]"
            onClick={createNewChat}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
                 <i className="fa-solid fa-plus text-xs text-white"></i>
              </div>
              <span className="text-sm font-black tracking-tight text-white/90">New Sigma Chat</span>
            </div>
            <i className="fa-solid fa-pen-to-square text-xs text-text-dim-muted group-hover:text-brand-primary transition-colors"></i>
          </button>

          {/* Chat History Section */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <h3 className="px-3 mb-4 text-[10px] uppercase tracking-[0.3em] font-black text-text-dim-muted flex items-center justify-between">
              <span>History</span>
              <div className="h-px flex-1 ml-4 bg-border-dim"></div>
            </h3>
            
            {/* Scrollable Container with Robust Styling */}
            <ul className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {allThreads?.map((thread, idx) => (
                <li
                  key={idx}
                  onClick={() => changeThread(thread.threadId)}
                  className={`
                    group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300
                    ${
                      thread.threadId === currThreadId
                        ? "bg-white/[0.07] text-white shadow-xl border border-white/10 ring-1 ring-white/5"
                        : "text-text-dim-secondary hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className={`w-1.5 h-1.5 rounded-full ${thread.threadId === currThreadId ? "bg-brand-primary animate-pulse" : "bg-text-dim-muted opacity-40"}`}></div>
                    <span className="truncate text-sm font-bold tracking-tight">
                      {thread.title}
                    </span>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteThread(thread.threadId);
                    }}
                  >
                    <i className="fa-solid fa-trash-can text-[11px]"></i>
                  </button>
                </li>
              ))}
              
              {allThreads.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                   <i className="fa-regular fa-folder-open text-3xl text-text-dim-muted/20 mb-3"></i>
                   <p className="text-[10px] font-black text-text-dim-muted uppercase tracking-widest">No chats yet</p>
                </div>
              )}
            </ul>
          </div>

          {/* User Section at Bottom */}
          <div className="mt-auto pt-6 border-t border-border-dim">
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-black/20 hover:bg-black/40 transition-all group border border-white/5 hover:border-white/10 hover:shadow-2xl">
              <div className="w-10 h-10 rounded-full premium-gradient flex items-center justify-center text-white shadow-xl shadow-brand-primary/10 ring-2 ring-black">
                <i className="fa-solid fa-user-astronaut text-sm"></i>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-black text-white leading-none mb-1.5 tracking-tight">Suhas Bhatt</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                  <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Pro Member</p>
                </div>
              </div>
              <i className="fa-solid fa-gear text-[11px] text-text-dim-muted group-hover:text-white rotate-0 group-hover:rotate-90 transition-all duration-500"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
