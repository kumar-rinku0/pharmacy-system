import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaChartLine,
  FaDatabase,
  FaShieldAlt,
  FaUsers,
  FaLaptopMedical,
  FaPrescriptionBottleAlt,
  FaUserCircle,
  FaSignInAlt,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../provider/auth-provider";

const Counter = ({
  endValue,
  duration = 2,
  decimals = 0,
}: {
  endValue: number;
  duration?: number;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return <>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}</>;
};

const sliderImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

const features = [
  {
    id: 1,
    title: "Centralized Inventory",
    description: "Manage inventory across multiple locations from one platform",
    icon: <FaDatabase className="text-4xl text-green-600 mb-4" />,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Prescription Tracking",
    description:
      "Track prescriptions from entry to fulfillment with audit trails",
    icon: <FaPrescriptionBottleAlt className="text-4xl text-green-600 mb-4" />,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Patient Management",
    description: "Comprehensive patient profiles with medication history",
    icon: <FaUsers className="text-4xl text-green-600 mb-4" />,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Regulatory Compliance",
    description: "Built-in compliance with healthcare regulations",
    icon: <FaShieldAlt className="text-4xl text-green-600 mb-4" />,
    image:
      "https://images.unsplash.com/photo-1630582837298-49d1927726e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Pharmacy Director, City Medical",
    quote:
      "PCS has transformed how we manage our 12 locations. The centralized control has reduced our operational costs by 22%.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO, Regional Pharmacy Chain",
    quote:
      "The real-time analytics have given us insights we never had before. We can now make data-driven decisions for our entire network.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    role: "Head Pharmacist, University Hospital",
    quote:
      "The integration with our EHR system has saved our staff hundreds of hours previously spent on manual data entry.",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  },
];

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110"
      aria-label="Next slide"
    >
      <FaArrowRight className="text-green-600 text-lg" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110"
      aria-label="Previous slide"
    >
      <FaArrowLeft className="text-green-600 text-lg" />
    </button>
  );
};

const Homepage: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition"></div>
    ),
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="bg-green-800 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <span>Support: 907910</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>Company Pvt. Limited</span>
            </div>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>Support Hours: 24/7/365</span>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            <FaLaptopMedical className="text-green-600 text-3xl" />
            <span>PCS Pharmacy System</span>
          </div>

          <nav className="hidden md:flex gap-8 font-medium text-gray-700">
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Features
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Solutions
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Pricing
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Resources
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition flex items-center border-b-2 border-transparent hover:border-green-600 h-full py-2"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={
                isAuthenticated
                  ? () => navigate("/dashboard")
                  : () => navigate("/login")
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition hidden md:block shadow-md hover:shadow-lg cursor-pointer"
            >
              {isAuthenticated ? (
                <span className="flex gap-2 justify-center items-center">
                  <span>
                    <FaUserCircle />
                  </span>
                  <span>My Account</span>
                </span>
              ) : (
                <span className="flex gap-2 justify-center items-center">
                  <span>
                    <FaSignInAlt />
                  </span>
                  <span>Login</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="relative">
        <Slider {...sliderSettings} className="w-full">
          {sliderImages.map((slide) => (
            <div key={slide.id} className="relative h-96 md:h-[32rem]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 text-white">
                    <div className="flex gap-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg transition-all hover:shadow-md">
              <div className="text-5xl font-bold text-green-600 mb-3">
                <Counter endValue={500} duration={2} />+
              </div>
              <div className="text-gray-600 font-medium">Pharmacies Served</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg transition-all hover:shadow-md">
              <div className="text-5xl font-bold text-green-600 mb-3">24/7</div>
              <div className="text-gray-600 font-medium">
                Support Availability
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg transition-all hover:shadow-md">
              <div className="text-5xl font-bold text-green-600 mb-3">
                <Counter endValue={99.9} duration={3} decimals={1} />%
              </div>
              <div className="text-gray-600 font-medium">System Uptime</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg transition-all hover:shadow-md">
              <div className="text-5xl font-bold text-green-600 mb-3">
                <Counter endValue={50} duration={2} />+
              </div>
              <div className="text-gray-600 font-medium">Integrations</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Centralized Pharmacy Management
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions designed for multi-location pharmacy
            operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <button className="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center justify-center mx-auto transition">
                  Learn More
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Enterprise Pharmacy Management
              </h2>
              <p className="text-gray-600 mb-6">
                Our Pharmacy Centralized System (PCS) provides a unified
                platform to manage all aspects of your pharmacy operations
                across multiple locations. From inventory control to
                prescription processing and regulatory compliance, PCS delivers
                the tools you need to optimize efficiency and patient care.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaChartLine className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Real-time analytics and reporting dashboards
                  </span>
                </li>
                <li className="flex items-start">
                  <FaDatabase className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Centralized inventory management across all locations
                  </span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    HIPAA-compliant patient data security
                  </span>
                </li>
                <li className="flex items-start">
                  <FaUsers className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Role-based access control for staff
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="PCS System Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Trusted by Pharmacy Leaders
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What our clients say about PCS Pharmacy System
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Slider {...testimonialSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4">
                  <div className="bg-gray-800 rounded-xl p-8">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-green-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic text-lg">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaLaptopMedical className="text-green-400 mr-2" />
                PCS Pharmacy
              </h3>
              <p className="text-gray-400 mb-4">
                The leading centralized pharmacy management system for
                healthcare organizations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Retail Pharmacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Hospital Pharmacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Chain Pharmacies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Specialty Pharmacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Mail Order Pharmacy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    White Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="text-green-400 mt-1 mr-2" />
                  <span className="text-gray-400">Company Pvt. Limited</span>
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt className="text-green-400 mr-2" />
                  <span className="text-gray-400">907930</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-gray-400">pcs@system.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} PCS Pharmacy System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
