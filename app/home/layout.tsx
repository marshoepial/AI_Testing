import SideNav from "../ui/home/sidenav";
import LLMContainer from "../ui/home/llm-container";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-1 flex">
        <div className="flex-[3] p-6 md:overflow-y-auto md:p-12">{children}</div>
        <LLMContainer />
      </div>
    </div>
  );
}