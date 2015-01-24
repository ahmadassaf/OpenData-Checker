
# Roomba
### Automatic Validation, Correction and Generation of Dataset Metadata

Linked Open Data (LOD) has emerged as one of the largest collection of interlinked datasets on the web. Benefiting from this mine of data requires the existence of descriptive information about each dataset in the accompanying metadata. Such meta information is currently very limited to few data portals where they are usually provided manually thus giving little or bad quality insights. To address this issue, we propose a scalable automatic approach for extracting, validating and generating descriptive linked dataset profiles. This approach applies several techniques to check the validity of the attached metadata as well as providing descriptive and statistical information of a certain dataset as well as a whole data portal. Using our framework on prominent data portals shows that the general state of the Linked Open Data needs attention as most of datasets suffer from bad quality metadata and lack additional informative metrics.

**Note**
This application is designed for the command line (CLI) and is built using [node.js](http://nodejs.org)

## Architecture

![Roomba Architecture](https://www.dropbox.com/s/iqfcw9ykrblr7ym/figure-1_architecture.png?dl=1)

### Data Portal Identification

Data portals can be considered as data access points providing tools to facilitate data publishing, sharing, searching and visualization. [CKAN](http://ckan.org) is the world's leading open-source data portal platform powering websites like the DataHub, Europe's Public Data and the U.S Government's open data. Modeled on CKAN, [DKAN](http://drupal.org/project/dkan) is a standalone Drupal distribution that is used in various public data portals as well.
Identifying the software powering data portals is a vital first step to understand the API calls structure. Web scraping is a technique for extracting data from Web pages. We rely on several scraping techniques in the identification process which includes a combination of the following:

- **URL inspection**: Check the existence of certain URL patterns.
- **Meta tags inspection**: For example, `meta[content*="ckan]` (all meta tags with the attribute content containing the string `CKAN`). This selector can identify CKAN portals whereas the `meta[content*="Drupal"]` can identify DKAN portals.
- **Document Object Model (DOM) inspection**: Similar to the meta tags inspection, we check the existence of certain DOM elements or properties.

The identification process for each portal can be easily customized by overriding the `prototype.check` function for each parser. Moreover, adding or removing steps from the identification process can be easily configured.

### Metadata Extraction

Data portals expose a set of information about each dataset as metadata. The model used varies across portals. However, a standard model should contain information about the dataset's title, description, maintainer email, update and creation date, etc.

Although Roomba is generic and accepts any data model to check against, for the moment we have used the the [CKAN standard model](http://goo.gl/8RofC8).

After identifying the underlying portal software, we perform iterative queries to the API in order to fetch datasets metadata and persist them in a file-based cache system.
Depending on the portal software we can issue specific extraction jobs. For example, in CKAN based portals, we are able to crawl and extract the metadata of a specific dataset, all the datasets in a specific group e.g. LOD Cloud or all the datasets in the portal.

### Instance and Resource Extraction

From the extracted metadata we are able to identify all the resources associated with that dataset. They can have various types like a SPARQL endpoint, API, file, visualization ,etc. However, before extracting the resource instance(s) we perform the following steps:

- **Resource metadata validation and enrichment**: Check the resource attached metadata values. Similar to the dataset metadata, each resource should include information about its mimetype, name, description, format, valid dereferenceable URL, size, type and provenance. The validation process issue an HTTP request to the resource and automatically fills up various missing information when possible, like the mimetype and size by extracting them from the HTTP response header. However, missing fields like name and description that needs manual input are marked as missing and will appear in the generated summary report.
- **Format validation**: Validate specific resource formats against a linter or a validator.

### Profile Validation

Metadata validation process identifies missing information and the ability to automatically correct them. Each set of metadata (general, access, ownership and provenance) is validated and corrected automatically when possible. Each profiler task has a set of metadata fields to check against. The validation process check if each field is defined and if the value assigned is valid.

There exist a bunch of special validation steps for various fields. For example, for ownership information where the maintainer email has to be defined, the validator checks if the email field is an actual valid email address. A similar process is done to URLs whenever found. However, we also issue an HTTP `HEAD` request in order to check if that URL is reachable or not. For the dataset resources, we use the `content-header` information when the request is successfull in order to extract, compare and correct further metadata values like mimetype and content size.

```
A preview of the event-media dataset metadata
```

```json
"author": "Raphael Troncy",
        "author_email": "raphael.troncy@eurecom.fr",
        "state": "active",
        "version": "2010-09-01 (0.1)",
        "license_id": "cc-by-sa",
        "type": "dataset",
        "resources": [
            {
                "mimetype": "",
                "cache_url": ""
                "mimetype_inner": "",
                "hash": "",
                "description": "LODE ontology",
                "format": "meta/rdf-schema",
```

## How to run ?

You can either download this repo as a zip file or clone directly through git. Pay attention when cloning as there is a `submodule` defined and has to be cloned recursively as well. This can be done via:
```shell
git clone --recursive http://github.com/ahmadassaf/opendata-checker
```

**Note** If you have cloned without --recursive, you may find out that some folders are empty. To fix this:

`git submodule update --init`

Now, you will need to install the dependecies:

```javascript
\\ Downloading the required modules 
npm intall
\\ After the installation finish start the application
node DC.js
```

### Options
There are a set of options that you can customize. They can be edited from `options.json` file:

```json
{
    "locale"         : "en",
    "cacheFolderName": "/cache/",
    "licensesFolder" : "/util/licenses/",
    "mappingFileName": "licenseMappings",
    "proxy"          : ""
}
```

- `locale` the language of the messages and the prompts. Default:`en`
- `cacheFolderName` the name of cache folder separated by `/`. Default:`/cache/`
- `licensesFolder` the location of the [Open Licenses Repo](https://github.com/okfn/licenses). It is defined as a submodule and by default it is located in `/util/licenses/`
- `mappingFileName` the name of manual license mappings. Default:`licenseMappings`
- `proxy` proxy server e.g. `proxy:8080`. Default:`null`

### Localization

If you wish to translate the messages and prompts into other languages than English. You have to create a new language entry in the `util/messages.js` with the new locale code e.g. `fr`. Afterwards, you should keep the object keys intact by translate the values into the desired language. For example:

```javascript
var messages =   {
    "en": {
        "error" : {
            "unKnownError" : "An unknown Error occurred .. ",
            .
            .
    "fr": {
        "error" : {
            "unkownError" : "Erreur inconnue .."
        }
    }
```

## How to use ?

Roomba gives you the ability to perform the following:

- Fetch all the information about datasets from a data portal
- Fetch all the groups information from a data portal
- Crawl datasets (a specific dataset, datasets in a specific group, datasets in the whole portal)
- Execute aggregation report on a specific group or on the whole data portal
- Profile a specific dataset, a whole group or the whole data portal

![How to use](http://g.recordit.co/NZjLBhbFH7.gif)

**A screencast is available on: http://youtu.be/p7Y-mDN_Y2s**

### Report Generation

Data portal administrators need to have an overview of the datasets in their portal or in a specific group. The reporting tool gives the freedom for admins to execute various types of queries and mining information about the datasets. The reports are of three types:

- **meta-field values** report: Aggregate all the values of a certain `key` e.g. `license_title` will aggregate all the licenses titles        
- **key:object meta-field values** report: Aggregate all the values of a certain key with an aggregate of another field as its object. e.g. `license_title:title` will aggregate all the license titles used and also will aggregate all the titles for all the datasets using that license title
- **Check Empty field values** report: Check all the datasets containing an empty value of the passed field key

![report](http://g.recordit.co/919rHoQtDe.gif)

### Profile Generation

The generated profile contains the information spotted in the profile as well as general statistics for them.

![profile](http://g.recordit.co/aFvscpqfcv.gif)

