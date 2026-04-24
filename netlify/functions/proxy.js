exports.handler = async function(event) {
  const target = event.queryStringParameters.target;
  const params = { ...event.queryStringParameters };
  delete params.target;
  const qs = new URLSearchParams(params).toString();
  
  let url;
  if (target === "census") {
    url = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?" + qs + "&benchmark=2020&format=json";
  } else if (target === "polaris") {
    url = "https://casoilresource.lawr.ucdavis.edu/api/soil-series/?" + qs;
  } else if (target === "drought") {
    url = "https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByArea?" + qs;
  } else {
    return { statusCode: 400, body: "Unknown target" };
  }
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: text
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: e.message })
    };
  }
};
