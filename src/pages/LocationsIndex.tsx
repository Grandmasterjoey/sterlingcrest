import { Navigate } from "react-router-dom";

/** Location pages live on the main Guides index; keep /locations as a redirect for bookmarks. */
const LocationsIndex = () => <Navigate to="/resources" replace />;

export default LocationsIndex;
