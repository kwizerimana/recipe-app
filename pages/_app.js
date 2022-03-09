import Link from "next/link";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <nav>
      <div>
        <Link href="/">
        <a>
          Kwiz's Kitchen :pineapple:
        </a>
        </Link>
      </div>:pineapple:
    </nav>

  <main>
  <Component {...pageProps} />
  </main>
  </>
  );
}

export default MyApp
