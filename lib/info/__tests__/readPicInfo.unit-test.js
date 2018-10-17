const { readPicInfo, setTracer } = require('../..');

const {
  RBUAS20150310,
  RBUAS20160727,
  RBUAS20161022,
  RBUAS20180601DNG,
  RBUAS20180601FULL,
  RBUAS20180601MOBILE,
} = require('./helpers');

setTracer(false);

describe('readPicInfo', () => {
  it('should read a file info from RBUAS20150310', async () => {
    const info = await readPicInfo(RBUAS20150310);
    expect(info).toMatchObject({
      Format: 'image/jpeg',
      RawFileName: 'RBUAS20150310-0052.jpg',
      ImageSize: '1536x2048',
      ImageWidth: '1536',
      ImageHeight: '2048',
      Orientation: 'Vertical',
      XResolution: 100,
      YResolution: 100,
      ResolutionUnit: 'inches',
      ExposureProgram: 'Manual',
      ISO: 100,
      ExposureTime: '1/125',
      FNumber: 8,
      MaxApertureValue: 4,
      FocalLength: '32.0 mm',
      Lens: 'EF24-105mm f/4L IS USM',
      Model: 'Canon EOS 7D',
      HyperfocalDistance: '6.69 m',
      Copyright: 'rbuas',
      Rights: 'rbuas',
      Artist: 'Rodrigo Buás',
      Creator: 'Rodrigo Buás',
      URL: 'rbuas.com/copyright',
      UsageTerms: 'All rights reserved.',
      CreatorWorkEmail: 'rodrigobuas@gmail.com',
      CreatorWorkURL: 'rbuas.com',
      Rating: 4,
      Label: 'Blue',
      Keywords: [2015, 'Efet', 'Luna Ornellas', 'Paris', 'dance', 'rbuas', 'shadow'],
      Title: '',
    });
  });

  it('should read the raw info (without filter) from RBUAS20150310', async () => {
    const info = await readPicInfo(RBUAS20150310, null);
    const infoCount = Object.keys(info).length;
    expect(infoCount).toBe(240);
    expect(info.Format).toBeDefined();
    expect(info.FNumber).toBe(8);
  });

  it('should read and filter the info from RBUAS20150310', async () => {
    const info = await readPicInfo(RBUAS20150310, ['FNumber']);
    const infoCount = Object.keys(info).length;
    expect(infoCount).toBe(1);
    expect(info.Format).not.toBeDefined();
    expect(info.FNumber).toBe(8);
  });

  it('should read and filter an array of images', async () => {
    const infos = await readPicInfo([RBUAS20150310, RBUAS20160727], ['FNumber']);
    expect(infos).toHaveLength(2);
    expect(infos[0].FNumber).toBe(8);
    expect(infos[1].FNumber).toBe(7.1);
  });

  it('should read a file info from RBUAS20160727', async () => {
    const info = await readPicInfo(RBUAS20160727);
    expect(info).toMatchObject({
      ImageSize: '1365x2048',
      ImageWidth: '1365',
      ImageHeight: '2048',
      Orientation: 'Vertical',
      Flash: 'Off, Did not fire',
      FocalLength: '70.0 mm',
      Lens: 'EF70-200mm f/2.8L USM',
      Model: 'Canon EOS 5D Mark III',
      HyperfocalDistance: '64.61 m',
      FOV: '10.4 deg',
      ApproximateFocusDistance: 3.82,
      Keywords: 'rbuas',
    });
  });

  it('should read a file info from RBUAS20161022', async () => {
    const info = await readPicInfo(RBUAS20161022);
    expect(info).toMatchObject({
      Rating: 3,
      Label: 'Green',
      Keywords: ['key1', 'key2', 'key3', 'rbuas'],
      Subject: ['key1', 'key2', 'key3', 'rbuas'],
      Description: 'vu de la fenetre vers une poubelle à longueville',
      Title: 'poubelle à longueville',
    });
  });

  it('should read a file info from RBUAS20180601DNG', async () => {
    const info = await readPicInfo(RBUAS20180601DNG);
    expect(info).toMatchObject({
      Copyright: 'rbuas',
      Rights: 'rbuas',
      Artist: 'Rodrigo Buás',
      Creator: 'Rodrigo Buás',
      UsageTerms: 'All rights reserved.',
      CreatorWorkEmail: 'rodrigobuas@gmail.com',
      CreatorWorkURL: 'rbuas.com',
      Rating: 4,
      Label: 'Blue',
      Keywords: [
        'Lausanne',
        'Suisse',
        'classique',
        'danse',
        'igokat',
        'le carnaval des animaux',
        'rbuas',
      ],
    });
  });

  it('should read a file info from RBUAS20180601JPG', async () => {
    const info = await readPicInfo(RBUAS20180601FULL);
    expect(info).toMatchObject({
      ExposureProgram: 'Manual',
      ISO: 800,
      ExposureTime: '1/200',
      FNumber: 1.8,
      MaxApertureValue: 1.4,
      Flash: 'Off, Did not fire',
      FocalLength: '85.0 mm',
      Lens: '85mm F1.4 DG HSM | Art 016',
      Model: 'Canon EOS 5D Mark III',
      HyperfocalDistance: '133.59 m',
      FOV: '23.9 deg',
      ApproximateFocusDistance: 1.46,
      Copyright: 'rbuas',
      Rights: 'rbuas',
      Artist: 'Rodrigo Buás',
      Creator: 'Rodrigo Buás',
      URL: 'rbuas.com/copyright',
      UsageTerms: 'All rights reserved.',
      CreatorWorkEmail: 'rodrigobuas@gmail.com',
      CreatorWorkURL: 'rbuas.com',
      Rating: 4,
      Label: 'Blue',
      Keywords: [
        'Lausanne',
        'Suisse',
        'classique',
        'danse',
        'igokat',
        'le carnaval des animaux',
        'rbuas',
      ],
      Description: 'Les pointes sur la table',
      Title: 'Preparation',
    });
  });

  it('should compare DNG and JPG', async () => {
    const infoDNG = await readPicInfo(RBUAS20180601DNG);
    const infoJPG = await readPicInfo(RBUAS20180601FULL);
    expect(infoDNG.Keywords).toEqual(infoJPG.Keywords);
    expect(infoDNG.Orientation).toEqual(infoJPG.Orientation);
    expect(infoDNG.Rating).toEqual(infoJPG.Rating);
    expect(infoDNG.Title).toEqual(infoJPG.Title);
    expect(infoDNG.Label).toEqual(infoJPG.Label);
    expect(infoDNG.Description).toEqual(infoJPG.Description);
    expect(infoDNG.Copyright).toEqual(infoJPG.Copyright);
    expect(infoDNG.Format).toEqual('image/dng');
    expect(infoJPG.Format).toEqual('image/jpeg');
  });

  it('should compare JPG in different resolutions', async () => {
    const infoFULL = await readPicInfo(RBUAS20180601FULL);
    const infoMOBILE = await readPicInfo(RBUAS20180601MOBILE);
    expect(infoFULL.Keywords).toEqual(infoMOBILE.Keywords);
    expect(infoFULL.Label).toEqual(infoMOBILE.Label);
    expect(infoFULL.Lens).toEqual(infoMOBILE.Lens);
    expect(infoFULL.Rating).toEqual(infoMOBILE.Rating);
  });
});
