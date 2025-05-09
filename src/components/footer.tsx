function Footer() {
  return (
    <footer className="bg-[#800000] text-white text-center p-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Daniel Carvalho. All rights reserved.
      </p>
      <div className="mt-2">
        <a href="https://www.linkedin.com/in/daniel-carvalho-70450b1b0/" target="_blank" className="text-white hover:text-gray-200 mx-2">
          LinkedIn
        </a>
        <a href="https://github.com/DaniReus04" target="_blank" className="text-white hover:text-gray-200 mx-2">
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
