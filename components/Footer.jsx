"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const launchYear = 2023;
  return (
    <footer>
      <Link className="text-center nav-link mt-3 fs-6" href="/">
        <p>
          &copy; {launchYear} - {currentYear} Unsplash Photo Extractor. All
          Rights Reserved.
        </p>
      </Link>
    </footer>
  );
};

export default Footer;
