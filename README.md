####EasyBackend- An open source backend replacement for parse.com
=======

#####Current Status

Under development


#####Features


Once in Bold are pending

* Creating Objects
* Retrieving Objects
  * Fetch by Id
  * Include child objects
* Updating Objects
  * Updating field values of an object with an id
  * Counters(__op:"Increment")
  * Updating Arrays
    * Add
    * AddUnique
    * Remove
  * Relations
    * AddRelation
    * RemoveRelation
  * Delete a single Field
* Delete Object
* Batch Operation
* Data Types
  * Date
  * Bytes
  * Pointer
  * Relation
* Queries
  * Basic Queries(without any constrains)
  * Query Constrains: where
    * exact match(directly provide the values)
    * $lte	Less Than Or Equal To
    * $gt	Greater Than
    * $gte	Greater Than Or Equal To
    * $ne	Not Equal To
    * $in	Contained In
    * $nin	Not Contained in
    * $exists	A value is set for the key
    * $select	This matches a value for a key in the result of a different query
    * $dontSelect	Requires that a key's value not match a value for a key in the result of a different query
    * $all	Contains all of the given values
  * order
    * by one field ascending and descending
    * by multiple fields
  * limit
  * skip
  * keys: select only certain fields
  * Queries on Array values
    * searching one value in a Array
    * $all
  * Relational Queries
    * __type = "Pointer"
    * $inQuery
    * $notInQuery
    * $relatedTo
    * include
      * one level
      * multilevel using dot notation
  * count
  * compound Queries
    * $or
* **Users**
* **Roles**
* **Files**
* **Analytics**
* **Push Notifications**
* **Installations**
* Cloud Code
* **Geo Points**


####Gettign Started

Dependencies
* MongoDB
* Node
 

Dowload / Clone the repository

cd in the folder

`>npm install`

configure the database name  
Go to file config/initializers/02_mongoose.js 
Edit this line

```javascript
var dbName = "backend"
var dbServerURL = 'mongodb://localhost/'; 
```
Set the dbName and the dbServerURL(if mongodb is hosted on different server).  

Start the server
`> lcm server`

In your web application include

```html
<script type="text/javascript" src="localhost:3000/parse-1.2.9"></script>
<script type="text/javascript">
  Parse.serverURL = 'http://localhost:3000' 
</script>
```
The Parse.serverURL points to the URL on which easybackend server is running.


#####Run Tests

go to http://localhost:3000/tests/index.html



