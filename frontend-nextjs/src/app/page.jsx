import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home({ hotels }) {
  return (
    <div>
      <Head>
        <title>Airbnb clone</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Cards */}
      <div className="mx-5 my-7">
        <h1 className="text-3xl font-semibold mb-3">Properties</h1>
        <section className="flex">
          {hotels.map((hotel) => {
            return <Card key={hotel.id} props={hotel} />;
          })}
        </section>
      </div>
    </div>
  );
}
