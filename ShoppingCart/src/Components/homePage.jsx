import { Link } from "react-router";
import home from "./homePage.module.css";
import storefrontImage from "../assets/storefront-hero.png";

function Home() {
  return (
    <main className={home.homePage}>
      <section className={home.welcome}>
        <div className={home.welcomeText}>
          <p>Welcome to The Store</p>
          <h1>Find something you like.</h1>
          <p className={home.description}>
            Browse clothing, jewelry, and electronics from our shop.
          </p>
          <Link className={home.shopButton} to="/shop">
            Shop now
          </Link>
        </div>

        <img
          className={home.storefrontImage}
          src={storefrontImage}
          alt="Clothing, jewelry, and headphones arranged for shopping"
        />
      </section>
    </main>
  );
}

export default Home;
