# Image Room - Workflow

## Workflow

1. Setup
    1. [Location](#setup-location)
    2. [Backup in cloud](#setup-backup-in-cloud)
    3. [Catalog LR](#setup-catalog-lightroom)
    4. [Presets](#setup-presets)

2. Project Preparation
    1. [Presets](#preparation-project-presets)
    2. [Album](#preparation-project-presets)
    3. [Share in LRCC](#share-album-in-lrcc)
    4. [Tethering](#prepare-tethering)
    5. [Schedule](#prepare-schedule)
    6. [IR settings](#image-room-settings)
    7. [Output Folder](#output-folder)

3. [Shooting](#shooting)

4. Sifting
    1. [Import photos](#import-photos)
    2. [Rich Info](#rich-Info)
    3. [Classify photos](#classify-photos)
    4. [Validate photos](#validate-photos)

5. Edition
    1. [6-RED-BASIC (composition + exposition + colors)](#basic-edition)
    2. [7-YELLOW-REFINE](#refine-edition)
    3. [8-GREEN-RECONCILIATION](#reconciliation-edition)
    4. [9-BLUE-TUNIG](#tuning-packs)
    5. [X-REMOVE-REJECTED](#remove-rejected)

6. Packing
    1. [Transition LRCC-LR](#transition-lrcc-lr)
    2. [Export full](#export-full)
    3. [Packing](#packing)


## Steps

### Setup Location
Create a root folder in your computer to keep your albums with your raw files in only one place >> ROOT_FOLDER.


### Setup backup in cloud
To configure a backup to sync ROOT_FOLDER in cloud, create an account in cloud to keep the backup and configure it to automatic sync files in the folder ROOT_FOLDER to upload into cloud.

PS: Normally accounts like Dropbox, Amazon or Google will be less expensive then by and manage backups in hard drives.


### Setup catalog Ligthroom
- check settings 'Automatically write changes into XMP'
- add folder ROOT_FOLDER to the catalog


### Setup presets
Configure global and usefull presets. See the exautive [presets](./presets.md) list.


### Preparation Project Presets
If the project has some needs different from global settings, prepare presets specific for the event, like watermarks and output formats.


### Prepare album
Create a new album in Ligthroom creating a new folder into ROOT_FOLDER respecting naming as

```
YYYYMMDD-album-subject
```


### Share album in LRCC
Create a collection from the album folder to sync it with LRCC. This step is important to make possible the colaborative work.


### Prepare tethering
Connect devices to theatring if is the case. It could make easy to import photos directly instead do it in lot with cards.


### Prepare schedule
[Media Manager](./personas.md#media-manager) prepare the project schedule, with :
- event agenda
- to do list (important clicks, important moments)


### Image Room Settings
[Media Manager](./personas.md#media-manager) prepare the Image Room settings (.irsettings file) with :
- output formats
- output package by keywords
- predefined keywords


### Output Folder
[Media Manager](./personas.md#media-manager) create a folder OUTPUT_<PROJECT_NAME>. Additionally, if the client has a cloud service, you can sync this folder with it.


### Shooting
[Sniper](./personas.md#sniper) and [pigeon](./personas.md#pigeon) work on field to create images and bring it back safelly to the [workbase](./personas.md#workbase). They try to optimize and follow all event agenda and complete the to do list. It could be done with some in many shifts or in only one shot.


### Import photos
[Pigeon](./personas.md#pigeon) can import reguraly using [copy-input](./presets.md#copy-input). Additionally you can set camera wifi to connect and send photos directly into the album folder.

PS : Since the album is connected to LRCC, after the import everybody will have access to the photos.


### Rich info
[Classer](./personas.md#classer) using **picRich** script will request from internet and IA systems classifications to each new photo and add those informations to the photos.

PS : To exchange keywords between LR and LRCC we use keywords in 'caption' field on LRCC separated by ','. It will be automatic imported as keyword during 'Import Info' process.


### Classify photos
[Classer](./personas.md#classer) using LRCC start to add/remove keywords to each photo manually.

PS : As we use 'caption' field to keep the keywords, we can run any time and many time we want the script **picConvertKeywords**, that will copy keywords in caption into the keywords readed by LR.


### Validate photos
[Sheriff](./personas.md#sheriff) using LRCC start to rate each photo. The photo start with 1 star and not flaged. The [sheriff](./personas.md#sheriff) has to set 
  - 0 : to archive photos that we can keep as backup but initially we will not use
  - 2 : to valid a photo as simple
  - 3 : to valid as recommended
  - 4 : to valid as selected
  - 5 : to valid as portfolio
  - p : to select a photo using selected flag
  - x : to reject a photo using rejected flag

PS : The validation process could be done in many iterations. For example, first passing by each photo to valid/archive. After passing by each validated photo to recommend someones. After passing through recommended to select someones...


### Basic edition
[Editor](./personas.md#editor) make basic edition regarding **composition**, **exposition** and **colors** for each photo using presets and other bat edition resources.


### Refine edition
[Editor](./personas.md#editor) pass for each photo making detailed edition, like burn and dodge, pincel editions, spot, filters... Some times in ligthroom or in photoshop.


### Reconciliation edition
[Editor](./personas.md#editor) make editions for some photos to equalize and harmonize all photos in package, making each photo compatible with others in term of photography aesthetics.


### Tuning packs
[Media Manager](./personas.md#media-manager) tunig selections, changing photo rates to optimize final packages. Final packages are :
- 0-*-ARCHIVED 
- 2-BLUE-VALIDATED
- 3-BLUE-RECOMENDED
- 4-BLUE-SELECTED
- 5-BLUE-PORTFOLIO


## Remove rejected
[Eye](./personas.md#eye) verify rejected and restore or remove definitivelly the rejected photos. Cmd+backspace is a shortcut to do it.


### Transition LRCC-LR
Until here the [editor](./personas.md#editor) could switch between LR or in LRCC. To continue and to the next steps we have to transite to LR. On this moment we propose to :
- verify if all photos are syncronized
- remove the catalog WIP, that is, stop share in LRCC
- remove album from LRCC
- run for the last time the script **picConvertKeywords**
- convert all ARCHIVED files to DNG with high compression
- convert all others files to DNG without compression

### Export full
[Media Manager](./personas.md#media-manager) export all 2-BLUE-VALIDATED photos, that is, all photos edited and finished with 2 or more then 2 stars.


### Packing
[Media Manager](./personas.md#media-manager) run the script **picPack** passing as parameter :
- -s image root settings
  > The recommendation is to keep .irsettings in the same folder to the digital negatives.

- -p full photos path

- -d delivery folder
  > The recommendation is to connect this folder to a cloud used by your client.

```
cd C:/partenaireX/

picPack -s .irsettings -p ./full/ -d C:/dropbox/partenaireX/
```
