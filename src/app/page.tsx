import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import HeaderHome from "./_components/header-home";
import CaseStudySection from "./_components/case-study-section";
import ServicesSection from "./_components/services-section";
import ContactSection from "./_components/contact-section";

export default function Index() {
  return (
    <main>
      <Container>
        <HeaderHome />
        
      </Container>

      <CaseStudySection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
