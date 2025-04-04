import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RiHotelBedFill } from "react-icons/ri";
import { FaBath } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import defaultLogo from "../../assets/Blog1.jpg";
import { Link } from "react-router-dom";
import Icon from "../../assets/userIcon.png"

const PropertyDetailItems = ({
  id,
  price,
  address,
  numOfBed,
  numOfBath,
  image,
  state,
  rentType,
  description,
  amenities,
  photos,
  phoneNumber,
  agencyName,
  contactName,
  logo,
  reviews
}) => {
  const photoUrls = photos?.map((photo) => photo.imageUrl) || [];
  const [chosenPhoto, setChosenPhoto] = useState(photoUrls[0] || image);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <div className="w-full lg:w-auto m-0 lg:m-2 flex flex-col bg-white rounded-3xl shadow-md">
        <div>
          <div className="py-2 px-2">
            <div className="w-auto p-1">
              <p className="font-Poppins text-xs lg:text-lg lg:font-medium rounded-full text-[#22c55e] absolute bg-white p-2 py-1 lg:px-6 mt-2 ml-2">
                {state}
              </p>
              <img
                className="h-60 md:h-72 lg:h-[25rem] xl:h-[30rem] w-full object-cover rounded-2xl"
                src={chosenPhoto || image}
                alt="real estate"
              />
            </div>
            <div className="my-2 mx-1">
              <div className="flex overflow-scroll">
                {photoUrls.map((snap, index) => (
                  <img
                    key={index}
                    onClick={() => setChosenPhoto(snap)}
                    alt="Property"
                    src={snap}
                    className="h-28 w-auto px-1 cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <div className="px-1 mt-2 mb-1">
              <div className="flex items-center mt-6">
                <div className="mr-2 md:mr-4">
                  <HiOutlineLocationMarker className="font-Poppins text-ash text-sm md:text-lg lg:text-xl" />
                </div>
                <h1 className="font-Poppins text-sm md:text-lg lg:text-2xl text-ash capitalize">
                  {address}
                </h1>
              </div>
              <div className="flex flex-wrap justify-center my-2">
                {amenities?.map((feature, index) => (
                  <span
                    key={index}
                    className="font-Poppins text-center bg-liteBlue text-[8px] lg:text-[10px] mx-1 p-[2px] my-[2px] lg:my-0 px-2 rounded-full text-white"
                  >
                    {feature.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center px-4 md:mx-32 lg:mx-52 xl:mx-60 py-1 my-2 mb-16">
            <h1 className="font-Poppins text-md md:text-lg lg:text-xl text-white font-semibold py-1 px-5 bg-blue rounded-lg">
              {`Rs ${price}`}
              <span className="font-Poppins text-white text-base font-medium">
                /{rentType}
              </span>
            </h1>
          </div>
          <div>
            <div className="flex justify-center items-center mb-10">
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
              <h1 className="font-Poppins uppercase font-bold text-xl text-blue mx-0 md:mx-10 text-center">
                Broker's Details
              </h1>
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
            </div>

            {!isAuthenticated && (
              <div className="flex flex-wrap items-center justify-between mb-10 bg-silver md:px-10 lg:px-20">
                <div className="font-Poppins flex flex-col text-blue w-full md:w-[60%] px-6 pb-10 md:p-0">
                  <div>
                    <h4 className="text-base md:text-xl mb-4">
                      <span className="font-semibold mr-4">Agency:</span>
                      {agencyName}
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-base md:text-xl mb-4">
                      <span className="font-semibold mr-4">Contact:</span>
                      {phoneNumber || "Unavailable"}
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-base md:text-xl mb-4">
                      <span className="font-semibold mr-4">Contact Person:</span>
                      {contactName}
                    </h4>
                  </div>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <div className="bg-silver mb-10 text-blue font-medium">
                <h4 className="text-center py-10 font-Poppins">
                  <Link to="/login">
                    <button className="bg-blue text-white py-1 px-3 rounded-lg shadow-lg">
                      Login
                    </button>
                  </Link>
                  to view broker's details
                </h4>
              </div>
            )}
          </div>

          <div className="mx-8 mb-6 overflow-hidden">
            <div className="flex justify-center items-center mb-4">
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
              <h1 className="font-Poppins uppercase font-bold  text-xl text-blue mx-0 md:mx-10 text-center">
                About this property
              </h1>
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
            </div>
            <p className="font-Poppins text-ash text-justify">
              {description} {state}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mx-8 mb-6 overflow-hidden">
            <div className="flex justify-center items-center mb-4">
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
              <h1 className="font-Poppins uppercase font-bold text-xl text-blue mx-0 md:mx-10 text-center">
                Reviews
              </h1>
              <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
            </div>
            <div className="mx-8 mb-6 overflow-hidden">
              <div className="flex justify-center items-center mb-8">
                <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
                {/* <h1 className="font-Poppins uppercase font-bold text-2xl text-blue mx-0 md:mx-10 text-center">
                  Reviews
                </h1> */}
                <hr className="w-20 md:w-30 lg:w-52 text-[#ebebeb]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="mb-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <img
                            src={review.photo_url ? review.photo_url.replace('=s128', '=s400') : Icon}
                            alt={`${review.displayName}'s photo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{review.displayName}</h3>
                          {console.log(review.rating)
                          }
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => {
                              const isFilled = review?.rating && i < review.rating;
                              return (
                                <svg
                                  key={i}
                                  className="w-4 h-4 ms-1"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={isFilled ? "#FACC15" : "#D1D5DB"}
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 
        1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 
        9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 
        1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 
        2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 
        0 0 .387-1.575Z"/>
                                </svg>
                              );
                            })}
                            <span className="ml-2 text-sm text-gray-500">
                              {review?.relativePublishTime ?? "N/A"}
                            </span>
                          </div>


                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 p-6 bg-white rounded-lg shadow text-center">
                    <p className="text-gray-600">No reviews available yet. Be the first to leave a review!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PropertyDetailItems;
