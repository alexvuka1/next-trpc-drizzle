import Head from "next/head";
import { api } from "src/utils/api";

export default function Home() {

  const { data } = api.paper.findMany.useQuery({
    with: {
      authorPaperJT: {},
      content: true,
    }
  });

  return (
    <>
      <Head>
        <title>Next + tRPC + DrizzleORM</title>
      </Head>
      <pre>
        {JSON.stringify(data, null, '\t')}
      </pre>
    </>
  );
}
