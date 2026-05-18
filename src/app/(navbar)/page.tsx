import { Suspense } from "react";
import { HomePage } from "@/components/pages/home-page";

const Home = () => (
  <Suspense fallback={<div>Oops?</div>}>
    <HomePage />
  </Suspense>
);

export default Home;
