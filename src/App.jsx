import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import JSSEZ from './components/JSSEZ'
import WhyJohor from './components/WhyJohor'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Waterline from './components/Waterline'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Waterline />
        <About />
        <Services />
        <Waterline />
        <JSSEZ />
        <WhyJohor />
        <Waterline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
