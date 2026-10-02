import { useState } from "react";
import {
  Download,
  Upload,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Video,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  Send,
  Paperclip,
} from "lucide-react";

interface ClientPortalProps {
  onNavigate: (page: string) => void;
}

export function ClientPortal({
  onNavigate,
}: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [message, setMessage] = useState("");

  const projectInfo = {
    name: "Corporate Clash - Enterprise Launch",
    client: "TechCorp Inc.",
    status: "In Progress",
    progress: 75,
    startDate: "Nov 1, 2025",
    deadline: "Dec 15, 2025",
    totalCost: "$15,000 CAD",
    paid: "$7,500 CAD",
    remaining: "$7,500 CAD",
  };

  const milestones = [
    {
      title: "Discovery & Planning",
      status: "completed",
      date: "Nov 5, 2025",
      description:
        "Initial requirements gathering and project scope definition",
    },
    {
      title: "Design Phase",
      status: "completed",
      date: "Nov 18, 2025",
      description: "UI/UX design mockups and brand integration",
    },
    {
      title: "Development Sprint 1",
      status: "in-progress",
      date: "Dec 2, 2025",
      description:
        "Core features implementation and backend setup",
    },
    {
      title: "Testing & QA",
      status: "upcoming",
      date: "Dec 10, 2025",
      description: "Quality assurance testing and bug fixes",
    },
    {
      title: "Launch & Deployment",
      status: "upcoming",
      date: "Dec 15, 2025",
      description: "Final deployment and go-live preparation",
    },
  ];

  const files = [
    {
      name: "Corporate_Clash_Design_Mockups.pdf",
      type: "pdf",
      size: "4.2 MB",
      uploadedBy: "9LMNTS Studio",
      date: "Nov 18, 2025",
    },
    {
      name: "Brand_Guidelines_TechCorp.pdf",
      type: "pdf",
      size: "2.1 MB",
      uploadedBy: "TechCorp Inc.",
      date: "Nov 10, 2025",
    },
    {
      name: "App_Screenshots_v2.zip",
      type: "zip",
      size: "12.8 MB",
      uploadedBy: "9LMNTS Studio",
      date: "Dec 1, 2025",
    },
    {
      name: "Demo_Video_Preview.mp4",
      type: "video",
      size: "45.3 MB",
      uploadedBy: "9LMNTS Studio",
      date: "Dec 5, 2025",
    },
  ];

  const messages = [
    {
      sender: "9LMNTS Studio",
      message:
        "Hey! We've just completed the design phase. Please review the mockups and let us know your thoughts.",
      timestamp: "Dec 8, 2025 - 10:30 AM",
      isClient: false,
    },
    {
      sender: "Marcus Chen",
      message:
        "Looks amazing! Love the networking grid feature. Can we add a dark mode toggle?",
      timestamp: "Dec 8, 2025 - 2:15 PM",
      isClient: true,
    },
    {
      sender: "9LMNTS Studio",
      message:
        "Absolutely! Dark mode is already built into our Event OS platform. We'll make sure it's fully customized for your brand.",
      timestamp: "Dec 8, 2025 - 3:45 PM",
      isClient: false,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="text-[#10B981]" size={20} />
        );
      case "in-progress":
        return <Clock className="text-[#FF7A00]" size={20} />;
      default:
        return (
          <AlertCircle className="text-gray-400" size={20} />
        );
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="text-[#E91E63]" size={24} />;
      case "image":
        return (
          <ImageIcon className="text-[#10B981]" size={24} />
        );
      default:
        return (
          <FileText className="text-[#00D4FF]" size={24} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      {/* Header */}
      <section className="bg-card py-12 px-4 sm:px-6 lg:px-8 border-b border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate("crm")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 uppercase tracking-widest text-[10px] font-bold"
          >
            <ArrowLeft size={16} />
            Back to Base / CRM
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-4xl text-foreground mb-2 font-bold uppercase tracking-tighter">
                {projectInfo.name}
              </h1>
              <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-bold">
                Client: {projectInfo.client}
              </p>
            </div>
            <div
              className="px-4 py-2 rounded-none border border-primary text-primary bg-primary/10 text-xs font-black uppercase tracking-widest"
            >
              Status: {projectInfo.status}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                Mission Progress
              </span>
              <span className="text-primary font-black">
                {projectInfo.progress}%
              </span>
            </div>
            <div className="w-full bg-background border border-primary/20 rounded-none h-2">
              <div
                className="h-full bg-primary shadow-[0_0_15px_#FF4500] transition-all duration-1000"
                style={{ width: `${projectInfo.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Launch Date", val: projectInfo.startDate, color: "text-foreground" },
              { label: "Target Deadline", val: projectInfo.deadline, color: "text-foreground" },
              { label: "Resource Load", val: projectInfo.totalCost, color: "text-foreground" },
              { label: "Outstanding", val: projectInfo.remaining, color: "text-primary" },
            ].map((stat, i) => (
              <div key={i} className="bg-background/50 backdrop-blur-sm p-4 rounded-none border border-primary/20">
                <div className="text-muted-foreground text-[9px] uppercase tracking-widest font-bold mb-1">
                  {stat.label}
                </div>
                <div className={`text-sm font-bold uppercase tracking-wide ${stat.color}`}>
                  {stat.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-card border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {["overview", "files", "messages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 transition-all text-[10px] font-black uppercase tracking-[0.2em] ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Milestones */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-primary/10 rounded-none p-8">
                  <h2 className="text-foreground text-xl font-bold uppercase tracking-widest mb-8 border-b border-primary/10 pb-4">
                    Project <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl lowercase ml-[-5px] -rotate-3 inline-block capitalize">Milestones</span>
                  </h2>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex gap-6 p-6 bg-background border border-primary/5 rounded-none group hover:border-primary/20 transition-all"
                      >
                        <div className="mt-1">
                          {milestone.status === "completed" ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : milestone.status === "in-progress" ? (
                            <Clock className="text-primary animate-pulse" size={24} />
                          ) : (
                            <AlertCircle className="text-muted-foreground/30" size={24} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className={`font-bold uppercase tracking-wider ${milestone.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {milestone.title}
                            </div>
                            <div className="text-primary text-[10px] font-black tracking-widest flex items-center gap-1 uppercase">
                              <Calendar size={12} />
                              {milestone.date}
                            </div>
                          </div>
                          <div className="text-muted-foreground text-xs font-sans leading-relaxed">
                            {milestone.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-card border border-primary/10 rounded-none p-8">
                  <h2 className="text-foreground text-xl font-bold uppercase tracking-widest mb-8 border-b border-primary/10 pb-4">
                    Finance <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl lowercase ml-[-5px] -rotate-3 inline-block capitalize">Status</span>
                  </h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Total Allocation", val: projectInfo.totalCost, icon: DollarSign, color: "text-foreground" },
                      { label: "Authorized Credits", val: projectInfo.paid, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/5 border-green-500/10" },
                      { label: "Pending Balance", val: projectInfo.remaining, icon: Clock, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
                    ].map((item, i) => (
                      <div key={i} className={`flex justify-between items-center p-4 rounded-none border ${item.bg || 'bg-background border-primary/5'}`}>
                        <div>
                          <div className="text-muted-foreground text-[9px] uppercase tracking-widest font-bold mb-1">
                            {item.label}
                          </div>
                          <div className={`text-lg font-black ${item.color}`}>
                            {item.val}
                          </div>
                        </div>
                        <item.icon
                          className={item.color}
                          size={24}
                          strokeWidth={2.5}
                        />
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-6 py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs rounded-none hover:bg-primary/90 transition-all border border-primary shadow-[0_0_20px_rgba(255,69,0,0.2)]">
                    Authorize Payment
                  </button>
                </div>

                {/* Next Steps */}
                <div className="bg-card border border-primary/10 rounded-none p-8">
                  <h2 className="text-foreground text-sm font-bold uppercase tracking-widest mb-6">
                    Next Operations
                  </h2>
                  <ul className="space-y-4 font-sans">
                    {[
                      "Review and approve design mockups",
                      "Provide brand assets and content",
                      "Schedule testing session (Dec 10)",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground text-xs leading-relaxed">
                        <CheckCircle
                          className="text-primary mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === "files" && (
            <div>
              <div className="bg-card border border-primary/10 rounded-none p-8">
                <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-6">
                  <h2 className="text-foreground text-xl font-bold uppercase tracking-widest">
                    Project <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl lowercase ml-[-5px] -rotate-3 inline-block capitalize">Assets</span>
                  </h2>
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-primary/90 transition-all flex items-center gap-2 border border-primary shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                    <Upload size={14} />
                    Upload File
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-5 bg-background border border-primary/5 rounded-none hover:border-primary/30 transition-all group"
                    >
                      <div className="p-3 bg-card border border-primary/10 rounded-none group-hover:bg-primary/10 transition-colors">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground text-sm font-bold truncate uppercase tracking-wider mb-1">
                          {file.name}
                        </div>
                        <div className="text-muted-foreground text-[9px] uppercase tracking-widest font-bold">
                          {file.size} • {file.uploadedBy}
                        </div>
                        <div className="text-primary/50 text-[9px] font-black uppercase tracking-widest mt-1">
                          {file.date}
                        </div>
                      </div>
                      <button className="p-3 bg-background border border-primary/10 rounded-none hover:border-primary hover:text-primary transition-all text-muted-foreground">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="bg-card border border-primary/10 rounded-none overflow-hidden flex flex-col h-[600px] shadow-2xl">
              <div className="p-6 border-b border-primary/10 bg-background/50">
                <h2 className="text-foreground text-xl font-bold uppercase tracking-widest">
                  Secure <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl lowercase ml-[-5px] -rotate-3 inline-block capitalize">Comms</span>
                </h2>
              </div>

              {/* Messages List */}
              <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-background/20 font-sans">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isClient ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md ${msg.isClient ? "bg-primary/10 border border-primary/20" : "bg-card border border-white/5"} p-5 rounded-none shadow-lg`}
                    >
                      <div className="flex items-center gap-2 mb-3 border-b border-primary/10 pb-2">
                        <div
                          className={`text-[9px] font-black uppercase tracking-[0.2em] ${msg.isClient ? "text-primary" : "text-foreground"}`}
                        >
                          {msg.sender}
                        </div>
                      </div>
                      <div className="text-foreground/80 text-sm leading-relaxed mb-3">
                        {msg.message}
                      </div>
                      <div className="text-muted-foreground/40 text-[9px] font-bold uppercase tracking-widest">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-primary/10 bg-background/50">
                <div className="flex gap-4">
                  <button className="p-4 bg-background border border-primary/10 text-primary hover:border-primary transition-all">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="ENTER MESSAGE PROTOCOL..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-6 py-4 bg-background border border-primary/20 rounded-none text-foreground placeholder-muted-foreground/30 text-sm focus:outline-none focus:border-primary font-['Orbitron'] uppercase tracking-widest"
                  />
                  <button className="px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs rounded-none hover:bg-primary/90 transition-all border border-primary flex items-center gap-2 shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                    <Send size={16} />
                    Transmit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}