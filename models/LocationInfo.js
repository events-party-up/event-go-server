
function LocationInfo(lat,lng,name,address) {

  this.lat = late;
  this.lng = lng;
  this.name = "";
  this.address = "";

  if (name != undefined) {
    this.name = name;
  }

  if (address != undefined) {
    this.address = address;
  }
}

module.exports = LocationInfo;
