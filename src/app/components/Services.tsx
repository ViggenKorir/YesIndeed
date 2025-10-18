// "use client";
// import React from "react";

// const services = [
//   {
//     title: "Search engine optimization",
//     description: "Learn more",
//     highlight: true,
//   },
//   {
//     title: "Pay per click advertising",
//     description: "Learn more",
//     highlight: false,
//   },
//   {
//     title: "Social media marketing",
//     description: "Learn more",
//     highlight: false,
//   },
//   {
//     title: "E-mail marketing",
//     description: "Learn more",
//     highlight: true,
//   },
// ];

// const Services = () => (
//   <section className="py-12 px-8">
//     <h2 className="text-xl font-bold mb-2 text-lime-500">Services</h2>
//     <p className="mb-8 text-gray-700 max-w-xl">
//       At our digital marketing agency, we offer a range of services to help
//       businesses grow and succeed online. These services include:
//     </p>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {services.map((service) => (
//         <div
//           key={service.title}
//           className={`rounded-xl p-6 border ${service.highlight ? "bg-white border-lime-500 border-2" : "bg-black text-white"}`}
//         >
//           <h3
//             className={`font-bold mb-2 ${service.highlight ? "text-lime-500" : ""}`}
//           >
//             {service.title}
//           </h3>
//           <a href="#" className="underline text-sm">
//             {service.description}
//           </a>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// export default Services;

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesShowcase() {
  // const services = [
  //   { title: "Branding", img: "/images/branding.png" },
  //   { title: "Web Design", img: "/images/webdesign.png" },
  //   { title: "Marketing", img: "/images/marketing.png" },
  //   { title: "UI/UX Design", img: "/images/uiux.png" },
  //   { title: "Development", img: "/images/development.png" },
  //   { title: "Motion Design", img: "/images/motion.png" },
  // ];

  const services = [
    {
      title: "Web Design & Development",
      description:
        "We create visually stunning and user-friendly websites that not only look great but also function seamlessly.",
      img: "/images/branding.png",
    },
    {
      title: "AI Search Optimization",
      description:
        "Optimize your website for search engines to improve visibility and drive more organic traffic.",
      img: "/images/branding.png",
    },
    {
      title: "App Development",
      description:
        "Develop custom mobile applications tailored to your business needs.",
      img: "/images/branding.png",
    },
    {
      title: "Motion Graphics Design",
      description:
        "Create captivating motion graphics and animations that enhance your brand's visual identity.",
      img: "/images/branding.png",
    },
    {
      title: "Marketing Strategy + Analytics",
      description:
        "Expert marketing strategy services to increase brand awareness and drive sales.",
      img: "/images/branding.png",
    },
    {
      title: "Digital Consultation Services",
      description:
        "Professional consultation services to help you navigate the digital landscape and achieve your business goals.",
      img: "/images/branding.png",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-20 bg-gray-100 text-black overflow-hidden ">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600 transition-all duration-500">
            What We Offer
          </span>
        </h2>
        <p className="mt-4 text-black max-w-xl mx-auto">
          From strategy to execution, we deliver impactful digital solutions
          tailored to your business.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
      >
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 mr-10 ml-10">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative flex flex-col rounded-2xl border border-gray-200 p-6 hover:border-green-800 hover:shadow-lg"
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="h-5 w-5 flex-none text-yellow-500" />
                {service.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{service.description}</p>
                <p className="mt-6">
                  {/*<Button
                    variant="ghost"
                    className="text-sm font-semibold leading-6 text-blue-600"
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      contactSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Button>*/}
                </p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      {/* Call to action */}
      <div className="mt-12 text-center">
        <Link href="/quote">
          <button className="px-6 py-3 bg-gradient-to-r from-green-900 to-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Let’s Work Together
          </button>
        </Link>
      </div>
    </section>
  );
}
