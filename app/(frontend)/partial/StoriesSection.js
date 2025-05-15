// import StoriesLottie from "./lotties/Stories";

export default function StatsSection() {
  const stats = [
    { value: "10", label: "Team" },
    { value: "310", label: "Projects" },
    { value: "08", label: "Years" },
    { value: "20", label: "Industries" },
  ];

  return (
    <section id="stories" className="py-20 px-4 text-center relative">
      {/* <div className="absolute inset-0 -z-10">
        <StoriesLottie />
      </div> */}
      <div className="container">
        <h2 className="font-48 font-bold text-primary-dark mb-12">
          Our Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-[32px] border-2 border-primary-dark/70 shadow-md p-6"
            >
              <div className="flex flex-col justify-center border h-full border-gray-400 px-2 py-8 2xl:py-12 rounded-3xl">
                  <h3 className="text-6xl 2xl:text-7xl font-bold text-gray-800 leading-tight">
                    {stat.value} <span className="text-green-default">+</span>
                  </h3>
                  <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
