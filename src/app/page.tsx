import NavBar from "./components/NavBar";
import CallToAction from "./components/CallToAction";
import CaseStudy from "./components/CaseStudy";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-0">
        <NavBar />
      </div>
      <Hero />
      <Services />
      {/*<Header />*/}

      <CaseStudy />
      <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <CallToAction />
      </div>
      {/*</div>*/}
      <Footer />
    </main>
  );
}

// <a
//   className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   href="https://netflix.com"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <Image
//     aria-hidden
//     src="/file.svg"
//     alt="File icon"
//     width={16}
//     height={16}
//   />
//   Pay
// </a>
// <a
//   className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <Image
//     aria-hidden
//     src="/window.svg"
//     alt="Window icon"
//     width={16}
//     height={16}
//   />
//   Examples
// </a>
// <a
//   className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <Image
//     aria-hidden
//     src="/globe.svg"
//     alt="Globe icon"
//     width={16}
//     height={16}
//   />
//   Pick your domain →
// </a>
