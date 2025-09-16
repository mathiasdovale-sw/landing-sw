import Container from "@/app/_components/container";
import HeaderHome from "./_components/header-home";
import ServicesSection from "./_components/services-section";
import ContactSection from "./_components/contact-section";

export default function Index() {
  return (
    <>
      <main>
        <Container>
          <HeaderHome />
          
        </Container>

        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
