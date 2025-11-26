import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import orthodonticsImage from "@/assets/orthodontics-hero.jpg";
import { CheckCircle, DollarSign, Clock, Award } from "lucide-react";

const Orthodontics = () => {
  const bracesOptions = [
    {
      title: "Traditional Metal Braces",
      price: "As low as $149 per month",
      features: [
        "Most cost-effective option",
        "Highly effective for complex cases",
        "Durable and reliable",
        "Customizable colored bands",
        "Proven treatment method",
      ],
      image: "/659ce08e28c0f870511dbc92_Orthodontics 2.webp",
      imageAlt: "Close-up of traditional metal braces",
    },
    {
      title: "Clear Aligners (Invisalign)",
      price: "Starting at $199 per month",
      features: [
        "Nearly invisible appearance",
        "Removable for eating & cleaning",
        "Comfortable smooth plastic",
        "No dietary restrictions",
        "Ideal for adults & teens",
      ],
      image: "/invisalign+tx.webp",
      imageAlt: "Person holding a clear aligner tray",
    },
    {
      title: "Ceramic Braces",
      price: "Starting at $199 per month",
      features: [
        "Tooth-colored brackets",
        "Less noticeable than metal",
        "Same effectiveness as metal",
        "Great for adults",
        "Aesthetic appeal",
      ],
      image: "/CERAMIC-BRACES-cost-in-india-e1649408191521.jpg.webp",
      imageAlt: "Smile showing ceramic braces",
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Flexible payment plans starting at just $149/month",
    },
    {
      icon: Clock,
      title: "Fast Treatment",
      description: "Most cases completed in 12-24 months",
    },
    {
      icon: Award,
      title: "Expert Care",
      description: "Board-certified orthodontists with years of experience",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${orthodonticsImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            BRACES
          </h1>
          <p className="text-3xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            AS LOW AS $149 Per Month For Braces
          </p>
          <Button size="lg" asChild className="shadow-xl">
            <a href="tel:8168803900">Call Now! (816) 880-3900</a>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center border-0 shadow-lg">
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Braces Options Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Choose Your Perfect Smile Solution
            </h2>
            <p className="text-xl text-muted-foreground">
              Multiple orthodontic options to fit your lifestyle and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bracesOptions.map((option, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6 rounded-2xl overflow-hidden h-48">
                  <img
                    src={option.image}
                    alt={option.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">{option.title}</h3>
                <p className="text-2xl font-bold text-accent mb-6">{option.price}</p>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Your Journey to a Perfect Smile
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description: "Free comprehensive exam and treatment plan discussion",
              },
              {
                step: "02",
                title: "Custom Treatment Plan",
                description: "Personalized plan designed for your unique needs",
              },
              {
                step: "03",
                title: "Begin Treatment",
                description: "Start your transformation with expert care",
              },
              {
                step: "04",
                title: "Reveal Your Smile",
                description: "Enjoy your beautiful, confident new smile",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-serif font-bold text-accent mb-4 opacity-20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready for Your Perfect Smile?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your free consultation today and discover how affordable orthodontic treatment can be
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:8168803900">Call (816) 880-3900</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
              <Link to="/virtual-consultation">Virtual Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orthodontics;
