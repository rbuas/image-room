const resourceFile = (picName) => `${__dirname}/resources/${picName}`;

module.exports = {
  resourceFile,
  RBUAS20150310: resourceFile('RBUAS20150310-0052.jpg'),
  RBUAS20150310SYNC: resourceFile('RBUAS20150310-0052-sync.jpg'),
  RBUAS20160727: resourceFile('RBUAS20160727-0414-1.jpg'),
  RBUAS20161022: resourceFile('RBUAS20161022-0034.jpg'),
  RBUAS20180601DNG: resourceFile('RBUAS20180601-0025.dng'),
  RBUAS20180601FULL: resourceFile('RBUAS20180601-0025.full.jpg'),
  RBUAS20180601MOBILE: resourceFile('RBUAS20180601-0025.mobile.jpg'),
};
