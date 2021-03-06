var fs     = require('fs');
var mkdir  = require('mkdirp');
var _      = require('underscore');
var colors = require('colors');

/**
* Cache constructor to initialize the main cache folder
* Cache is a singleton initiated in the DC.js and used across all other modules
*
* @method Cache
* @param {String} folderName: the name with full path for the main cache folder
*/

function Cache(dirname, folderName) {

	var Cache = this;

	this.dirname            = dirname;
	this.cache_foldername   = dirname + folderName;

	this.createCacheFolder(this.cache_foldername, null, true);

	/**
	* Get the content of a cached file saved in the file system
	*
	* @method getCache
	* @param {String} cache_filename: the name of the file we want to read
	* @param {Function} callback: Returns the data if it has been already cached
	*                             Returns true error if the file has not been saved before
	*                             Quit the application after logging error message when error happens
	* @param {String} cache_folder: the name of the folder if it defers from the default cache folder
	*/

	this.getCache = function getCache(cache_filename, callback, cache_folder) {

		var cache_folder = cache_folder ? Cache.dirname + cache_folder : Cache.cache_foldername;
		cache_filename   = cache_folder + cache_filename + ".json";

		// Checks if the file has been already cached
		fs.exists(cache_filename, function(exists) {
			if (exists) {
				fs.readFile(cache_filename, 'utf8', function (error, data) {
					if (!error) {
						_.isObject(data) ? callback(null,data) : callback(null,JSON.parse(data));
					// If the read process failed return back with a false success for the callback
					} else {
						console.log(("Error Reading Cache from file: " + cache_filename + " with Error: " + error).red);
						process.exit(0);
					}
				});
				// The file has not been cached before
			} else callback(true);
		});
	}

	/**
	* Check if the file passed ahs been cached in the file system
	*
	* @method isCached
	* @param {String} cache_filename: the name of the file we want to read
	* @param {Function} callback: Returns true the data if it has been already cached
	*                             Returns false if the file has not been saved before
	*/

	this.isCached = function isCached(cache_filename, callback) {

		var cache_filename = Cache.dirname + "/" + cache_filename;

		// Checks if the file has been already cached
		fs.exists(cache_filename, function(exists) {
			exists ? callback(true) : callback(false);
		});
	}

	/**
	* Save a specific file as a JSON in the file system
	*
	* @method setCache
	* @param {String} cache_filename: The name of the file to be written
	* @param {Object} data: The file actual data to be written
	* @param {Function} callback: Returns True if the data has been successfully saved in the file system
	*                             Quit the application after logging error message when error happens
	*/

	this.setCache = function setCache(cache_filename, data, callback) {
		cache_filename = Cache.cache_foldername + cache_filename + ".json";

		var json 			 = _.isObject(data) ? data : JSON.parse(data);
		fs.writeFile(cache_filename, JSON.stringify(json, null, 4), function(error){
			if (!error) callback(null, true);
				else {
					console.log(("Error Writing Cache To file: " + cache_filename + " with Error: " + error).red);
					process.exit(0);
				}
		});
	}

	/**
	* Removes a file from the filesystem
	*
	* @method removeFile
	* @param {String} cache_filename: The file name of the file we wish to remove
	*/
	this.removeFile = function removeFile(cache_filename) {
		cache_filename = Cache.cache_foldername + cache_filename + ".json";
		fs.unlinkSync(cache_filename);
	}

	/**
	* Removes a folder from the filesystem
	*
	* @method removeFolder
	* @param {String} foldername: The file system path for the folder we wish to remove
	*/
	this.removeFolder = function removeFolder(foldername) {
		cache_name = Cache.cache_foldername + foldername;
		fs.rmdir(cache_name);
	}

};

	/**
	* create a cache folder inside the main cache that will be used to store data portals hierarchies
	*
	* @method createCacheFolder
	* @param {folder} folder: the name of the cache folder we want to create
	* @param {Function} callback: Returns True if the folder has been successfully created
	*                             Quit the application after logging error message when error happens
	* @param {Boolean} isRoot: check if the folder creation is the main root or a sub-folder
	* Returns the foldername if success or false if the creation process failed
	*/

	Cache.prototype.createCacheFolder = function createCacheFolder(folder, callback, isRoot) {
		// Check if the folder created is not the root, else append the root folder path
		var foldername   = isRoot ? folder : this.cache_foldername + folder ;
		mkdir(foldername, function (error) {
			if (callback) callback(null, foldername);
				else if (error){
						console.log(("Error creating cache folder: " + foldername + " with Error: " + error).red);
						process.exit(0);
				};
		});
	}

// Export the cache constructor from this module.
module.exports = Cache;