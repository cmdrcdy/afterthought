exports.handler = async function(event) {
  const query = event.queryStringParameters.query;
  const context = event.queryStringParameters.context || "";
  const url = "https://app.regrid.com/api/v2/parcels/address?query=" + encodeURIComponent(query) + (context ? "&context=" + context : "") + "&limit=1&return_matched_buildings=true&return_custom=true";
  
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + process.env.REGRID_KEY,
      "Accept": "application/json"
    }
  });
  const data = await response.json();
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};
