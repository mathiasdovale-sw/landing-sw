import Container from "@/app/_components/container";
import HeaderHome from "./_components/header-home";
import CaseStudySection from "./_components/case-study-section";
import ServicesSection from "./_components/services-section";
import ContactSection from "./_components/contact-section";

export default function Index() {
  return (
    <>
      <main>
        <HeaderHome />
        
        <Container>
          
        </Container>

        <CaseStudySection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
