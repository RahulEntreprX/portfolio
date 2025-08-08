import ContactForm from "../../components/contact/ContactForm";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <p className="text-gray-700 mb-6">Have a question or want to work together? Send a message below.</p>
      <ContactForm />
    </div>
  );
}


