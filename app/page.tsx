import CommonLayout from "@/components/CommonLayout";
import Link from "next/link";
import { ArrowRight, Smile, ShieldCheck, SyringeIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Title from "@/components/Title";

export default function Home() {
  return (
    <>
      <Title description="Welcome to our website, Smile Care Dental is one of the best dental appointment online. Try it out!">
        Welcome to Smile Care Dental - Homepage
      </Title>
      <CommonLayout>
        <section className="container bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 mt-10">
              Brighten Your Smile with
              <span className="text-blue-300"> SmileCare Dental</span>
            </h1>
            <p className="text-xl mb-8">
              Providing exceptional dental care for healthy, confident smiles.
            </p>
            <Link href="/appointments">
              <button className="px-8 py-3 bg-neutral-900 hover:text-black dark:hover:text-black font-semibold rounded-md shadow-md  hover:bg-neutral-100 transition">
                Book an Appointment
                <ArrowRight className="inline ml-2" size={20} />
              </button>
            </Link>
          </div>
        </section>

        <section className="container py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Why Choose SmileCare Dental?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {/* Comprehensive Care */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
                <SyringeIcon
                  className="text-teal-500 dark:text-teal-300 mx-auto mb-4"
                  size={48}
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Comprehensive Care
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From routine cleanings to advanced dental procedures, we
                  provide complete care for your smile.
                </p>
              </div>

              {/* Cosmetic Dentistry */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
                <Smile
                  className="text-blue-500 dark:text-blue-300 mx-auto mb-4"
                  size={48}
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Cosmetic Dentistry
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Transform your smile with our teeth whitening, veneers, and
                  other cosmetic treatments.
                </p>
              </div>

              {/* Safe & Hygienic */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
                <ShieldCheck
                  className="text-green-500 dark:text-green-300 mx-auto mb-4"
                  size={48}
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Safe & Hygienic
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize safety and hygiene with state-of-the-art
                  sterilization and safety protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beautified Accordion Section */}
        <section className="container py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10">
              Our Dental Services
            </h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple">
                <AccordionItem value="braces">
                  <AccordionTrigger className="text-xl font-semibold">
                    Dental Braces & Orthodontics
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Correct misaligned teeth with our modern braces and clear
                    aligner solutions for all ages.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="whitening">
                  <AccordionTrigger className="text-xl font-semibold">
                    Teeth Whitening
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Brighten your smile with our safe and effective in-office
                    and at-home teeth whitening options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="implants">
                  <AccordionTrigger className="text-xl font-semibold">
                    Dental Implants
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Restore missing teeth with durable and natural-looking
                    dental implants for a confident smile.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="root-canal">
                  <AccordionTrigger className="text-xl font-semibold">
                    Root Canal Therapy
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Save your natural tooth and relieve pain with our gentle and
                    effective root canal treatments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pediatric">
                  <AccordionTrigger className="text-xl font-semibold">
                    Pediatric Dentistry
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Specialized dental care for children in a fun and
                    comfortable environment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="emergency">
                  <AccordionTrigger className="text-xl font-semibold">
                    Emergency Dental Care
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50">
                    Immediate care for dental emergencies like toothaches,
                    broken teeth, and oral injuries.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container py-20 bg-blue-700 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">
            Schedule Your Dental Checkup Today
          </h2>
          <p className="text-xl mb-8">
            Your oral health is our priority. Book your consultation now and
            start your journey to a healthier smile!
          </p>
          <Link href="/appointments">
            <button className="px-8 py-3 bg-neutral-900 hover:text-black dark:hover:text-black font-semibold rounded-md shadow-md hover:bg-neutral-100 transition">
              Make an Appointment
            </button>
          </Link>
        </section>
      </CommonLayout>
    </>
  );
}
