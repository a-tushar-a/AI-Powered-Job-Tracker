import {
    LayoutDashboard,
    FileText,
    Search,
    BrainCircuit,
    Lightbulb,
    ShieldCheck,
    Headset,
    Book,
    Mail,
    BarChart2,
    ChevronLeft,
  } from "lucide-react";
  import { NavLink } from "react-router-dom";
  import { useUIStore } from "@/store/ui";
  import { cn } from "@/lib/utils";
  import { motion, AnimatePresence } from "framer-motion";
  
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Resume-JD Match",
      href: "/resume-jd-match",
      icon: <FileText size={20} />,
    },
    {
      title: "Skill Gap Analysis",
      href: "/skill-gap-analysis",
      icon: <Search size={20} />,
    },
    {
      title: "Resume Improvement",
      href: "/resume-improvement",
      icon: <BrainCircuit size={20} />,
    },
    {
      title: "AI Skill Roadmap",
      href: "/ai-skill-roadmap",
      icon: <Lightbulb size={20} />,
    },
    {
      title: "Smart Apply",
      href: "/smart-apply",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "Interview Probability",
      href: "/interview-probability",
      icon: <BarChart2 size={20} />,
    },
    {
      title: "AI Cover Letter",
      href: "/ai-cover-letter",
      icon: <Mail size={20} />,
    },
    {
      title: "AI Mock Interview",
      href: "/ai-mock-interview",
      icon: <Headset size={20} />,
    },
    {
      title: "Answer Feedback",
      href: "/answer-feedback",
      icon: <Book size={20} />,
    },
    {
      title: "Rejection Mail Analyzer",
      href: "/rejection-mail-analyzer",
      icon: <Mail size={20} />,
    },
  ];
  
  const Sidebar = () => {
    const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  
    return (
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className={cn("flex-shrink-0 border-r border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-card p-4 flex flex-col")}
      >
        <div className="flex items-center justify-between h-16">
          <AnimatePresence>
            {!isSidebarCollapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-2xl font-bold text-primary"
              >
                JobAI
              </motion.h1>
            )}
          </AnimatePresence>
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-dark-background">
            <ChevronLeft size={20} className={cn("transition-transform", { "rotate-180": isSidebarCollapsed })}/>
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            {sidebarNavItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-200 dark:hover:bg-dark-background",
                      {
                        "bg-primary-accent text-white": isActive,
                        "text-neutral-500 dark:text-neutral-300": !isActive,
                        "justify-center": isSidebarCollapsed,
                      }
                    )
                  }
                >
                  <div className={cn({"mr-4": !isSidebarCollapsed})}>{item.icon}</div>
                  <AnimatePresence>
                    {!isSidebarCollapsed && <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{item.title}</motion.span>}
                  </AnimatePresence>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    );
  };
  
  export default Sidebar;
