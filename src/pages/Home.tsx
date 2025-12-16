import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dentalCheckupImage from "@/assets/dental-checkup.jpg";
import orthodonticsImage from "@/assets/orthodontics.jpg";
import { CheckCircle, Clock, CreditCard, Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 16) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return;

    const updateVideoScale = () => {
      // Apply mobile-style behavior for screens smaller than desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024 && video.videoWidth && video.videoHeight) {
        // Mobile/Tablet: Size section to fit video exactly, then fill section with video
        const viewportWidth = window.innerWidth;
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        
        // Calculate section height based on video aspect ratio and viewport width
        const sectionHeight = viewportWidth / videoAspectRatio;
        
        // Set hero section height to match video aspect ratio
        heroSection.style.height = `${sectionHeight}px`;
        heroSection.style.minHeight = `${sectionHeight}px`;
        
        // Make video fill the section completely
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'center center';
        video.style.left = '0';
        video.style.top = '0';
        video.style.transform = 'none';
      } else {
        // Desktop (>= 1024px): Standard full-screen behavior
        heroSection.style.height = '';
        heroSection.style.minHeight = '';
        video.style.width = '';
        video.style.height = '';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'center center';
        video.style.left = '';
        video.style.top = '';
        video.style.transform = '';
      }
    };

    const handleLoadedMetadata = () => {
      updateVideoScale();
    };

    if (video.readyState >= 1) {
      updateVideoScale();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    window.addEventListener('resize', updateVideoScale);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('resize', updateVideoScale);
    };
  }, []);

  const features = [
    {
      icon: Users,
      title: "Experienced Specialists",
      description: "Our team of specialists all have years of experience to provide you with the care you desire.",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Same day and weekend appointments available to better serve you with your busy schedule.",
    },
    {
      icon: CreditCard,
      title: "Affordable Payment Plans",
      description: "We offer flexible payment options and accept the majority of insurance plans.",
    },
    {
      icon: CheckCircle,
      title: "Worry-Free Environment",
      description: "Experience a new level of patient care and comfort in our modern, welcoming facility.",
    },
  ];

  const services = [
    {
      title: "General Dentistry",
      description: "Comprehensive dental care for the entire family",
      image: dentalCheckupImage,
      link: "/services",
    },
    {
      title: "Orthodontics & Braces",
      description: "Traditional braces and clear aligners from $99/month",
      image: orthodonticsImage,
      link: "/orthodontics",
    },
  ];

  const smileTransformations = [
    {
      title: "Full Smile Rehabilitation",
      before: "/before1.jpeg",
      after: "/after1.jpeg",
      summary: "Closed anterior spacing and rebuilt worn enamel for a uniform, confident smile.",
    },
    {
      title: "Trauma Reconstruction",
      before: "/before2.jpeg",
      after: "/after2.jpeg",
      summary: "Repaired fractured incisors with lifelike ceramics to restore symmetry and strength.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden mt-20 pb-20 sm:pb-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden hero-video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="absolute inset-0 object-cover"
            style={{ 
              pointerEvents: 'none',
            }}
          >
            <source src="/hero-dental-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center text-white w-full">
          <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-light tracking-wide sm:tracking-wide mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              <span className="block">Your Smile,</span>
              <span className="block italic font-normal mt-0.5 sm:mt-1 md:mt-2">Our Passion</span>
            </h1>
            <div className="h-px w-8 sm:w-16 md:w-20 lg:w-24 xl:w-28 bg-accent mx-auto my-2 sm:my-3 md:my-4 lg:my-6 xl:my-8"></div>
            <p className="text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-light tracking-wide opacity-90 px-1 sm:px-0">
              Complete comprehensive cosmetic dental care destination
            </p>
          </div>
          <div className="hidden sm:flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-2 sm:px-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8">
              <Link to="/virtual-consultation">Virtual Consultation</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <AnimatedSection>
        <section className="bg-accent py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-accent-foreground tracking-wide">
              Contact us today at{" "}
              <a href="tel:610-301-0295" className="font-semibold underline decoration-2 underline-offset-4 hover:no-underline transition-all">
                610-301-0295
              </a>
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-accent-foreground/80">Schedule your initial consultation</p>
            
            {/* Mobile-only buttons */}
            <div className="flex sm:hidden flex-col gap-3 justify-center mt-6 px-4">
              <Button size="lg" asChild className="bg-background hover:bg-background/90 text-foreground border-0 w-full text-sm px-6 py-6">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent backdrop-blur-sm border-background/30 text-background hover:bg-background hover:text-foreground w-full text-sm px-6 py-6">
                <Link to="/virtual-consultation">Virtual Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-secondary relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div className="inline-block">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-4 sm:mb-5 md:mb-6 tracking-wide">
                Why Choose Us
              </h2>
              <div className="h-px bg-accent w-24 sm:w-28 md:w-32 lg:w-36 mx-auto"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto mt-6 sm:mt-7 md:mt-8 font-light">
              We are excited to offer a new encounter in patient care and comfort
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-6 sm:p-7 md:p-8 lg:p-10 text-center border-0 bg-background/50 backdrop-blur-sm hover:bg-background transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                  <div className="mb-4 sm:mb-5 md:mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed">{feature.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-4 sm:mb-5 md:mb-6 tracking-wide">
              Our Services
            </h2>
            <div className="h-px bg-accent w-24 sm:w-28 md:w-32 lg:w-36 mx-auto mb-6 sm:mb-7 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl lg:max-w-3xl mx-auto">
              Comprehensive dental solutions for your complete care
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 max-w-6xl lg:max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <Card className="overflow-hidden border-0 bg-background group hover:shadow-2xl transition-all duration-700">
                  <div className="aspect-[4/3] overflow-hidden relative gradient-overlay">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-3 sm:mb-4 md:mb-5 tracking-wide">{service.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-5 md:mb-6 font-light leading-relaxed">{service.description}</p>
                    <Button asChild variant="outline" className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                      <Link to={service.link}>Explore Services</Link>
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <AnimatedSection>
        <section className="py-32 bg-secondary/40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-muted-foreground">Results</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mt-4">Before & After</h2>
              <div className="h-px w-24 bg-accent mx-auto mt-6"></div>
              <p className="mt-6 text-muted-foreground max-w-3xl mx-auto font-light">
                Real patients, real smiles. See what&apos;s possible with personalized treatment plans.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {smileTransformations.map((caseStudy) => (
                <Card key={caseStudy.title} className="overflow-hidden border-0 bg-background shadow-xl group">
                  <div className="grid grid-cols-2 gap-px bg-muted">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-[0.3em] text-white bg-black/60 px-3 py-1 rounded-full uppercase">
                        Before
                      </span>
                      <img
                        src={caseStudy.before}
                        alt={`${caseStudy.title} before`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-[0.3em] text-white bg-primary px-3 py-1 rounded-full uppercase">
                        After
                      </span>
                      <img
                        src={caseStudy.after}
                        alt={`${caseStudy.title} after`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 md:p-8 lg:p-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light">{caseStudy.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 md:mt-5 font-light">{caseStudy.summary}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Virtual Consultation CTA */}
      <AnimatedSection>
        <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-6 sm:mb-7 md:mb-8 lg:mb-10 tracking-wide">
              Virtual Consultation
            </h2>
            <div className="h-px bg-accent w-24 sm:w-28 md:w-32 lg:w-36 mx-auto mb-8 sm:mb-10 md:mb-12"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto font-light opacity-90">
              All you need is a friend, a smartphone and 2 spoons.
            </p>
            <Button size="lg" variant="outline" asChild className="bg-transparent backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-4 sm:py-5 md:py-6 lg:py-7 text-sm sm:text-base md:text-lg lg:text-xl">
              <Link to="/virtual-consultation">Start Your Consultation</Link>
            </Button>
          </div>
        </section>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection>
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-light mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Our goal is to provide you with the highest standard of dental treatment.
            </p>
            <div className="h-px bg-accent w-20 sm:w-24 md:w-28 lg:w-32 mx-auto my-6 sm:my-7 md:my-8"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-light leading-relaxed">
              Please feel free to{" "}
              <a href="mailto:info@precisionsmileorthodontics.com" className="text-accent hover:underline underline-offset-4 transition-all">
                e-mail
              </a>{" "}
              or call us at{" "}
              <a href="tel:610-301-0295" className="text-accent font-medium hover:underline underline-offset-4 transition-all">
                610-301-0295
              </a>{" "}
              with any questions. Thanks for visiting!
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;
