import Container from "@/app/_components/container";
import HeaderHome from "@/app/_components/header-home";
import CaseStudySection from "@/app/_components/case-study-section";
import ServicesSection from "@/app/_components/services-section";
import ContactSection from "@/app/_components/contact-section";

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
