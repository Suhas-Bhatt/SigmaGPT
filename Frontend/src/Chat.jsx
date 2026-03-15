import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply, setPrompt } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  const suggestions = [
    { title: "Quantum Computing Basics", icon: "fa-atom" },
    { title: "Plan a Tokyo Itinerary", icon: "fa-compass" },
    { title: "Ghost Story Prototype", icon: "fa-ghost" },
    { title: "Study Schedule Helper", icon: "fa-graduation-cap" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 py-6 lg:py-12">
      {newChat && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-1000">
          <div className="w-24 h-24 rounded-[32px] premium-gradient flex items-center justify-center shadow-[0_20px_60px_rgba(59,130,246,0.25)] mb-10 rotate-6 hover:rotate-0 transition-all duration-700">
             <i className="fa-solid fa-atom text-4xl text-white"></i>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 text-center tracking-tighter">
            Sigma<span className="text-brand-primary">GPT</span>
          </h1>
          <p className="text-text-dim-secondary text-center max-w-lg mb-14 text-base lg:text-lg font-bold leading-relaxed opacity-80">
            Precision AI for the creative mind. <br className="hidden sm:block" />
            Designed for deep focus in absolute black.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl px-6">
            {suggestions.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setPrompt(item.title)}
                className="flex items-center gap-5 p-5 rounded-[24px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 active:scale-95 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-500 shadow-inner">
                  <i className={`fa-solid ${item.icon} text-brand-primary group-hover:text-white`}></i>
                </div>
                <span className="text-sm font-black text-white/70 group-hover:text-white truncate tracking-tight">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-12 w-full px-6">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={`flex w-full ${chat.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-700`}
            key={idx}
          >
            <div className={`
              max-w-[90%] lg:max-w-[85%] rounded-[28px] text-[16px] leading-[1.6]
              ${chat.role === "user" 
                ? "bg-white/[0.05] text-white px-7 py-5 border border-white/10 shadow-2xl font-bold tracking-tight" 
                : "text-text-dim-secondary"}
            `}>
              {chat.role === "user" ? (
                <p className="whitespace-pre-wrap">{chat.content}</p>
              ) : (
                <div className="prose prose-invert max-w-none">
                   <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.05] flex items-center justify-center shrink-0 border border-white/10 shadow-xl mt-1 ring-1 ring-white/5">
                        <i className="fa-solid fa-bolt-lightning text-sm text-brand-primary shadow-[0_0_10px_#3b82f6]"></i>
                      </div>
                      <div className="flex-1 overflow-hidden pt-1">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                          {chat.content}
                        </ReactMarkdown>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {prevChats.length > 0 && (
          <div className={`flex w-full justify-start animate-in fade-in duration-700`}>
             <div className="max-w-[90%] lg:max-w-[85%] rounded-[28px] text-[16px] leading-[1.6] text-text-dim-secondary w-full">
                <div className="prose prose-invert max-w-none">
                   <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(59,130,246,0.3)] ring-4 ring-brand-primary/10 mt-1">
                        <i className="fa-solid fa-bolt-lightning text-sm text-white"></i>
                      </div>
                      <div className="flex-1 overflow-hidden pt-1">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                          {latestReply === null ? prevChats[prevChats.length - 1].content : latestReply}
                        </ReactMarkdown>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
