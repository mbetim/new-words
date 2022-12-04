import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefinitionCard } from "../components/DefinitionCard";
import { DefinitionFormDialog } from "../components/DefinitionFormDialog";
import { useDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { inferQueryOutput, trpc } from "../utils/trpc";
import { AiOutlinePlus } from "react-icons/ai";
import { DefinitionDialog } from "../components/DefinitionDialog";

type Definition = inferQueryOutput<"definitions.getAllDefinitions">["definitions"][number];

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const definitionFormDialog = useDialog();
  const definitionDialog = useDialog<Definition>();

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
          className="mb-2 flex items-center gap-2 rounded bg-contrast-primary p-2 text-sm text-primary-default"
          onClick={definitionFormDialog.open}
        >
          <span>
            <AiOutlinePlus />
          </span>
          New definition
        </button>

        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data?.definitions.map((definition) => (
            <DefinitionCard
              key={definition.id}
              definition={definition}
              onClick={() => definitionDialog.open(definition)}
            />
          ))}
        </section>
      </main>

      <DefinitionFormDialog
        isOpen={definitionFormDialog.isOpen}
        onClose={definitionFormDialog.close}
      />

      <DefinitionDialog
        isOpen={definitionDialog.isOpen}
        onClose={definitionDialog.close}
        definition={definitionDialog.data}
      />
    </>
  );
};

export default Home;
