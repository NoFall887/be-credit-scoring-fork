// import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "@utils/constant";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    // cloud_name: CLOUDINARY_CLOUD_NAME,
    // api_key: CLOUDINARY_API_KEY,
    // api_secret: CLOUDINARY_API_SECRET,
    cloud_name: "dgmknbm2h",
    api_key: "747897534543522",
    api_secret: "O3M3qaUmj4iV4mZreBDhzoOHRb4",
});

export default cloudinary;
