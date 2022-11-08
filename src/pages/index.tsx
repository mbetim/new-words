import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefinitionCard } from "../components/DefinitionCard";
import { DefinitionFormDialog } from "../components/DefinitionFormDialog";
import { useDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const definitionFormDialog = useDialog();

  const { data, isLoading } = trpc.useQuery(["definitions.getAllDefinitions"], {
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) return <div>Loading...</div>;

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <>
      <Head>
        <title>New words</title>
      </Head>

      <Header />

      <main className="container mx-auto p-4">
        <button
          className="mb-2 rounded bg-contrast-primary p-2 text-sm text-primary-default"
          onClick={definitionFormDialog.open}
        >
          New definition
        </button>

        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data?.definitions.map((definition) => (
            <DefinitionCard key={definition.id} definition={definition} />
          ))}
        </section>
      </main>

      <DefinitionFormDialog
        isOpen={definitionFormDialog.isOpen}
        onClose={definitionFormDialog.close}
      />
    </>
  );
};

export default Home;
