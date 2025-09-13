import CompanyStores from "@/components/swagstore/CompanyStores";
import { CreateStore } from "@/components/swagstore/CreateStore";
import SwageDemanBrand from "@/components/swagstore/SwageDemanBrand";
import SwageFaQ from "@/components/swagstore/SwageFaQ";
import SwageGame from "@/components/swagstore/SwageGame";
import SwageHero2 from "@/components/swagstore/SwageHero2";
import SwageHero3 from "@/components/swagstore/SwageHero3";
import SwagHero1 from "@/components/swagstore/SwagHero1";
import SwagStoreHero from "@/components/swagstore/SwagStoreHero";
import React from "react";

const page = () => {
  return (
    <section>
      <div>
        <SwagStoreHero />
        <CompanyStores />
        <CreateStore />
        <SwageGame />
        <SwagHero1 />
        <SwageHero2 />
        <SwageHero3 />
        <SwageDemanBrand />
        <SwageFaQ />
      </div>
    </section>
  );
};

export default page;
