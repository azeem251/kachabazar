import React, { useState } from "react";
import aboutImg from "../../assets/about_wrapper.jpg";
import faqimg from "../../assets/faq_img.svg";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import KachaBazar from '../../components/kachaBazar/KachaBazar'

const faqData = [
  {
    question: "How does the KachaBazar work?",
    answer:
      "Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "We believe in flexibility and full control. If you ever feel the need to pause or stop your subscription, you can do so easily from your account dashboard — no questions asked and no hidden charges. You’re free to cancel your subscription whenever you want — no strings attached. Just head over to your account settings, click “Cancel,” and you’re all set.",
  },
  {
    question: "Whice payment method you should accept?",
    answer: "At KachaBazar, we aim to provide a smooth and secure checkout experience. That’s why we accept a wide range of payment methods for your convenience:Prefer paying in cash? Choose COD and pay when the product arrives at your doorstep (available in select locations).",
  },
  
  {
    question: "What is KachaBazar EC2 auto scaling?",
    answer: "EC2 Auto Scaling is a powerful feature from Amazon Web Services (AWS) that automatically adjusts the number of EC2 instances (virtual servers) in your application environment based on demand. At KachaBazar, we’ve implemented EC2 Auto Scaling to ensure a seamless shopping experience — even during high traffic events like sales, festivals, and flash deals.",
  },
  {
    question: "What are the benefits of using KachaBazar affliate?",
    answer: "Turn your network into income. Share your unique affiliate link, and every time someone shops using your link — you earn a commission. It’s that simple.Start without spending a single rupee. No need to buy or stock products. Just promote and earn — hassle-free. Enjoy one of the most rewarding commission structures in the market. The more customers you bring, the more you earn.",
  },
  {
    question: "What is a affliates product configuration?",
    answer: "Affiliate Product Configuration allows you to connect and display third-party products on your website from affiliate programs such as Amazon, Flipkart, or other partner marketplaces. When users click on these products and make a purchase, you earn a commission without having to manage inventory, shipping, or customer support.",
  },
  {
    question: "What is fleet management and how is it different from dynamic scaling?",
    answer: "Fleet Management in the context of cloud infrastructure or DevOps refers to the centralized control, monitoring, and maintenance of a large group of computing resources — such as servers, containers, virtual machines, or edge devices. For modern DevOps and cloud-native architectures, fleet management and dynamic scaling work hand-in-hand.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null); // control which one is open

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index); // toggle open/close
  };

  return (
    <>
      <div
        className="about_wrapper"
        style={{
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="text-center py-5">
            <h1 className="text-slate-800 text-4xl font-bold">FAQs</h1>
          </div>
        </div>
      </div>

      <div className="faq_aacording_wrapper py-5">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-6 col-md-6">
              <img src={faqimg} alt="" className="img-fluid" />
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="faq_acordion_box flex flex-col gap-3">
                {faqData.map((item, index) => (
                  <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => toggleAccordion(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <KachaBazar/>
    </>
  );
};

export default Faq;
