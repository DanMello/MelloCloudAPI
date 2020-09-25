exports.init = function (req, res) {

  const csv = require('csvtojson');
  const filePath = '/home/deploy/mellocloud/api/files/free-zipcode-database.csv';

  // '/home/dan/Production/server-1/apps/mellocloud/MelloCloudAPI/files/free-zipcode-database.csv';
  // '/home/deploy/mellocloud/api/files/free-zipcode-database.csv';

  csv()
  .fromFile(filePath)
  .then(data => {
    const zipCodeOne = req.body.zipCodeOne;
    const zipCodeTwo = req.body.zipCodeTwo;
    const filteredZipCodeArray = data.filter(zipObj => zipObj.Zipcode === zipCodeOne || zipObj.Zipcode === zipCodeTwo);
    const zipCodeOneObj = filteredZipCodeArray.find(x => x.Zipcode === zipCodeOne);
    const zipCodeTwoObj = filteredZipCodeArray.find(x => x.Zipcode === zipCodeTwo);

    if (zipCodeOneObj === undefined || zipCodeTwoObj === undefined) {

      res.json({error: true, message: 'One or more of the zip codes are invalid, please double check and try again.'});
      
    } else {

      function toRadians(coordinate) {
        return Math.PI / 180 * coordinate;
      };
  
      const radiusInMiles = 3958.8;
      const radian1 = toRadians(zipCodeOneObj.Lat);
      const radian2 = toRadians(zipCodeTwoObj.Lat);
      const deltaLat = toRadians(zipCodeTwoObj.Lat - zipCodeOneObj.Lat);
      const deltaLong = toRadians(zipCodeTwoObj.Long - zipCodeOneObj.Long);
  
      const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(radian1) * Math.cos(radian2) *
              Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
      const d = radiusInMiles * c;
  
      res.json({distance: 
        `
          The distance between ${zipCodeOneObj.City}, ${zipCodeOneObj.State} and 
          ${zipCodeTwoObj.City}, ${zipCodeTwoObj.State} is ${d.toFixed(2)} miles.
        `
      });
    };
  });
};