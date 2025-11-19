









import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  Briefcase,
  Menu,
  X,
  Linkedin,
  Twitter,
  Facebook,
  Star,
  Sparkles,
  GraduationCap,
  Search,
  Layers3,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

// --- INTERFACES ---
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

interface ComponentProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}

// --- SMALL COMPONENTS FOR REUSABILITY AND CLARITY ---

/**
 * Hero Section Feature Card - Left-aligned for the graphical side.
 */
const FeatureCard: React.FC<ComponentProps> = ({ icon, title, desc, className = "" }) => (
  <div
    className={`bg-card/80 p-5 rounded-2xl shadow border border-border flex items-center gap-4 transition duration-300 hover:shadow-blue-500/20 ${className}`}
  >
    <div className="p-3.5 bg-blue-500/20 text-blue-500 rounded-xl flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

/**
 * About Section Card
 */
const AboutCard: React.FC<ComponentProps> = ({ icon, title, desc }) => (
  <div className="p-8 bg-card/70 border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-12 h-12 mb-4 text-blue-600 mx-auto">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{desc}</p>
  </div>
);

/**
 * Services Section Card
 */
const ServiceCard: React.FC<ComponentProps> = ({ icon, title, desc }) => (
  <div className="p-8 bg-card border border-border rounded-xl text-left hover:border-blue-500 transition-all">
    <div className="w-12 h-12 p-3.5 bg-green-500/20 text-green-500 rounded-xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{desc}</p>
  </div>
);

/**
 * How It Works Step Card
 */
const StepCard: React.FC<{ step: string; title: string; desc: string }> = ({ step, title, desc }) => (
  <div className="relative text-center md:text-left p-6">
    <div className="flex items-center justify-center md:justify-start">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shadow-md mb-4 flex-shrink-0">
        {step}
      </div>
      {/* Connector Line for desktop view */}
      <div className="hidden md:block absolute top-10 left-12 w-[calc(100%-48px)] h-px bg-border group-[:nth-child(2)]/steps:left-0 group-[:nth-child(2)]/steps:w-full"></div>
    </div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-muted-foreground">{desc}</p>
  </div>
);

/**
 * Testimonial Card
 */
const TestimonialCard: React.FC<{ name: string; text: string }> = ({ name, text }) => (
  <div className="p-8 bg-card border border-border rounded-xl shadow-md text-left flex flex-col h-full">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <blockquote className="italic text-foreground flex-grow">"{text}"</blockquote>
    <p className="font-semibold mt-4">~ {name}</p>
  </div>
);

/**
 * FAQ Item with toggle logic
 */
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg bg-card/70 backdrop-blur-sm shadow-sm">
      <button
        className="flex justify-between items-center w-full text-left p-5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronDown
          size={24}
          className={`text-blue-500 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-muted-foreground border-t border-border mt-1">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Social Icon Component
 */
const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);

// --- MAIN LANDING PAGE COMPONENT ---
const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scroll on desktop nav links
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---------------------------------------------------------------- */}
      {/* NAVBAR                               */}
      {/* ---------------------------------------------------------------- */}
      <nav className="bg-card/70 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate("landing")}
            >
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold group-hover:text-blue-500">UdaanSetu</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate("landing")} className="text-muted-foreground hover:text-blue-500 transition-colors">Home</button>
              <button onClick={() => handleScroll("about")} className="text-muted-foreground hover:text-blue-500 transition-colors">About</button>
              <button onClick={() => handleScroll("services")} className="text-muted-foreground hover:text-blue-500 transition-colors">Services</button>
              <button onClick={() => handleScroll("faq")} className="text-muted-foreground hover:text-blue-500 transition-colors">FAQ</button>
              
              <button
                onClick={() => onNavigate("login")}
                className="px-6 py-2.5 text-blue-500 border border-border rounded-lg hover:bg-blue-500/10 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-muted-foreground hover:text-blue-500">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border absolute w-full shadow-2xl transition-all duration-300 ease-out">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => onNavigate('landing')} className="block w-full text-left px-3 py-3 text-foreground hover:bg-accent rounded-lg">Home</button>
              <button onClick={() => handleScroll("about")} className="block w-full text-left px-3 py-3 text-foreground hover:bg-accent rounded-lg">About</button>
              <button onClick={() => handleScroll("services")} className="block w-full text-left px-3 py-3 text-foreground hover:bg-accent rounded-lg">Services</button>
              <button onClick={() => handleScroll("faq")} className="block w-full text-left px-3 py-3 text-foreground hover:bg-accent rounded-lg">FAQ</button>
              <button onClick={() => onNavigate('login')} className="block w-full text-left px-3 py-3 text-foreground hover:bg-accent rounded-lg">Login</button>
              <button onClick={() => onNavigate('signup')} className="block w-full mt-4 px-3 py-3 bg-blue-600 text-white text-center rounded-lg">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* HERO SECTION                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients (for visual effect) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
          <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute top-20 right-0 w-72 h-72 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="md:w-1/2 z-10 text-center md:text-left pt-8 md:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm text-blue-500 text-xs uppercase tracking-wider mb-6">
              <Sparkles size={14} className="fill-blue-500" /> 
              Your Career Accelerator
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Your Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-green-500">
                Bridge to Success
              </span>
            </h1>

            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto md:mx-0 text-lg">
              UdaanSetu connects aspiring professionals with **elite mentorship**, **curated opportunities**, and the **skills** needed to redefine their future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => onNavigate("signup")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 font-semibold"
              >
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="px-8 py-4 bg-card text-foreground rounded-lg border border-border hover:border-blue-500 hover:bg-blue-500/10 transition font-semibold"
              >
                Existing User?
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Free Registration</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Expert Mentors</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Verified Jobs</div>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="md:w-1/2 relative z-10 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main Card Graphic */}
              <div className="absolute inset-4 bg-card/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border p-8 flex flex-col gap-6">
                <FeatureCard icon={<Briefcase />} title="Job Opportunities" desc="500+ Companies hiring" />
                <FeatureCard icon={<BookOpen />} title="Skill Development" desc="Curated learning paths" className="md:ml-10" />
                <FeatureCard icon={<Users />} title="Mentorship" desc="1-on-1 Guidance" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ---------------------------------------------------------------- */}
      {/* STATISTICS STRIP                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-card/50 backdrop-blur-sm py-16 relative border-t border-b border-border">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div className="p-4">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-300 mb-2">10k+</h3>
            <p className="text-muted-foreground uppercase text-sm tracking-widest">Active Students</p>
          </div>
          <div className="p-4 border-t sm:border-t-0 sm:border-l border-border">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-300 mb-2">95%</h3>
            <p className="text-muted-foreground uppercase text-sm tracking-widest">Placement Rate</p>
          </div>
          <div className="p-4 border-t sm:border-t-0 sm:border-l border-border">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-300 mb-2">500+</h3>
            <p className="text-muted-foreground uppercase text-sm tracking-widest">Corporate Partners</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT SECTION                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="py-28 bg-card/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">About UdaanSetu 🚀</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg">
            UdaanSetu is a next-gen career development platform designed to connect youth with **verified opportunities**, **personalized mentorship**, and **real-world skills**. We focus on making students industry-ready through adaptive learning, expert guidance, and a structured roadmap designed for high success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <AboutCard icon={<Search size={32} />} title="Discover Opportunities" desc="Explore internships, jobs, scholarships & events curated precisely for your profile." />
            <AboutCard icon={<GraduationCap size={32} />} title="Grow with Skills" desc="Master essential soft & technical skills through guided, project-based learning modules." />
            <AboutCard icon={<Layers3 size={32} />} title="Build a Strong Profile" desc="Showcase achievements, verified certificates, and career progression in one professional portfolio." />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SERVICES SECTION                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="services" className="py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">Our Core Services ✨</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-16">
            Everything you need to jump-start and sustain your career growth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Briefcase size={30} />} title="Job Portal" desc="Verified jobs from trusted employers and exclusive early access postings." />
            <ServiceCard icon={<Users size={30} />} title="Mentorship" desc="Talk directly with top industry mentors for personalized career advice." />
            <ServiceCard icon={<BookOpen size={30} />} title="Skill Development" desc="Career-oriented courses, skill-checks, and real-world industrial tasks." />
            <ServiceCard icon={<Sparkles size={30} />} title="AI Career Tools" desc="Resume scoring, mock interviews, and personalized career path recommendations." />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HOW IT WORKS                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-28 bg-card/40 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-16">Your 3-Step Success Roadmap</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative group/steps">
            <StepCard step="01" title="Create Your Profile" desc="Register for free, outline your goals, and build your skill & experience portfolio." />
            <StepCard step="02" title="Learn & Improve" desc="Take skill challenges, follow curated learning paths, and gain verified certifications." />
            <StepCard step="03" title="Get Opportunities" desc="Apply to targeted jobs/internships, connect with mentors, and land your dream role." />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TESTIMONIALS                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-6">What Our Users Say 💬</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
            Thousands of students and young professionals trust UdaanSetu to shape their careers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TestimonialCard
              name="Riya Sharma, B.Tech Graduate"
              text="UdaanSetu's verified job postings are a life-saver! The mentorship feature is a game-changer that helped me secure my first role at a top-tier company."
            />
            <TestimonialCard
              name="Aman Verma, Final Year Student"
              text="The AI resume review tool helped me improve my CV instantly, and the skill challenges prepared me perfectly for interviews. Highly recommend this platform."
            />
            <TestimonialCard
              name="Sneha Patil, Young Professional"
              text="I gained actual career clarity after following their structured roadmap. It's the only platform that combines learning, mentorship, and opportunities so seamlessly."
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ SECTION                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq" className="py-28 bg-card/30 border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-16">Got Questions? We Have Answers.</h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            <FAQItem question="Is UdaanSetu truly free to use?" answer="Yes! Creating an account, building your profile, accessing job listings, and utilizing the basic AI tools are completely free." />
            <FAQItem question="How are the job postings verified?" answer="We partner directly with companies and use an automated screening process to ensure every job listing is legitimate and accurate before it is posted." />
            <FAQItem question="Do I receive certificates for completing courses/tasks?" answer="Yes, you receive digital, shareable certificates for completing skill tasks and significant learning milestones, which boost your profile." />
            <FAQItem question="Can I talk to industry mentors directly?" answer="Yes, our premium tiers and special events offer one-on-one video mentorship sessions with experienced professionals from your target industry." />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-28 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-6 leading-snug">
            Don't Just Dream It, **Build It.** <br /> Start Your Free Career Journey Now.
          </h2>
          <p className="mb-10 text-lg opacity-90 max-w-2xl mx-auto">
            Unlock your full potential with personalized guidance, verified opportunities, and the right skills.
          </p>

          <button
            onClick={() => onNavigate("signup")}
            className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:bg-gray-100 transition transform hover:scale-105 text-xl"
          >
            Create Free Account <ArrowRight size={20} className="inline ml-2"/>
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                               */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">UdaanSetu</span>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<MessageCircle size={18} />} />
              <SocialIcon icon={<HelpCircle size={18} />} />
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p className="text-center md:text-left">© 2025 UdaanSetu. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;