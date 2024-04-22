import { ReportHandler, getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    await getCLS(onPerfEntry);
    await getFID(onPerfEntry);
    await getFCP(onPerfEntry);
    await getLCP(onPerfEntry);
    await getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
