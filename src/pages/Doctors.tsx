import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Heart, Mail, Phone, Star, Calendar, Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import drRollins from "@/assets/dr-rollins-enhanced.jpg";
import drMalerman from "@/assets/dr-malerman-enhanced.jpg";
import drLockwood from "@/assets/dr-lockwood.jpg";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  const doctors = [
    {
      name: "Dr. Thomas Rollins",
      title: "Orthodontist",
      image: drRollins,
      yearsExperience: "15+",
      patientsServed: "5000+",
      rating: "4.9",
      education: [
        "Dental Degree - Louisiana State University School of Dentistry",
        "Specialty Certificate - Jacksonville University School of Orthodontics",
      ],
      specialties: [
        "Early treatment of children",
        "Adolescent orthodontics",
        "Adult orthodontics",
        "Complex cases including congenitally missing teeth",
      ],
      bio: "Dr. Rollins has dedicated his practice exclusively to orthodontics, combining extensive training in both restorative dentistry and orthodontics to provide comprehensive care. His passion lies in helping patients achieve newfound confidence through their smiles, offering every available treatment option to achieve optimal aesthetic and functional results.",
      philosophy: "Dr. Rollins believes that everyone deserves a great smile. He's witnessed firsthand how orthodontic treatment can transform not just smiles, but lives—boosting self-esteem, improving social interactions, and opening doors to better opportunities.",
      background: "A veteran who served in the Army Reserves during the Iraq conflict, Dr. Rollins brings discipline and dedication to his practice. His journey from electrician to dentist to orthodontist reflects his commitment to finding his true calling in creating beautiful smiles.",
    },
    {
      name: "Dr. Arnold J. Malerman",
      title: "Orthodontist",
      image: drMalerman,
      yearsExperience: "25+",
      patientsServed: "8000+",
      rating: "5.0",
      education: [
        "Advanced Orthodontic Training",
        "Continuing Education in Modern Orthodontic Techniques",
      ],
      specialties: [
        "Traditional braces",
        "Clear aligners",
        "Early interceptive treatment",
        "Adult orthodontics",
      ],
      bio: "Dr. Malerman is a highly experienced orthodontist dedicated to making beautiful smiles one patient at a time. With years of practice and a commitment to staying current with the latest orthodontic advances, he provides personalized care tailored to each patient's unique needs.",
      philosophy: "Creating beautiful, healthy smiles is more than a profession—it's a calling. Dr. Malerman takes pride in building lasting relationships with patients and their families while delivering exceptional orthodontic results.",
      background: "Known for his gentle approach and attention to detail, Dr. Malerman has built a reputation as a trusted orthodontist in the community. His practice focuses on providing quality care in a comfortable, welcoming environment.",
    },
    {
      name: "Dr. Danielle Lockwood",
      title: "Pediatric Dentist",
      image: drLockwood,
      yearsExperience: "10+",
      patientsServed: "3000+",
      rating: "4.9",
      education: [
        "Doctor of Dental Medicine - Temple University Kornberg School of Dentistry",
        "Advanced Specialty Training in Pediatric Dentistry - St. Christopher's Hospital for Children",
      ],
      specialties: [
        "Pediatric dentistry",
        "Special needs care",
        "Preventive dental care",
        "Behavior guidance",
      ],
      bio: "Dedicated to creating a welcoming 'dental home' for every child, Dr. Lockwood is passionate about helping young patients build positive, lifelong relationships with oral health. She has a special love for caring for children with special needs and strives to ensure each visit is comfortable, compassionate, and tailored to every child's unique needs.",
      philosophy: "With her warm approach and commitment to individualized care, Dr. Lockwood works closely with families to make dental visits both educational and enjoyable.",
      background: "Dr. Lockwood earned her Doctor of Dental Medicine degree from the Temple University Kornberg School of Dentistry before completing advanced specialty training in pediatric dentistry at St. Christopher's Hospital for Children.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                <Users className="w-4 h-4 mr-2 inline" />
                Award-Winning Orthodontists
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary/60 bg-clip-text text-transparent leading-tight">
                Meet Our Expert Doctors
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Compassionate care meets cutting-edge expertise for beautiful, healthy smiles
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">40+</div>
                  <div className="text-sm text-muted-foreground">Years Combined</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">13K+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">4.95</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Doctors Cards Section */}
      <AnimatedSection>
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Our Expert Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals dedicated to your smile transformation
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {doctors.map((doctor, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-primary/90 text-primary-foreground border-0">
                              <Star className="w-3 h-3 mr-1 fill-primary-foreground" />
                              {doctor.rating}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-serif font-bold mb-1">{doctor.name}</h3>
                            <p className="text-primary font-semibold text-sm">{doctor.title}</p>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                              Expertise
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {doctor.specialties.slice(0, 3).map((specialty, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs px-2 py-0.5"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                              {doctor.specialties.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                  +{doctor.specialties.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>{doctor.yearsExperience} years</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{doctor.patientsServed}</span>
                            </div>
                          </div>

                          <Button className="w-full" variant="outline" asChild>
                            <Link to="/contact">Book Consultation</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
              </Carousel>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Doctors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {doctors.map((doctor, index) => (
              <AnimatedSection key={doctor.name} delay={index * 100}>
                <Card className="overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl group bg-gradient-to-br from-background to-primary/5">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-5 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Image Section */}
                      <div className={`lg:col-span-2 relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-4' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5"></div>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                        
                        <div className="relative p-12 lg:p-16 flex flex-col items-center justify-center min-h-[600px]">
                          {/* Decorative circles */}
                          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl animate-pulse"></div>
                          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                          
                          {/* Photo with enhanced styling */}
                          <div className="relative group/img">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="relative">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="relative w-80 h-80 object-cover rounded-full border-8 border-background shadow-2xl group-hover/img:scale-105 transition-transform duration-500"
                              />
                              {/* Rating badge on photo */}
                              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background border-2 border-primary/50 rounded-full px-6 py-3 shadow-xl">
                                <div className="flex items-center gap-2">
                                  <Star className="w-5 h-5 fill-primary text-primary" />
                                  <span className="font-bold text-lg">{doctor.rating}</span>
                                  <span className="text-sm text-muted-foreground">Rating</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick stats */}
                          <div className="mt-12 flex gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{doctor.yearsExperience}</div>
                              <div className="text-xs text-muted-foreground">Years Exp.</div>
                            </div>
                            <div className="w-px bg-border"></div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{doctor.patientsServed}</div>
                              <div className="text-xs text-muted-foreground">Patients</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`lg:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <div className="mb-8">
                          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            <Award className="w-3 h-3 mr-1 inline" />
                            Board Certified
                          </Badge>
                          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            {doctor.name}
                          </h2>
                          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">{doctor.title}</p>
                        </div>

                        <div className="space-y-8">
                          <div className="bg-accent/5 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <GraduationCap className="w-6 h-6 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold">Education & Training</h3>
                            </div>
                            <ul className="space-y-3">
                              {doctor.education.map((edu, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-accent/5 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Award className="w-6 h-6 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold">Areas of Expertise</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {doctor.specialties.map((specialty, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm hover:bg-secondary/80 transition-colors">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Heart className="w-6 h-6 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold">About Dr. {doctor.name.split(' ')[1]}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-4 py-2 bg-primary/5 rounded">
                              "{doctor.philosophy}"
                            </p>
                            <p className="text-muted-foreground leading-relaxed">{doctor.background}</p>
                          </div>

                          <div className="pt-4 space-y-3">
                            <Link to="/contact">
                              <Button size="lg" className="w-full sm:w-auto group/btn">
                                <Calendar className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                                Book Appointment with Dr. {doctor.name.split(' ')[1]}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Ready to Start Your Smile Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-foreground/90 leading-relaxed">
              Schedule a consultation with one of our expert orthodontists and take the first step towards your dream smile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="text-lg h-14 px-8 w-full group/btn shadow-xl hover:shadow-2xl transition-all">
                  <Mail className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/virtual-consultation" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 w-full bg-primary-foreground/10 border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm group/btn shadow-xl hover:shadow-2xl transition-all"
                >
                  <Phone className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                  Virtual Consultation
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Board Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">13,000+ Happy Patients</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary-foreground/80" />
                <span className="text-sm">4.95 Average Rating</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Doctors;
