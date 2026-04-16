const LogoCarousel = () => {
  const logos = [
    "../assets/logo/3.png",
    "../assets/logo/4.png",
    "../assets/logo/5.png",
    "../assets/logo/6.png",
    "../assets/logo/7.png",
    "../assets/logo/8.png",
    "../assets/logo/9.png",
    "../assets/logo/10.png",
  ];

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
      <div className="w-full overflow-hidden py-10 bg-transparent">
        {/* Container الحركة */}
        <div
          className="flex marquee-container"
          style={{ width: "fit-content" }}
        >
          <ul className="flex items-center justify-start [&_li]:mx-8 [&_img]:max-w-none shrink-0">
            {/* المرة الأولى */}
            {logos.map((logo, index) => (
              <li key={index}>
                <img
                  src={logo}
                  alt={`Logo ${index}`}
                  className="h-12 w-auto object-contain transition-all"
                />
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-start [&_li]:mx-8 [&_img]:max-w-none shrink-0"
            aria-hidden="true"
          >
            {/* التكرار عشان اللوب يكمل */}
            {logos.map((logo, index) => (
              <li key={`dup-${index}`}>
                <img
                  src={logo}
                  alt={`Logo ${index}`}
                  className="h-12 w-auto object-contain transition-all"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogoCarousel;
