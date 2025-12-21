import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Local Guide - Find your local tour guide</title>
        <meta
          name="description"
          content="Local Guide - Find your local tour guide"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-4xl font-bold text-center mx-5 my-10">
          This is the Main Homepage of The Application!
        </h1>
      </main>
    </>
  );
}
