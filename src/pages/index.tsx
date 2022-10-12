import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>New words</title>
      </Head>

      <Header />

      <main className="container mx-auto flex h-full flex-col items-center justify-center p-4">
        <h1 className="text-center text-5xl font-extrabold leading-normal md:text-[5rem]">
          {hello.data?.greeting ?? "Hello world"}
        </h1>
      </main>
    </>
  );
};

export default Home;
