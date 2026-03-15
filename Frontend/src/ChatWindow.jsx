import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
    setSidebarOpen,
    setRefreshSignal
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setNewChat(false);
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${API_BASE_URL}/api/chat`, options);
      const res = await response.json();
      setReply(res.reply);
      // Trigger sidebar refresh for instant sorting
      setRefreshSignal(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
      setPrompt("");
    }
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex-1 flex flex-col h-screen overflow-hidden bg-bg-dim-main">
      {/* Absolute Black Header */}
      <header className="flex items-center justify-between px-8 py-6 z-30 bg-black/90 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="flex items-center gap-5">
          <button 
            className="lg:hidden p-2.5 rounded-2xl hover:bg-white/5 transition-all text-white/50 hover:text-white active:scale-90"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
          
          <div className="flex items-center gap-4 bg-white/[0.03] px-5 py-2.5 rounded-2xl border border-white/[0.05] shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_10px_#3b82f6]"></div>
            <span className="text-xl font-black text-white tracking-tighter">SigmaGPT</span>
            <span className="text-[10px] h-fit px-2 py-0.5 rounded-lg bg-white/10 text-white/80 font-black uppercase tracking-widest border border-white/5">Lab</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="hidden sm:flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] shadow-xl transition-all text-xs font-black text-white/70 active:scale-95 group">
             <i className="fa-solid fa-square-rss text-brand-primary group-hover:scale-110 transition-transform"></i>
             <span>Research Mode</span>
          </button>
          
          <div className="relative">
            <button 
              className="w-12 h-12 rounded-[20px] bg-white/[0.05] p-1 shadow-2xl border border-white/10 hover:border-white/20 transition-all group overflow-hidden active:scale-95"
              onClick={handleProfileClick}
            >
              <div className="w-full h-full rounded-[16px] premium-gradient flex items-center justify-center text-white shadow-xl shadow-brand-primary/20">
                <i className="fa-solid fa-user-ninja text-lg"></i>
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-6 w-72 bg-[#1a1a1a] border border-white/[0.08] rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-3 z-[60] animate-in fade-in slide-in-from-top-6 duration-500 ring-1 ring-white/5">
                <div className="px-6 py-5 border-b border-white/5 mb-2">
                  <p className="text-[10px] font-black text-text-dim-muted uppercase tracking-[0.4em] mb-2 text-brand-primary">Authorized User</p>
                  <p className="text-base font-black text-white tracking-tight">Suhas Bhatt</p>
                  <p className="text-xs text-text-dim-secondary truncate opacity-60">Architect • suhas@sigma.dev</p>
                </div>
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.04] rounded-2xl transition-all text-white/70 text-sm font-black group">
                    <i className="fa-solid fa-shuttle-space w-5 opacity-40 group-hover:text-brand-primary group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                    <span>System Analytics</span>
                  </button>
                  <button className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.04] rounded-2xl transition-all text-white/70 text-sm font-black group">
                    <i className="fa-solid fa-diamond-half-stroke w-5 opacity-40 group-hover:text-brand-secondary group-hover:opacity-100 transition-all"></i>
                    <span>UI Customization</span>
                  </button>
                </div>
                <div className="pt-2 mt-2 border-t border-white/5">
                  <button className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-red-500/10 rounded-2xl transition-all text-red-400 text-sm font-black active:scale-95">
                    <i className="fa-solid fa-power-off w-5"></i>
                    <span>Terminate Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Absolute Black Chat Container */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar scroll-smooth bg-black">
        <Chat />
        {loading && (
          <div className="flex justify-center py-16 animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-8 bg-white/[0.02] p-10 rounded-[40px] border border-white/[0.03]">
               <ScaleLoader color="#3b82f6" loading={loading} radius={8} width={4} height={40} margin={4} />
               <p className="text-[11px] font-black text-brand-primary uppercase tracking-[0.5em] animate-pulse">Computing Inference</p>
            </div>
          </div>
        )}
      </main>

      {/* Ultra-Premium Floating Input */}
      <footer className="w-full px-8 pb-12 pt-4 bg-gradient-to-t from-black via-black to-transparent z-40">
        <div className="max-w-3xl mx-auto relative group">
          <div className="bg-[#0f0f0f] border-2 border-white/10 rounded-[36px] p-3 flex items-end shadow-[0_0_100px_rgba(0,0,0,0.5)] group-focus-within:border-brand-primary/50 group-focus-within:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-700 ring-4 ring-transparent group-focus-within:ring-brand-primary/5">
            <textarea
              rows="1"
              placeholder="Inject command..."
              className="w-full bg-transparent border-none focus:ring-0 py-3.5 pl-6 pr-16 text-white placeholder-white/20 text-[17px] resize-none max-h-56 custom-scrollbar leading-[1.6] font-bold tracking-tight"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = 'inherit';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  getReply();
                }
              }}
            />
            <button 
              id="submit"
              disabled={!prompt.trim() || loading}
              className={`
                absolute right-5 bottom-5 w-12 h-12 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-2xl
                ${prompt.trim() && !loading 
                  ? "bg-brand-primary text-white hover:scale-110 active:scale-90 shadow-brand-primary/30" 
                  : "bg-white/5 text-white/10 cursor-not-allowed"}
              `}
              onClick={() => {
                if(prompt.trim() && !loading) getReply();
              }}
            >
               {loading ? (
                 <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
               ) : (
                 <i className="fa-solid fa-arrow-up text-lg"></i>
               )}
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] text-white/20 font-black uppercase tracking-[0.3em] px-6">
            <div className="flex items-center gap-2 group cursor-help">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
              <span className="group-hover:text-brand-primary transition-colors">Engine: GPT-4o-Mini</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-green-500/50"></i>
              <span>Encryption Active</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-microchip text-amber-500/50"></i>
              <span>v5.0-Dim</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;
