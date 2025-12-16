import AnimatedSection from "@/components/AnimatedSection";

const Disclaimer = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Disclaimer</p>
              <h1 className="text-4xl sm:text-5xl font-serif font-light">Disclaimer</h1>
              <p className="text-sm text-muted-foreground"></p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The information provided on https://precisionsmileorthodontics.com (the “Website”) is
              for general informational purposes only. All content, including text, graphics, images,
              and other material contained on this Website, is not intended to be a substitute for
              professional orthodontic or medical advice, diagnosis, or treatment.
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">No Medical or Dental Advice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The content on this Website does not constitute medical or dental advice and
                  should not be relied upon as such. Always seek the advice of a licensed
                  orthodontist, dentist, physician, or other qualified healthcare provider with any
                  questions you may have regarding a dental or medical condition. Never disregard
                  professional advice or delay seeking treatment because of something you have read
                  on this Website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">No Doctor-Patient Relationship</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Use of this Website, including submitting forms, emails, or appointment requests,
                  does not establish a doctor-patient relationship between you and Precision Smile
                  Orthodontics. A doctor-patient relationship is established only after an in-office
                  consultation, examination, and mutual agreement for treatment.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Accuracy of Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate, up-to-date information, Precision Smile
                  Orthodontics makes no representations or warranties of any kind regarding the
                  completeness, accuracy, reliability, suitability, or availability of the
                  information on this Website. Information may change without notice.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Treatment Results Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Orthodontic treatment results vary from patient to patient. Any testimonials,
                  before-and-after images, or examples shown on the Website are not guarantees of
                  specific results. Individual outcomes depend on multiple factors, including patient
                  compliance, oral health, and biological differences.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Website may contain links to third-party websites for convenience or
                  informational purposes. Precision Smile Orthodontics does not control, endorse, or
                  assume responsibility for the content, policies, or practices of any third-party
                  websites. Accessing third-party websites is at your own risk.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Precision Smile Orthodontics, its owners,
                  providers, employees, and affiliates shall not be liable for any direct, indirect,
                  incidental, consequential, or special damages arising out of or related to your use
                  of this Website. This includes, but is not limited to, reliance on information
                  obtained from the Website.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Website Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not guarantee that the Website will be available at all times or free from
                  errors, viruses, or other harmful components.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Changes to This Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or update this Disclaimer at any time without prior
                  notice. Changes will be effective immediately upon posting to this page.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-light">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Disclaimer, please contact:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Precision Smile Orthodontics</li>
                  <li>Email: info@precisionsmileorthodontics.com</li>
                  <li>Phone: 610-301-0295</li>
                  <li>Address: 1247 South Cedar Crest Boulevard, Suite 300, Allentown, PA 18103</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Disclaimer;

