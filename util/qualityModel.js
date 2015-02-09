function qualityModel() {
   return {
   "completeness": {
      "QI.1": {
         "description": "Existence of supporting structured metadata",
         "weight": 1,
         "score": 0
      },
      "QI.2": {
         "description": "Supports multiple serializations",
         "weight": 1,
         "score": 0
      },
      "QI.3": {
         "description": "Has different data access points",
         "weight": 1,
         "score": 0
      },
      "QI.4": {
         "description": "Uses datasets description vocabularies",
         "weight": 1,
         "score": 0
      },
      "QI.5": {
         "description": "Existence of descriptions about its size",
         "weight": 1,
         "score": 0
      },
      "QI.6": {
         "description": "Existence of descriptions about its structure (MIME Type, Format)",
         "weight": 1,
         "score": 0
      },
      "QI.7": {
         "description": "Existence of descriptions about its organization and categorization",
         "weight": 1,
         "score": 0
      },
      "QI.8": {
         "description": "Existence of information about the kind and number of used vocabularies",
         "weight": 1,
         "score": 0
      },
      "QI.9": {
         "description": "Existence of dereferencable links for the dataset and its resources",
         "weight": 1,
         "score": 0
      }
   },
   "availability": {
      "QI.19": {
         "description": "Existence of an RDF dump that can be downloaded by users",
         "weight": 1,
         "score": 0
      },
      "QI.20": {
         "description": "Existence of queryable endpoints that respond to direct queries",
         "weight": 1,
         "score": 0
      },
       "QI.21": {
         "description": "Existence of valid dereferencable URLs (respond to HTTP request)",
         "weight": 1,
         "score": 0
      }
   },
   "licensing": {
      "QI.22": {
         "description": "Existence of human and machine readable license information",
         "weight": 1,
         "score": 0
      },
      "QI.23": {
         "description": "Existence of dereferencable links to the full license information",
         "weight": 1,
         "score": 0
      },
      "QI.24": {
         "description": "Specifies permissions, copyrights and attributions",
         "weight": 1,
         "score": 0
      }
   },
   "freshness": {
      "QI.25": {
         "description": "Existence of timestamps that can keep track of its modifications",
         "weight": 1,
         "score": 0
      }
   },
   "correctness": {
      "QI.26": {
         "description": "Includes the correct MIME type for the content",
         "weight": 1,
         "score": 0
      },
      "QI.27": {
         "description": "Includes the correct size for the content",
         "weight": 1,
         "score": 0
      },
      "QI.28": {
         "description": "Absence of syntactic errors on the instance level",
         "weight": 1,
         "score": 0
      },
      "QI.29": {
         "description": "Absence of Syntactic errors on the links level",
         "weight": 1,
         "score": 0
      }
   },
   "comprehensibility": {
      "QI.37": {
         "description": "Existence of at least one exemplary URI",
         "weight": 1,
         "score": 0
      },
      "QI.38": {
         "description": "Existence of at least one exemplary SPARQL Query",
         "weight": 1,
         "score": 0
      },
      "QI.39": {
         "description": "Existence of general information (title, URL, description) for the dataset",
         "weight": 1,
         "score": 0
      },
      "QI.40": {
         "description": "Existence of mailing list, message board or point of contact",
         "weight": 1,
         "score": 0
      }
   },
   "provenance": {
      "QI.40": {
         "description": "Existence of metadata that describes its authoritative information",
         "weight": 1,
         "score": 0
      },
      "QI.41": {
         "description": "Usage of provenance vocabulary",
         "weight": 1,
         "score": 0
      },
      "QI.42": {
         "description": "Usage of provenance timestamps",
         "weight": 1,
         "score": 0
      }
   },
   "security": {
      "QI.43": {
         "description": "Uses login credentials to restrict access",
         "weight": 1,
         "score": 0
      },
      "QI.44": {
         "description": "Uses SSL or SSH to provide access to the dataset",
         "weight": 1,
         "score": 0
      }
   }
}
}

module.exports = qualityModel;