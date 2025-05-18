import { Link } from "react-router-dom";
import AnimatedElement from "@/components/animated-element";

const FAQSection = () => {
  const faqs = [
    {
      question: "Are the tools free to use?",
      answer: "Most tools offer free basic functionality. Premium features are available with a subscription."
    },
    {
      question: "Is my data secure?",
      answer: "We prioritize your privacy and security. Files are processed locally when possible and securely transmitted when cloud processing is required."
    },
    {
      question: "Can I use the tools offline?",
      answer: "Some tools offer offline functionality. Check individual tool descriptions for offline availability. Note that tools requiring API connections will need internet access."
    },
    {
      question: "What file formats are supported?",
      answer: "Supported formats vary by tool. Each tool's documentation lists its supported file types."
    }
  ];

  return (
    <section className="container-padding bg-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get quick answers to common questions about our tools and services
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedElement key={index} delay={index * 0.1}>
              <div className="p-6 rounded-xl bg-card border hover:border-primary/20 transition-colors">
                <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/documentation?section=faq#faq" 
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            View all FAQs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;