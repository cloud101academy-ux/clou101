'use client';
import { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, Users, TrendingUp, Award, Target, Briefcase, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Footer from "@/components/footer";

export default function Cloud101Landing() {
  // component-local hooks (moved here)
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showPulse, setShowPulse] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // TOAST state (moved inside component)
  const [showToast, setShowToast] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // detect ?lead=success and show toast once — improved with logging and safe checks
  useEffect(() => {
    // run only in browser
    if (typeof window === 'undefined') return;

    try {
      const params = new URLSearchParams(window.location.search);
      const lead = params.get('lead');
      // debug: log so you can see in browser console whether this ran
      // console.log('Cloud101Landing: lead param =', lead);

      if (lead === 'success') {
        setShowToast(true);

        // remove the query param so refresh won't show toast again
        params.delete('lead');
        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
        // replace the history state without reloading
        window.history.replaceState({}, document.title, newUrl);

        // hide toast after 4s
        const t = setTimeout(() => setShowToast(false), 4000);
        return () => clearTimeout(t);
      }
    } catch (err) {
      // log and continue — safe fallback
      // console.error('Error reading URL param in Cloud101Landing:', err);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (target && target.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(target.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'journey', label: 'How It Works' },
    { id: 'about', label: 'About' },
    { id: 'batches', label: 'Batches' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <nav ref={navRef} className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Cloud101 Academy Logo"
                  className="h-16 w-auto object-contain"
                />
              </a>
              {/* <span className="hidden sm:inline font-bold text-gray-900">Cloud101 Academy</span> */}
            </div>

            <div className="hidden md:flex gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeSection === link.id
                      ? 'bg-blue-50 text-[#0B66FF]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <a href="/blog" className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">Blog</a>
            </div>

            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={handleCtaClick}
                className="px-6 py-2 bg-[#0B66FF] text-white rounded-full font-medium hover:bg-[#0546C8] transition-colors"
              >
                Reserve Seat
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md text-left transition-colors ${activeSection === link.id
                        ? 'bg-blue-50 text-[#0B66FF]'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="/blog"
                  className="px-4 py-2 text-sm font-medium rounded-md text-left text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="px-4 py-2 bg-[#0B66FF] text-white rounded-full font-medium text-center mt-2 hover:bg-[#0546C8]"
                  onClick={(e) => {
                    handleCtaClick(e);
                    setMenuOpen(false);
                  }}
                >
                  Reserve Seat
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Toast Message */}
      {showToast && (
        <div className="absolute top-6 right-6 z-[9999]">
          <div className="px-4 py-3 bg-green-600 text-white rounded-lg shadow-lg text-sm font-medium">
            Thank you! Your details have been submitted.
          </div>
        </div>
      )}

      <section
        id="home"
        ref={(el) => {
          if (el) sectionRefs.current['home'] = el;
        }}
        className="relative pt-12 pb-12 md:pt-24 md:pb-0 md:min-h-[calc(100vh-64px)] flex items-center scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`space-y-6 ${isMounted ? 'animate-in fade-in slide-in-from-left-4 duration-700' : 'opacity-0'}`}>
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4F8FF] rounded-full text-sm font-medium text-[#0B66FF] border border-blue-200">
                  <span className="w-2 h-2 bg-[#00A3FF] rounded-full animate-pulse"></span>
                  Next batch: January 15, 2025
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Become a Job-Ready Salesforce Admin or Developer
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Instructor-led cohorts, portfolio projects and 1:1 mock interviews for working professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#contact"
                  onClick={handleCtaClick}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0B66FF] hover:bg-[#0546C8] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B66FF] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${isMounted && showPulse ? 'animate-pulse' : ''
                    } ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0'}`}
                >
                  Reserve My Seat
                </a>

                <a
                  href="/Cloud 101 - Brochure.pdf"
                  download
                  className={`flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5 ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100' : 'opacity-0'
                    }`}
                >
                  <Download size={20} />
                  <span>
                    Download Our Brochure
                    <span className="block text-xs font-normal text-gray-600">PDF · 1.6MB</span>
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Award size={18} className="text-[#0B66FF]" />
                  <span>6+ yrs instructors</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <TrendingUp size={18} className="text-[#0B66FF]" />
                  <span>Live projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users size={18} className="text-[#0B66FF]" />
                  <span>1:1 mock interviews</span>
                </div>
              </div>
            </div>

            <div className={`relative h-96 md:h-full md:min-h-96 rounded-2xl overflow-hidden shadow-2xl ${isMounted ? 'animate-in fade-in slide-in-from-right-4 duration-700 delay-200' : 'opacity-0'
              }`}>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/salesforce-training-classroom.jpg"
                className="w-full h-full object-cover"
              >
                {/* <source src="/assets/hero-loop.mp4" type="video/mp4" /> */}
                <img
                  src="/salesforce-training-classroom.jpg"
                  alt="Live Salesforce training classroom"
                  className="w-full h-full object-cover"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Raj K.',
                role: 'Salesforce Admin',
                quote: 'Switched careers in 3 months. The hands-on projects and mentorship made all the difference.',
                avatar: '🧑‍💼',
              },
              {
                name: 'Priya S.',
                role: 'Salesforce Developer',
                quote: 'Zero experience before. Now earning 40% more as a developer at a Fortune 500 company.',
                avatar: '👩‍💻',
              },
              {
                name: 'Amit P.',
                role: 'Tech Lead',
                quote: 'The instructors are real practitioners. Knowledge is current, relevant, and immediately applicable.',
                avatar: '👨‍🎓',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0'
                  }`}
                style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: '500+', desc: 'Graduates Trained' },
              { label: '85%', desc: 'Job Placement Rate' },
              { label: '12', desc: 'Weeks to Career Ready' },
              { label: '6+', desc: 'Years Expert Instructors' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`text-center p-6 rounded-xl bg-[#F4F8FF] transition-all duration-300 ${isMounted ? 'animate-in fade-in scale-in duration-700' : 'opacity-0 scale-95'
                  }`}
                style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
              >
                <p className="text-4xl md:text-5xl font-bold text-[#0B66FF] mb-2">{stat.label}</p>
                <p className="text-gray-600 font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="courses"
        ref={(el) => {
          if (el) sectionRefs.current['courses'] = el;
        }}
        className="py-16 md:py-24 bg-gray-50 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Training Tracks</h2>
            <p className="text-xl text-gray-600">Choose the path that fits your career goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Salesforce Admin',
                duration: '10 weeks',
                price: '₹11,999',
                desc: 'Master org setup, user management, and admin certifications.',
                features: ['Core admin concepts', 'Custom objects & fields', 'Workflows & automation', 'Reports & dashboards', 'Certification prep'],
                badge: null,
              },
              {
                title: 'Salesforce Developer',
                duration: '12 weeks',
                price: '₹24,999',
                desc: 'Learn Apex, Lightning, and build custom apps.',
                features: ['Apex & triggers', 'Lightning Web Components', 'REST & SOAP APIs', 'DevOps & CI/CD', 'Unit testing'],
                badge: '⭐ Most Popular',
              },
              {
                title: 'Full-Stack Professional',
                duration: '18 weeks',
                price: '₹34,999',
                desc: 'Both Admin and Developer skills for senior roles.',
                features: ['Complete Admin track', 'Complete Developer track', 'Architecture patterns', 'Enterprise integration', 'Mock interviews'],
                badge: null,
              },
            ].map((course, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0'
                  } ${course.badge ? 'ring-2 ring-[#00A3FF] md:scale-105' : ''}`}
                style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
              >
                {course.badge && (
                  <div className="absolute top-0 right-0 px-4 py-2 bg-[#00A3FF] text-white text-sm font-bold rounded-bl-2xl whitespace-nowrap z-10">
                    {course.badge}
                  </div>
                )}

                <div className={`p-8 ${course.badge ? 'bg-[#F4F8FF]' : 'bg-white'}`}>
                  <div className="flex flex-col gap-6 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{course.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{course.desc}</p>

                  <div className="mb-6">
                    <p className="text-4xl font-bold text-[#0B66FF]">{course.price}</p>
                    <p className="text-sm text-gray-600 mt-1">{course.duration}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-[#00A3FF] font-bold mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={handleCtaClick}
                    className={`inline-flex items-center justify-center w-full py-3 px-5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${course.badge
                        ? 'bg-[#0B66FF] hover:bg-[#0546C8] text-white focus:ring-[#0B66FF]'
                        : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 focus:ring-[#0B66FF]'
                      }`}
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="journey"
        ref={(el) => {
          if (el) sectionRefs.current['journey'] = el;
        }}
        className="py-16 md:py-24 bg-white scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Your path to becoming job-ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enroll in a Live Batch',
                desc: 'Choose your track and join a cohort of professionals. Access to curriculum, recordings, and Slack community.',
                cta: 'Browse Batch Schedules',
                download: '/pdfs/batch-schedule.pdf',
              },
              {
                step: '02',
                title: 'Learn from Industry Experts',
                desc: 'Attend 2–3 live sessions weekly. Build real projects. Get code reviews and hands-on feedback from mentors.',
                cta: 'See Sample Curriculum',
                download: '/pdfs/sample-curriculum.pdf',
              },
              {
                step: '03',
                title: 'Get Job-Ready & Land Roles',
                desc: 'Interview prep, mock interviews, portfolio review, and exclusive job board access for placement support.',
                cta: 'View Success Stories',
                download: '/success-stories.pdf',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-xl bg-[#F4F8FF] border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0'
                  }`}
                style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
              >
                <div className="text-4xl font-bold text-[#0B66FF] mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 mb-6">{item.desc}</p>

                {/* <a
                  href={item.download}
                  download
                  className="inline-flex items-center gap-2 text-[#0B66FF] font-semibold hover:text-[#0546C8] transition-colors transform hover:-translate-y-0.5"
                >
                  <Download size={18} />
                  {item.cta}
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => {
          if (el) sectionRefs.current['about'] = el;
        }}
        className="py-16 md:py-24 bg-gray-50 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-2xl">
              Practical Salesforce training for working professionals.
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl">
              Bridge the gap between learning and employability with project-first training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Live small-cohort classes',
                  desc: 'Interactive sessions with real-world lab exercises.',
                },
                {
                  icon: Target,
                  title: 'Project-first curriculum',
                  desc: 'Build portfolio-ready capstones employers care about.',
                },
                {
                  icon: Briefcase,
                  title: 'Placement & interview support',
                  desc: '1:1 mock interviews, resume reviews, and hiring guidance.',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${isMounted ? 'animate-in fade-in slide-in-from-left-4 duration-700' : 'opacity-0'
                      }`}
                    style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#F4F8FF] rounded-lg flex-shrink-0">
                        <Icon className="text-[#0B66FF]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`flex flex-col gap-6 ${isMounted ? 'animate-in fade-in slide-in-from-right-4 duration-700 delay-200' : 'opacity-0'
              }`}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-[#0B66FF] to-[#00A3FF] flex items-center justify-center">
                <img
                  src="/modern-professional-learning-environment-with-peop.jpg"
                  alt="Professional learning environment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <a
                href="#contact"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center px-6 py-4 bg-[#0B66FF] hover:bg-[#0546C8] text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B66FF]"
              >
                Join our Free Info Session
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="batches"
        ref={(el) => {
          if (el) sectionRefs.current['batches'] = el;
        }}
        className="py-16 md:py-24 bg-white scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Batches</h2>
            <p className="text-xl text-gray-600">Spots fill fast. Secure your seat now.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Batch</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Track</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Start Date</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Duration</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Schedule</th>
                  <th className="text-left py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { batch: 'Jan-A', track: 'Admin', date: 'Jan 15', duration: '10 weeks', schedule: 'Tue & Thu 7-9 PM' },
                  { batch: 'Jan-B', track: 'Developer', date: 'Jan 20', duration: '12 weeks', schedule: 'Sat & Sun 10-1 PM' },
                  { batch: 'Feb-A', track: 'Full-Stack', date: 'Feb 3', duration: '18 weeks', schedule: 'Mon-Fri 2-5 PM' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-semibold">{row.batch}</td>
                    <td className="py-4 px-4 text-gray-700">{row.track}</td>
                    <td className="py-4 px-4 text-gray-700">{row.date}</td>
                    <td className="py-4 px-4 text-gray-700">{row.duration}</td>
                    <td className="py-4 px-4 text-gray-700">{row.schedule}</td>
                    <td className="py-4 px-4">
                      <a
                        href="#contact"
                        onClick={handleCtaClick}
                        className="text-[#0B66FF] font-semibold hover:text-[#0546C8] transition-colors"
                      >
                        Enroll →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        ref={(el) => {
          if (el) sectionRefs.current['testimonials'] = el;
        }}
        className="py-16 md:py-24 bg-gray-50 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real professionals. Real results.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Mahima U',
                role: 'IT Professional → Salesforce Admin',
                quote: 'I switched from IT support to Salesforce admin in 3 months. The hands-on projects and live mentorship made all the difference. Now earning 40% more.',
                avatar: '🧑‍💼',
              },
              {
                name: 'Priya S.',
                role: 'Career Changer → Salesforce Developer',
                quote: 'Zero Salesforce experience before Cloud101. After 12 weeks of intensive training and real projects, I landed a dev role at a Fortune 500.',
                avatar: '👩‍💻',
              },
              {
                name: 'Amit P.',
                role: 'Finance Analyst → Salesforce Admin',
                quote: 'The batch format kept me accountable. Peers pushed me. Instructors explained complex concepts clearly. Job board led me to my current role.',
                avatar: '👨‍🎓',
              },
              {
                name: 'Neha M.',
                role: 'Business Analyst → Salesforce Developer',
                quote: 'Code reviews were invaluable. I built a real project that\'s now in my portfolio. Employers ask about it in every interview.',
                avatar: '👩‍🔬',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${isMounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0'
                  }`}
                style={{ animationDelay: isMounted ? `${idx * 100}ms` : '0ms' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-[#0B66FF] font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={(el) => {
          if (el) sectionRefs.current['contact'] = el;
        }}
        className="py-16 md:py-24 bg-white scroll-mt-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
            <p className="text-xl text-gray-600">Fill out the form below to reserve your seat in the next batch.</p>
          </div>

          <form
            className="space-y-6 p-8 bg-[#F4F8FF] rounded-2xl border border-blue-200"
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgL00000FceTg"
            method="POST"
          >
            {/* Hidden Salesforce Web-to-Lead fields */}
            <input type="hidden" name="oid" value="00DgL00000FceTg" />
            <input type="hidden" name="retURL" value="https://cloud101.in?lead=success" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name *</label>
                <input
                  id="first_name"
                  maxLength={40}
                  size={20}
                  name="first_name"
                  type="text"
                  required
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name *</label>
                <input
                  id="last_name"
                  maxLength={40}
                  size={20}
                  name="last_name"
                  type="text"
                  required
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                <input
                  id="email"
                  maxLength={40}
                  size={20}
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone (Whatsapp Prefferd)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Interested Track *</label>
              <select
                id="00NgL00002IRbjf"
                name="00NgL00002IRbjf"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
              >
                <option value="">--None--</option>
                <option value="Salesforce Admin">Salesforce Admin</option>
                <option value="Salesforce Developer">Salesforce Developer</option>
                <option value="Salesforce Full Stack">Salesforce Full Stack</option>
                <option value="Want to attend Free Session">Want to attend free session</option>
                <option value="Not yet decided">Not yet decided</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message (Optional)</label>
              <textarea
                rows={4}
                name="description"
                placeholder="Any questions or background info we should know?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B66FF] focus:border-transparent outline-none transition"
              ></textarea>
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="privacy"
                className="w-5 h-5 mt-1 border-gray-300 rounded focus:ring-[#0B66FF] cursor-pointer"
              />
              <label htmlFor="privacy" className="text-sm text-gray-700">
                I agree to Cloud101's <a href="/privacy-policy">privacy policy</a> and to be contacted about courses & offers.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0B66FF] text-white font-bold rounded-lg hover:bg-[#0546C8] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Reserve My Seat
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}