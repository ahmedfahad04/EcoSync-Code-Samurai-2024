import { motion } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      if (containerRef.current) {
        const scrollPercent =
          (scrollTop / containerRef.current.scrollHeight) * 100;
        containerRef.current.style.backgroundPositionY = `${scrollPercent}%`;
      }
    }
  };

  return (
    <>
      <header
        className="bg-gradient-to-r from-slate-900 to-slate-700"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="flex justify-center items-center text-white py-20 px-8 h-screen">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Welcome to <span className="text-primary px-2">EcoSync</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white">
              Revolutionizing Waste Management in Dhaka North City Corporation
              (DNCC)
            </p>
            <a
              href="/admin/dashboard"
              className="bg-secondary hover:bg-primary hover:text-green-950 hover:font-bold text-white font-bold py-2 px-6 inline-block transition duration-300 rounded-full"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </header>
    </>
  );
};

export default Home;
