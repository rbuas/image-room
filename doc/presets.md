# Image Room - Presets



## metadata

### author
set author and copyright informations

### author-input
same as author with red flag and 1 star



## watermarks

### logo

### logo+year

### logo+slogan

### ref-date-author
```
<project><year> @ <photorgaphe>
```


## export
### 0-add-copy-dng
used to add a copy on dng format to the catalog, it name the copy with [rename-copy](#rename-copy)

### 0-add-copy-tiff
used to add a copy on tiff format to the catalog

### 1-full
generate full version for screens

### 2-web
2048 pixels long edge 100ppi and 100% quality

### 2-mobile
750 pixels long edge and 72ppi and 100% quality

### 2-thumb
200 pixels long edge and 72ppi and 50% quality

### 3-instagram
1024 pixels long edge and 72ppi and 100% quality



## import

### readd
used to only add a photo to a catalog without changes

### add-input
generelly used on imports when photos are already in album folder but starting each photo in the workflow (INPUT state)

### copy-input
generally used on imports directcly from cards. It will copy each photo into an album, start each photo on the workflow (INPUT state), additionally this process will rename each photo using 
[rename-id-date-seq](#rename-id-date-seq)



## rename

### rename-custom
used to rename completly without a predefined rule.

### rename-copy
used to make copies of a photo adding to it a custom extension and adding it to the catalog. Example : coping a photo 'RBUAS20180101-0001.dng' we will have a dialog to set the custom text, and if we set it as 'superedition' the copy will take the name 'RBUAS20180101-0001-superedition.dng'

### rename-version
used to make version from a photo. Example, if we generate web and full version from the photo 'RBUAS20180101-0001.dng' we could set the custom text to 'full' and the second time to 'web'. So we would get RBUAS20180101-0001.full.jpg and RBUAS20180101-0001.web.jpg

### rename-id-date-seq
used to give the standar name to each photo as : 
```
<CREATOR_ID><YYYYMMDD>-<SEQ0001>.<ext>

// example
RBUAS20180101-0001.dng
```



## filter (workflow)

### 00-ARCHIVED
0 star

### 01-INPUT-TOVALIDATE
1 start

### 02-VALIDATED
2 stars

### 03-RECOMENDED
3 stars

### 04-SELECTED
4 stars

### 05-PORTFOLIO
5 stars

### 06-RED-BASICEDITION
red >= 2 star

### 07-YELLOW-DETAILEDITION
yellow >= 2 stars

### 08-GREEN-RECONCILIATION
green >= 2 stars

### 09-BLUE-DONE-2-VALIDATED
blue >= 2 stars

### 09-BLUE-DONE-3-RECOMENDED
blue >= 3 stars

### 09-BLUE-DONE-4-SELECTED
blue >= 4 stars

### 09-BLUE-DONE-5-PORTFOLIO
blue >= 5 stars

### 10-PURPLE-AUX
purple >= 2 stars (used to keep original files in next to edited files, like when we edit in photoshop and we transform ours files to TIFF)

### 11-PICKED
any photo with pick flag

### 12-REJECTED
any photo with rejected flag

### 13-LOST
out of workflows



## filter (categories)

### Camera Info
Camera + Lens + Focal Length + Aperture + Shutter Speed + ISO Speed

### File Info
File type + Metadata status + Aspect ration

### Location Info
Country + State + City + Location

### File Info
Date + keyword + label + rating + flag
