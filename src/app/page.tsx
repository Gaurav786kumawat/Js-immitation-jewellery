'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jewelleryType: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Close menu first
    setMobileMenuOpen(false);

    // Wait for menu animation close
    setTimeout(() => {
      const navbarHeight = 90; // adjust if needed
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }, 250);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi There,%0ANew Jewellery Enquiry%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0AJewellery Type: ${encodeURIComponent(formData.jewelleryType)}%0ABudget: ${encodeURIComponent(formData.budget)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/917568387383?text=${message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          * {
            scroll-behavior: smooth;
          }
        `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-yellow-500/30 shadow-lg shadow-yellow-500/10 py-2 md:py-3'
          : 'bg-black/60 backdrop-blur-md border-b border-gray-800 py-3 md:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
              onClick={() => smoothScrollTo('home')}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={scrolled ? 40 : 45}
                  height={scrolled ? 40 : 45}
                  className="rounded-full shadow-lg shadow-yellow-500/30"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </motion.div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                JS IMMITATION
              </span>
            </motion.div>

            <div className="hidden md:flex gap-6 lg:gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Collections', id: 'collections' },
                { name: 'Custom', id: 'custom' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Contact', id: 'contact' },
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => smoothScrollTo(item.id)}
                  className="relative text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white relative z-50"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden bg-black/98 backdrop-blur-xl border-t border-yellow-500/20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mobileMenuOpen ? 'visible' : 'hidden'}
            className="px-4 py-4 space-y-2"
          >
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Collections', id: 'collections' },
              { name: 'Custom', id: 'custom' },
              { name: 'Gallery', id: 'gallery' },
              { name: 'Contact', id: 'contact' },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => smoothScrollTo(item.id)}
                className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-yellow-500/10"
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.nav>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/image1.jpg" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-yellow-600/10"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
          >
            Timeless Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 font-light px-4"
          >
            Crafted with precision, designed with passion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
          >
            <motion.button
              onClick={() => smoothScrollTo('collections')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(250, 204, 21, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full overflow-hidden text-sm md:text-base"
            >
              <span className="relative z-10">Shop Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4 }}
              ></motion.div>
            </motion.button>

            <motion.button
              onClick={() => smoothScrollTo('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-10 py-4 md:py-5 border-2 border-yellow-500 text-yellow-500 font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 overflow-hidden text-sm md:text-base"
            >
              <span className="relative z-10">Book Appointment</span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-xs md:text-sm text-gray-400 mt-8 md:mt-10 font-light tracking-wider"
          >
            Certified Jewellery Since 2000
          </motion.p>
        </motion.div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden group"
              >
                <Image src="/image2.jpg" alt="Brand Story" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/50 rounded-3xl transition-all duration-500"
                  whileHover={{ boxShadow: '0 0 50px rgba(250, 204, 21, 0.3)' }}
                ></motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                  For over two decades, we have been crafting exquisite jewellery that tells your unique story. Each piece is meticulously designed and handcrafted by our master artisans, ensuring unparalleled quality and timeless beauty.
                </p>
                <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
                  Our commitment to excellence, ethical sourcing, and customer satisfaction has made us a trusted name in luxury jewellery.
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-4 md:gap-6"
                >
                  {[
                    { num: '24+', label: 'Years Experience' },
                    { num: '50K+', label: 'Happy Clients' },
                    { num: '100K+', label: 'Designs Delivered' },
                  ].map((stat, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="text-center group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-1 md:mb-2"
                      >
                        {stat.num}
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section id="collections" className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Our Collections
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Explore our exquisite range of handcrafted jewellery</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8"
            >
              {[
                { img: '/image4.jpg', title: 'Rings', desc: 'Elegant rings for every occasion' },
                { img: '/image5.jpg', title: 'Necklaces', desc: 'Statement pieces that captivate' },
                { img: '/image6.jpg', title: 'Earrings', desc: 'Timeless elegance for your ears' },
                { img: '/image7.jpg', title: 'Bridal Jewellery', desc: 'Make your special day unforgettable' },
                { img: '/image8.jpg', title: 'Daily Wear', desc: 'Sophisticated simplicity for everyday' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className="relative h-32 sm:h-48 md:h-80 overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 p-3 md:p-6 w-full">
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1 md:mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base transform group-hover:translate-x-2 transition-transform duration-300 hidden sm:block">
                      {item.desc}
                    </p>
                  </div>

                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/60 rounded-2xl md:rounded-3xl transition-all duration-500"
                    whileHover={{ boxShadow: '0 0 60px rgba(250, 204, 21, 0.4)' }}
                  ></motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Discover our bestselling pieces</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8"
            >
              {[
                { img: '/image9.jpg', name: 'Diamond Solitaire Ring', price: '₹85,000', badge: 'Bestseller' },
                { img: '/image10.jpg', name: 'Pearl Necklace Set', price: '₹65,000', badge: 'Trending' },
                { img: '/image11.jpg', name: 'Gold Chandelier Earrings', price: '₹45,000', badge: 'New' },
                { img: '/image12.jpg', name: 'Bridal Choker Set', price: '₹1,25,000', badge: 'Bestseller' },
                { img: '/image13.jpg', name: 'Emerald Pendant', price: '₹55,000', badge: 'Trending' },
                { img: '/image14.jpg', name: 'Ruby Tennis Bracelet', price: '₹95,000', badge: 'New' },
              ].map((product, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className="relative h-32 sm:h-48 md:h-80 overflow-hidden">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                        className="px-2 py-1 md:px-4 md:py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-[10px] md:text-xs font-bold rounded-full shadow-lg"
                      >
                        {product.badge}
                      </motion.span>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ boxShadow: 'inset 0 0 50px rgba(250, 204, 21, 0.2)' }}
                    ></motion.div>
                  </div>

                  <div className="p-3 md:p-6">
                    <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold mb-1 md:mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      {product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section id="custom" className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Custom Jewellery
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                  Bring your dream jewellery to life. Our expert designers work closely with you to create one-of-a-kind pieces that perfectly reflect your style and story.
                </p>

                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                  {[
                    { step: '1', title: 'Consultation', desc: 'Share your vision with our designers' },
                    { step: '2', title: 'Design', desc: 'We create detailed sketches and 3D models' },
                    { step: '3', title: 'Crafting', desc: 'Our artisans bring your design to life' },
                    { step: '4', title: 'Delivery', desc: 'Receive your custom masterpiece' },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-4 md:gap-6 items-start group">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-black text-base md:text-xl flex-shrink-0 shadow-lg shadow-yellow-500/30"
                      >
                        {item.step}
                      </motion.div>
                      <div>
                        <h3 className="text-base md:text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  onClick={() => smoothScrollTo('contact')}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(250, 204, 21, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full transition-all duration-300 text-sm md:text-base"
                >
                  Start Custom Order
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[400px] md:h-full min-h-[500px] md:min-h-[600px] rounded-3xl overflow-hidden group"
              >
                <Image src="/image15.jpg" alt="Custom Jewellery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/50 rounded-3xl transition-all duration-500"
                  whileHover={{ boxShadow: '0 0 60px rgba(250, 204, 21, 0.3)' }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                What Our Clients Say
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Trusted by thousands of satisfied customers</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {[
                {
                  img: '/priya.png',
                  name: 'Priya Sharma',
                  review: 'Absolutely stunning craftsmanship! My custom engagement ring exceeded all expectations. The attention to detail is remarkable.',
                },
                {
                  img: '/rahul.png',
                  name: 'Rahul Mehta',
                  review: 'Exceptional quality and service. The bridal set we purchased is breathtaking. Highly recommend JS Immitation Jewellery!',
                },
                {
                  img: '/ananya.png',
                  name: 'Ananya Singh',
                  review: 'The team helped me design the perfect necklace for my wedding. Professional, creative, and delivered on time!',
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 border border-gray-800 hover:border-yellow-500/30"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-yellow-500/50"
                    >
                      <Image src={testimonial.img} alt={testimonial.name} fill className="object-cover" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white text-base md:text-lg">{testimonial.name}</h3>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{testimonial.review}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section id="gallery" className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Gallery
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">A glimpse into our world of luxury</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
            >
              {[
                { img: '/image18.jpg', span: 'md:col-span-2 md:row-span-2' },
                { img: '/image19.jpg', span: '' },
                { img: '/image20.jpg', span: '' },
                { img: '/image21.jpg', span: '' },
                { img: '/image22.jpg', span: '' },
                { img: '/image23.jpg', span: 'md:col-span-2' },
                { img: '/image24.jpg', span: 'md:col-span-2' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`relative h-32 sm:h-40 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${item.span}`}
                >
                  <Image src={item.img} alt={`Gallery ${idx + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ boxShadow: 'inset 0 0 60px rgba(250, 204, 21, 0.2)' }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/40 rounded-2xl md:rounded-3xl transition-all duration-500"
                    whileHover={{ boxShadow: '0 0 40px rgba(250, 204, 21, 0.3)' }}
                  ></motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Quality Promise
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Your trust is our most precious jewel</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {[
                { title: 'Hallmark Certified', desc: 'All gold jewellery is BIS hallmarked for purity and quality assurance.' },
                { title: 'Diamond Certification', desc: 'Every diamond comes with IGI/GIA certification for authenticity.' },
                { title: 'Quality Testing', desc: 'Rigorous quality checks ensure perfection in every piece.' },
                { title: 'Return Policy', desc: '30-day easy return and lifetime exchange guarantee.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 border border-gray-800 hover:border-yellow-500/30"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Visit Our Store
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Experience luxury in person</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 md:mb-8">Store Information</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 md:space-y-6">
                  {[
                    {
                      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                      title: 'Address',
                      content: 'Lolo ki Beri, Dhorimana Barmer, Rajasthan , 344704',
                    },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: 'Contact', content: '+91 7568387383' },
                    {
                      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                      title: 'Opening Hours',
                      content: 'Mon - Sat: 10:00 AM - 8:00 PM',
                      extra: 'Sunday: 11:00 AM - 6:00 PM',
                    },
                    {
                      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                      title: 'City',
                      content: 'Barmer, Rajasthan',
                    },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-3 md:gap-4 group">
                      <motion.svg
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </motion.svg>
                      <div>
                        <p className="font-semibold text-white text-base md:text-lg mb-1 group-hover:text-yellow-400 transition-colors duration-300">{item.title}</p>
                        <p className="text-gray-400 text-sm md:text-base">{item.content}</p>
                        {item.extra && <p className="text-gray-400 text-sm md:text-base">{item.extra}</p>}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl overflow-hidden h-80 md:h-96 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500"
              >
                <div className="w-full h-full relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14445.500650928632!2d71.385493!3d25.1568072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3944f7f5746e1ae1%3A0xd903055abe93ee2a!2sLolo%20Ki%20Beri%2C%20Sauwon%20Ki%20Beri%2C%20Rajasthan%20344704!5e0!3m2!1sen!2sin!4v1770668288540!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"></div>
        </div>

        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">Let us help you find or create your perfect piece</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 md:mb-8">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm md:text-base"
                      placeholder="Your full name"
                    />
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm md:text-base"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm md:text-base"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Jewellery Type</label>
                    <select
                      name="jewelleryType"
                      value={formData.jewelleryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm md:text-base"
                    >
                      <option value="">Select type</option>
                      <option value="Ring">Ring</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Custom">Custom</option>
                      <option value="Other">Other</option>
                    </select>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm md:text-base"
                    >
                      <option value="">Select budget range</option>
                      <option value="10k-30k">₹10,000 - ₹30,000</option>
                      <option value="30k-70k">₹30,000 - ₹70,000</option>
                      <option value="70k-1L">₹70,000 - ₹1,00,000</option>
                      <option value="1L+">₹1,00,000+</option>
                    </select>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none text-sm md:text-base"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(250, 204, 21, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl transition-all duration-300 relative overflow-hidden group text-sm md:text-base"
                  >
                    <span className="relative z-10">Send Message via WhatsApp</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.4 }}
                    ></motion.div>
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-10 border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>

                <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 md:mb-8 relative z-10">Store Details</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 md:space-y-6 relative z-10">
                  {[
                    { title: 'Address', content: 'Lolo ki beri, Dhorimana', extra: 'Barmer, Rajasthan, 344704' },
                    { title: 'Phone', content: '+91 7568387383' },
                    { title: 'Email', content: 'jsimmitationjewellery@gmail.com' },
                    { title: 'City', content: 'Barmer, Rajasthan' },
                    { title: 'Working Hours', content: 'Monday - Saturday: 10:00 AM - 8:00 PM', extra: 'Sunday: 11:00 AM - 6:00 PM' },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="group">
                      <h4 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{item.title}</h4>
                      <p className="text-gray-300 text-sm md:text-base">{item.content}</p>
                      {item.extra && <p className="text-gray-300 text-sm md:text-base">{item.extra}</p>}
                    </motion.div>
                  ))}

                  <div className="pt-6 md:pt-8 border-t border-gray-700">
                    <h4 className="text-base md:text-lg font-semibold text-white mb-4">Follow Us</h4>
                    <div className="flex gap-3 md:gap-4">
                      {[
                        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                      ].map((path, idx) => (
                        <motion.a
                          key={idx}
                          href="#"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 border border-yellow-500/30 hover:border-yellow-500"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d={path} />
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-black border-t-2 border-yellow-500/20 py-12 md:py-16 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.8 }}>
                  <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full shadow-lg shadow-yellow-500/30 md:w-[50px] md:h-[50px]" />
                </motion.div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  JS IMMITATION
                </span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Crafting timeless elegance since 2000. Your trusted partner in luxury jewellery ~ JS Immitation Jewellery.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white text-base md:text-lg mb-4 md:mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'About', id: 'about' },
                  { name: 'Collections', id: 'collections' },
                  { name: 'Contact', id: 'contact' },
                ].map((item, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <button onClick={() => smoothScrollTo(item.id)} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-xs md:text-sm">
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white text-base md:text-lg mb-4 md:mb-6 relative inline-block">
                Contact Info
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
              </h4>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-400">
                <li className="hover:text-yellow-400 transition-colors duration-300">Lolo ki beri, Dhorimana</li>
                <li className="hover:text-yellow-400 transition-colors duration-300">Barmer, Rajasthan</li>
                <li className="hover:text-yellow-400 transition-colors duration-300">+91 7568387383</li>
                <li className="hover:text-yellow-400 transition-colors duration-300">jsimmitationjewellery@gmail.com</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white text-base md:text-lg mb-4 md:mb-6 relative inline-block">
                Follow Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
              </h4>
              <div className="flex gap-3 md:gap-4">
                {[
                  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                ].map((path, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 relative group"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-black transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-500/0 group-hover:bg-yellow-500/20 blur-xl transition-all duration-300"
                      whileHover={{ scale: 1.5 }}
                    ></motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-800 pt-6 md:pt-8"
          >
            {/* ================= BOTTOM ================= */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between items-center text-xs">
              <p className="text-gray-600 text-center sm:text-left">
                © {new Date().getFullYear()} JS Immitation Jewellery. All rights reserved.
              </p>
              <p className="text-gray-600 text-center sm:text-right">
                Crafted with <span className="text-red-500">❤</span> by
                <a
                  href="https://hightechmg.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1"
                >
                  MG Tech Studio
                </a>
              </p>
            </div>
          </motion.div>





        </div>
      </motion.footer>
    </div>
  );
}
