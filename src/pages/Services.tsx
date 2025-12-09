import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import servicesHero from "@/assets/services-hero.jpg";
import dentalCheckup from "@/assets/preventive-care.png";
import cosmeticDentistry from "@/assets/cosmetic-dentistry-new.jpg";
import AnimatedSection from "@/components/AnimatedSection";

const Services = () => {
  const services = [
    {
      category: "Preventive Care",
      items: [
        "Routine Dental Examinations",
        "Professional Teeth Cleaning",
        "Fluoride Treatments",
        "Dental Sealants",
        "Oral Cancer Screenings",
        "Digital X-Rays",
      ],
    },
    {
      category: "Restorative Dentistry",
      items: [
        "Dental Fillings",
        "Dental Crowns & Bridges",
        "Root Canal Therapy",
        "Tooth Extractions",
        "Dentures (Full & Partial)",
        "Dental Implants",
      ],
    },
    {
      category: "Cosmetic Dentistry",
      items: [
        "Teeth Whitening",
        "Porcelain Veneers",
        "Composite Bonding",
        "Smile Makeovers",
        "Gum Contouring",
        "Invisalign Clear Aligners",
      ],
    },
    {
      category: "Specialized Services",
      items: [
        "Emergency Dental Care",
        "Pediatric Dentistry",
        "Orthodontics & Braces",
        "Sedation Dentistry",
        "TMJ Treatment",
        "Sleep Apnea Solutions",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${servicesHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <AnimatedSection className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide">
            Dental Services
          </h1>
          <div className="h-px w-24 bg-accent mx-auto my-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light opacity-90">
            Comprehensive care for your healthiest smile
          </p>
        </AnimatedSection>
      </section>

      {/* Service Images */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <AnimatedSection>
              <Card className="overflow-hidden border-0 shadow-2xl bg-background group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={cosmeticDentistry}
                    alt="Cosmetic Dentistry"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-serif font-light">Cosmetic Dentistry</h3>
                    <p className="text-sm mt-2 opacity-90">Whitening, veneers & more</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection delay={150}>
              <Card className="overflow-hidden border-0 shadow-2xl bg-background group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={dentalCheckup}
                    alt="Preventive Care"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-serif font-light">Preventive Care</h3>
                    <p className="text-sm mt-2 opacity-90">Regular checkups & cleanings</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-8 border-0 shadow-2xl hover:shadow-[var(--shadow-elegant)] transition-all duration-500 bg-card">
                <h2 className="text-3xl font-serif font-bold mb-6">{service.category}</h2>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Insurance Info */}
          <AnimatedSection>
            <Card className="p-12 bg-secondary border-0 text-center shadow-2xl">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Insurance & Payment Plans
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We accept the majority of insurance plans and offer flexible payment options
              to make quality dental care accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/payment">View Payment Options</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Card className="p-6 border-0 shadow-2xl bg-background">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Precision Smile Orthodontics is a marketing platform only; all doctors featured on this site are independent providers who practice on their own and are solely responsible for all patient care and treatment outcomes. By using this website, visitors acknowledge and agree that Precision Smile Orthodontics bears no liability for any services rendered by independent providers and waive any claims arising from such care.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-serif font-light mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
            Same day and weekend appointments available
          </p>
          <Button size="lg" variant="outline" asChild className="bg-transparent backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300">
            <a href="tel:8168803900">Call (816) 880-3900</a>
          </Button>
        </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Services;
