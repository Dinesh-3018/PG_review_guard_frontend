import React, { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import FAQs from "../components/Layout/FAQs";
import PropertyDetailItems from "../components/Data/PropertyDetailItems";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetProperyDetailsQuery } from "../redux/services/bayut";

const ListingDetail = () => {
  const params = useParams();
  const { listingId } = params;
  const divRef = useRef();

  const { data, isFetching, error } = useGetProperyDetailsQuery(listingId);
  console.log(data);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Fragment>
      <section
        ref={divRef}
        className="mx-auto bg-silver px-2 md:px-16 lg:px-20 py-20 pt-20 md:py-16"
      >
        <div className="my-20">
          {!isFetching && !error && (
            <PropertyDetailItems
              key={data?.id}
              id={data?.id}
          
              price={data?.current_price}
              address={data?.address}
              image={data?.assets[0]?.imageUrl}
              state={data?.city}
              rentType={data?.pricing_plan}
              description={data?.address}
              amenities={data?.amenities}
              photos={data?.assets}
              phoneNumber={"0422-444-009"}
              agencyName={data?.site_name}
              contactName={data?.site_name}
              reviews={data?.reviews}
            />
          )}
          {isFetching && <Loader />}
          {!isFetching && data.length === 0 && <Error />}
        </div>
      </section>
      <FAQs />
      <Footer />
    </Fragment>
  );
};

export default ListingDetail;
