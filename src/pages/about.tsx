import React from 'react';
import Link from 'next/link';

/**
 * Página About que muestra información de la aplicación.
 */
const About: React.FC = () => {
  return (
    <div className="container">
      <div className="navbar">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <h1>About Gamer App</h1>
      <p>Esta aplicación está dedicada a los gamers apasionados.</p>
    </div>
  );
};

export default About;