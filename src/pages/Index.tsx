import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import TripPlanner from "@/components/TripPlanner";
import SystemInfo from "@/components/SystemInfo";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel */}
          <aside className="lg:block hidden">
            <TripPlanner />
          </aside>

          {/* Map Container */}
          <section className="flex-1 min-h-[500px] lg:min-h-0">
            <MapView />
          </section>

          {/* Right Panel */}
          <aside className="lg:block hidden">
            <SystemInfo />
          </aside>
        </div>

        {/* Mobile panels */}
        <div className="lg:hidden mt-6 space-y-6">
          <TripPlanner />
          <SystemInfo />
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
