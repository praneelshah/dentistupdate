import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Maximize2 } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import LocationMap from "@/components/LocationMap";

// Backend API endpoint
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// FormSubmit endpoint - free unlimited submissions
const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL || 'info@precisionsmileorthodontics.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/${FORM_EMAIL}`;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try custom backend first, fall back to FormSubmit
      const useBackend = Boolean(API_URL && API_URL !== 'http://localhost:3001');
      let response;

      if (useBackend) {
        // Try custom backend
        try {
          response = await fetch(`${API_URL}/api/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Backend failed, falling back to FormSubmit');
          }

          const result = await response.json();
          const submissionSucceeded = response.ok || result.success === true || result.success === "true";

          if (!submissionSucceeded) {
            throw new Error('Backend failed, falling back to FormSubmit');
          }
        } catch (backendError) {
          console.log('Backend unavailable, using FormSubmit:', backendError);
          // Fall through to FormSubmit
          response = null;
        }
      }

      // Use FormSubmit if backend is not configured or failed
      if (!response || !response.ok) {
        const payload = new FormData();
        payload.append('firstName', formData.firstName);
        payload.append('lastName', formData.lastName);
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('message', formData.message);
        payload.append('_subject', 'New Contact Form Submission - Precision Smile Orthodontics');
        payload.append('_template', 'table');
        payload.append('_captcha', 'false'); // Set to 'true' to enable reCAPTCHA

        response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: 'POST',
          body: payload,
        });
      }

      if (response && response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      name: "Allentown, Bethlehem, PA Area",
      address: "1247 South Cedar Crest Boulevard, Suite 300\nAllentown, PA 18103",
      phone: "(610) 435-5599",
      phoneLink: "tel:+16104355599",
      lat: 40.5732,
      lng: -75.5377,
      hours: [
        { day: "Monday - Thursday", time: "10:30 AM - 7:30 PM" },
        { day: "Friday", time: "9:30 AM - 6:30 PM" },
        { day: "Saturday", time: "9:00 AM - 3:00 PM" },
        { day: "Sunday", time: "Closed" },
      ],
    },
    {
      name: "Quakertown Area",
      address: "28 South 14th Street\nQuakertown, PA 18951",
      phone: "(215) 538-4550",
      phoneLink: "tel:+12155384550",
      lat: 40.4418,
      lng: -75.3415,
      hours: [
        { day: "Monday - Thursday", time: "10:30 AM - 7:30 PM" },
        { day: "Friday", time: "9:30 AM - 6:30 PM" },
        { day: "Saturday - Sunday", time: "Closed" },
      ],
    },
    {
      name: "Harleysville Area",
      address: "456 School Lane\nHarleysville, PA 19438",
      phone: "(215) 256-0808",
      phoneLink: "tel:+12152560808",
      lat: 40.2845,
      lng: -75.3882,
      hours: [
        { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
        { day: "Saturday - Sunday", time: "Closed" },
      ],
    },
    {
      name: "Lancaster Area",
      address: "60 W Walnut St.\nLancaster, PA 17603",
      phone: "(717) 735-8844",
      phoneLink: "tel:+17177358844",
      lat: 40.0379,
      lng: -76.3055,
      hours: [
        { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
        { day: "Saturday - Sunday", time: "Closed" },
      ],
    },
    {
      name: "North-East Philadelphia Area",
      address: "8355 Loretto Avenue\nPhiladelphia, PA 19152",
      phone: "(215) 332-3600",
      phoneLink: "tel:+12153323600",
      lat: 40.0652,
      lng: -75.0355,
      hours: [
        { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
        { day: "Saturday", time: "9:00 AM - 3:00 PM" },
        { day: "Sunday", time: "Closed" },
      ],
    },
    {
      name: "North Philadelphia Area",
      address: "6100-02 N. 5th Street Storefront\nPhiladelphia, PA 19120",
      phone: "(215) 455-5599",
      phoneLink: "tel:+12154555599",
      lat: 40.0382,
      lng: -75.1380,
      hours: [
        { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
        { day: "Saturday - Sunday", time: "Closed" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <AnimatedSection className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide">
            Contact Us
          </h1>
          <div className="h-px w-24 bg-accent mx-auto my-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light opacity-90">
            Six Convenient Locations Across Pennsylvania
          </p>
        </AnimatedSection>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          {/* Contact Form Section */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="p-8 border-0 shadow-2xl bg-background">
                <h2 className="text-3xl font-serif font-bold mb-2">General Inquiries</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below or use the office information provided for any of our six convenient locations.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="mt-1"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </AnimatedSection>

          {/* Office Locations */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Locations</h2>
            <p className="text-muted-foreground text-lg">
              Visit any of our convenient locations for exceptional dental care
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {offices.map((office, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-6 border-0 shadow-2xl bg-background">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-center">{office.name}</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Office Information */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground whitespace-pre-line">{office.address}</p>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-start gap-3 mb-3">
                          <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <h4 className="font-bold">Office Hours</h4>
                        </div>
                        <div className="space-y-2 pl-8">
                          {office.hours.map((schedule, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="font-medium">{schedule.day}</span>
                              <span className="text-muted-foreground">{schedule.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="aspect-[4/3] lg:aspect-[3/2] bg-muted rounded-lg overflow-hidden relative group cursor-pointer">
                      <div onClick={() => setSelectedOffice(index)} className="w-full h-full">
                        <LocationMap
                          lat={office.lat}
                          lng={office.lng}
                          officeName={office.name}
                          address={office.address}
                        />
                      </div>
                      <button
                        onClick={() => setSelectedOffice(index)}
                        className="absolute top-4 right-4 z-[1000] bg-background/90 backdrop-blur-sm text-foreground p-2 rounded-lg shadow-lg hover:bg-background transition-colors"
                        title="View fullscreen"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address.replace('\n', ', '))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 z-[1000] bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-accent/90 transition-colors font-medium text-sm"
                        title={`Get directions to ${office.name}`}
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Spanish Language Note */}
          <AnimatedSection delay={300}>
            <Card className="p-6 border-0 shadow-2xl bg-background/80 backdrop-blur-sm text-center">
              <h3 className="text-xl font-bold mb-2">Se Habla Español</h3>
              <p className="text-muted-foreground">
                We have Spanish-speaking staff available to assist you with all your dental needs.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Fullscreen Map Dialog */}
      <Dialog open={selectedOffice !== null} onOpenChange={() => setSelectedOffice(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl">
              {selectedOffice !== null && offices[selectedOffice].name}
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              {selectedOffice !== null && offices[selectedOffice].address.replace('\n', ', ')}
            </p>
          </DialogHeader>
          <div className="h-[calc(95vh-140px)] w-full relative">
            {selectedOffice !== null && (
              <>
                <LocationMap
                  lat={offices[selectedOffice].lat}
                  lng={offices[selectedOffice].lng}
                  officeName={offices[selectedOffice].name}
                  address={offices[selectedOffice].address}
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(offices[selectedOffice].address.replace('\n', ', '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 z-[1000] bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-xl hover:bg-accent/90 transition-colors font-medium"
                >
                  Get Directions
                </a>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-serif font-light mb-6">
              Ready to Start Your Smile Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto font-light opacity-90">
              We offer flexible scheduling with evening and weekend appointments available. Contact us today!
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">

            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Contact;
