var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

//setter utilities
var toNumber = function(i) {
    return i.replace(/[\D]/g, '');
};
var toDate = function(str) {
  var dateArr = str.split(/[-/]/g);
  var date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  return date;
};
var cleanString = function(str) {
 return str.replace(/[<>\t\n\r,]/g,'');
};


var KopernikForm = new Schema({
  id: ObjectId,
  sent: {type: Boolean, default: false}, //for state managing
  addressLine1: { type: String, default: 'Address 1 N/A', set: cleanString },
  addressLine2: { type: String, default: 'Address 2 N/A', set: cleanString },
  addressLine3: { type: String, default: 'Address 1 N/A', set: cleanString },
  addressLine4: { type: String, default: 'Address 2 N/A', set: cleanString },
  addressLine5: { type: String, default: 'Address 1 N/A', set: cleanString },
  addressLine6: { type: String, default: 'Address 2 N/A', set: cleanString },
  date: { type: Date, set: toDate },
  gender: { type: String, default: 'Gender N/A', set: cleanString },
  installmentPrice1: { type: String, default: 0, set: toNumber },
  installmentPrice2: { type: String, default: 0, set: toNumber },
  installmentPrice3: { type: String, default: 0, set: toNumber },
  installmentPrice4: { type: String, default: 0, set: toNumber },
  kioskID: { type: String, default: 'TK-XXXX', set: cleanString },
  kioskAgentName: { type: String, default: 'Sub agent N/A', set: cleanString },
  kioskSubID: { type: String, default: 'TK-XXXX', set: cleanString },
  kwitNumber: { type: String, default: 0, set: toNumber },
  name: { type: String, default: 'Client name N/A', set: cleanString },
  price1: { type: String, default: 0, set: toNumber },
  price1Amount: { type: String, default: 0, set: toNumber },
  price2: { type: String, default: 0, set: toNumber },
  price2Amount: { type: String, default: 0, set: toNumber },
  price3: { type: String, default: 0, set: toNumber },
  price3Amount: { type: String, default: 0, set: toNumber },
  products1: { type: String, default: 'Produk 1 N/A', set: cleanString },
  products2: { type: String, default: 'Produk 2 N/A', set: cleanString },
  products3: { type: String, default: 'Produk 3 N/A', set: cleanString },
  saleTotal: { type: String, default: 0, set: toNumber },
  serialNumber1: { type: String, default: 'SN 1 N/A', set: cleanString },
  serialNumber2: { type: String, default: 'SN 2 N/A', set: cleanString },
  serialNumber3: { type: String, default: 'SN 3 N/A', set: cleanString },
  telNumber: { type: String, default: 'Nomor telepon N/A', set: cleanString},
  totalPrice1:  { type: String, default: 0, set: toNumber },
  totalPrice2:  { type: String, default: 0, set: toNumber },
  totalPrice3:  { type: String, default: 0, set: toNumber }
});

module.exports = {
  location: process.env.DB || 'mongodb://localhost/test',
  schema: KopernikForm,
  apikey: process.env.APIKEY || 'test'
};
