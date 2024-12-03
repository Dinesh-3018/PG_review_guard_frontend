import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import PropertiesItem from "../Data/PropertiesItem";

import {
  useGetProperyListQuery,
  useSearchPropertiesQuery,
} from "../../redux/services/bayut";
import Loader from "../UI/Loader";
import Error from "../UI/Error";

const Properties = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 1;

  // Fetch data based on the presence of a search query
  const {
    data: searchData,
    isFetching: isSearching,
    error: searchError,
  } = useSearchPropertiesQuery(
    {
      query,
      page: Number(page),
      page_size: 15,
    },
    { skip: !query } // Skip this query if no search term is provided
  );

  const {
    data: defaultData,
    isFetching: isFetchingDefault,
    error: defaultError,
  } = useGetProperyListQuery(undefined, { skip: !!query }); // Skip this query if search term is provided

  // Select data based on search query presence
  const propertiesData = query ? searchData : defaultData;
  const isLoading = query ? isSearching : isFetchingDefault;
  const error = query ? searchError : defaultError;

  const mappedList = propertiesData?.map((property) => {
    return (
      <PropertiesItem
        key={property?.id}
        id={property?.id}
        price={property?.current_price}
        address={property?.property_name}
        image={property?.assets[0]?.imageUrl}
        state={property?.city}
        rentType={property?.pricing_plan}
      />
    );
  });

  return (
    <Fragment>
      <section className="mx-auto bg-silver px-10 md:px-16 lg:px-20 py-20 pt-20 md:py-16">
        <div className="px-auto lg:px-32">
          <h1 className="font-Poppins font-bold text-4xl text-center tracking-wider mb-4">
            List of <span className="text-blue">Properties</span>
          </h1>
          {query && (
            <p className="text-center text-lg text-gray-500">
              Showing results for "<span className="text-blue">{query}</span>"
            </p>
          )}
        </div>
        <div>
          <ul className="flex justify-center flex-col lg:flex-row lg:flex-wrap ">
            {isLoading && <Loader />}
            {!isLoading && !error && mappedList}
            {!isLoading && mappedList?.length === 0 && (
              <p className="text-center text-lg text-gray-500">
                No properties found for "<span className="text-blue">{query}</span>".
              </p>
            )}
            {error && <Error />}
          </ul>
        </div>
      </section>
    </Fragment>
  );
};

export default Properties;
