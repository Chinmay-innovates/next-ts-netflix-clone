import React from "react";
import { NextPageContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useMovieList from "@/hooks/useMovieList";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useFavourites from "@/hooks/useFavorites";
import useMovie from "@/hooks/useMovie";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: movies = [] } = useMovieList();
  // const { data: favorites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={movies} />
        <MovieList title='Short Films' data={movies} />
      </div>
    </>
  );
};

export default Home;
