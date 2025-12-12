import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Users, Utensils, Upload, CheckCircle } from "lucide-react";
import virtualHero from "@/assets/virtual-consultation-hero.jpg";
import AnimatedSection from "@/components/AnimatedSection";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const VIRTUAL_SILENT_FORM_URL =
  import.meta.env.VITE_VIRTUAL_SILENT_FORM_URL ||
  `${API_URL}/api/virtual-consult`;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_VIRTUAL_KEY =
  import.meta.env.VITE_WEB3FORMS_VIRTUAL_KEY || import.meta.env.VITE_WEB3FORMS_KEY;

const VirtualConsultation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      const useBackend = Boolean(VIRTUAL_SILENT_FORM_URL);

      if (!useBackend) {
        if (!WEB3FORMS_VIRTUAL_KEY) {
          throw new Error("Missing email endpoint: set VITE_VIRTUAL_SILENT_FORM_URL or VITE_WEB3FORMS_VIRTUAL_KEY.");
        }
        payload.append("access_key", WEB3FORMS_VIRTUAL_KEY);
        payload.append("subject", "New Virtual Orthodontics Consultation Request");
      }

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("message", formData.message);
      payload.append("_subject", "New Virtual Orthodontics Consultation Request");
      payload.append("_template", "table");
      payload.append("_replyto", formData.email);
      payload.append("consent", agreedToTerms ? "Agreed to terms" : "Not agreed");
      photos.forEach((file) => {
        // send each photo under the backend-expected field name "photos"
        payload.append("photos", file, file.name);
      });

      const endpoint = useBackend ? VIRTUAL_SILENT_FORM_URL : WEB3FORMS_ENDPOINT;

      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      const contentType = response.headers.get("content-type") || "";
      let result: any = null;
      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { success: response.ok };
        await response.text();
      }

      const submissionSucceeded =
        response.ok ||
        result?.success === true ||
        result?.success === "true";

      if (!submissionSucceeded) {
        const message =
          result?.message ||
          result?.error ||
          "Failed to send consultation request";
        throw new Error(message);
      }

      toast({
        title: "Consultation Request Received!",
        description: "We'll contact you shortly to schedule your virtual consultation.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setAgreedToTerms(false);
      setPhotos([]);
    } catch (error) {
      console.error("Error submitting virtual consultation:", error);
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      icon: Users,
      title: "Get a Friend",
      description: "Have a friend or family member help you with the photos",
    },
    {
      icon: Smartphone,
      title: "Use Your Smartphone",
      description: "Any smartphone with a camera will work perfectly",
    },
    {
      icon: Utensils,
      title: "Grab 2 Spoons",
      description: "Use spoons to retract your lips for clear dental photos",
    },
    {
      icon: Upload,
      title: "Submit Photos",
      description: "Upload your photos and complete the consultation form",
    },
  ];

  const photoInstructions = [
    "Front smile (teeth together, smiling)",
    "Front teeth apart (relaxed, lips open)",
    "Side profile (left and right)",
    "Upper teeth (looking down)",
    "Lower teeth (looking up)",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${virtualHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <AnimatedSection className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide">
            Precision Smile Orthodontics
          </h1>
          <div className="h-px w-24 bg-accent mx-auto my-6"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Virtual Consultation
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light opacity-90">
            Expert orthodontic advice from home—just bring a friend, smartphone & 2 spoons
          </p>
        </AnimatedSection>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-serif font-light text-center mb-12">
              How It Works
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-6 text-center border-0 shadow-2xl bg-background hover:shadow-[var(--shadow-elegant)] transition-all duration-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Photo Instructions */}
          <AnimatedSection>
            <Card className="p-8 bg-background border-0 mb-12 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6 text-center">
              Photos We Need
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {photoInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{instruction}</span>
                </div>
              ))}
              </div>
            </Card>
          </AnimatedSection>

          {/* Consultation Form */}
          <AnimatedSection>
            <Card className="p-8 max-w-2xl mx-auto border-0 shadow-2xl bg-background">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Request Your Virtual Consultation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
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
                <Label htmlFor="message">Tell Us About Your Concerns</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="mt-1"
                  placeholder="What are your orthodontic goals? Any specific concerns?"
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">Upload Your Photos</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload all 5 required photos (front, sides, upper, lower)
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className="max-w-xs mx-auto"
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    setPhotos(files);
                  }}
                />
                
                <div className="mt-6 text-left">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Terms and Conditions:</strong> By submitting photos and personal information, you consent to Precision Smile Orthodontics using this information to provide you with a virtual consultation. Your information will be kept confidential and used solely for evaluation purposes. This virtual consultation does not replace an in-person examination and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      I agree to the terms and conditions *
                    </Label>
                  </div>
                </div>
              </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!agreedToTerms || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Virtual Consultation Request"}
                </Button>
              </form>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-serif font-light mb-6">
            Why Choose Virtual Consultation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Convenient",
                description: "No need to visit the office for initial assessment",
              },
              {
                title: "Fast",
                description: "Get expert feedback within 24-48 hours",
              },
              {
                title: "Free",
                description: "No charge for virtual consultation evaluation",
              },
            ].map((benefit, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-primary-foreground/80">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-lg mb-4 font-light opacity-90">Prefer to talk directly?</p>
            <Button size="lg" variant="outline" asChild className="bg-transparent backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300">
              <a href="tel:8168803900">Call 610-301-0295</a>
            </Button>
          </div>
        </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default VirtualConsultation;
