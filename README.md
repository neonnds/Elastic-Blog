# Elastic-Blog
A simple blog website using total.js and couchbase.

## Releases

* [Version 2015.03](https://github.com/neonnds/Elastic-Blog/elastic-blog-2015-03.tar.gz)
* [Version 2015.04](https://github.com/neonnds/Elastic-Blog/elastic-blog-2015-04.tar.gz)
* [Version 2015.05](https://github.com/neonnds/Elastic-Blog/elastic-blog-2015-05.tar.gz)

## Getting Started

Get Elastic Blog

    $> wget https://github.com/neonnds/Elastic-Blog/raw/master/elastic-blog-2015-12.tar.gz
    
Extract Elastic Blog

    $> tar -zxf elastic-blog-2015-12.tar.gz
    
Enter the Elastic-Blog project

    $> cd ./elastic-blog-2015-12

Get Couchbase from the offical site, install and run

    https://www.couchbase.com/

Start Elastic-Blog

    $> nodejs index.js
    
Visit in a modern web browser:

    http://127.0.0.1:8000/


## Development

### Requirements

* [Elastic-Core](https://github.com/neonnds/Elastic-Core)

* [CUID](https://github.com/ericelliott/cuid)

* [Rho.js](http://inca.github.io/rho)


### Linux Installation

Enter the Elastic-Core project sites directory

    $> cd ./Elastic-Core/sites

Get the Elastic-Blog project

    $> git clone https://github.com/neonnds/Elastic-Blog.git

Enter the Elastic-Blog project

    $> cd ./Elastic-Blog

Install the following node modules

    $> npm install bcrypt-nodejs --save
    
    $> npm install cuid --save
    
    $> npm install rho --save

    $> npm install crypto --save

    $> npm install nodemailer --save

Enter the Elastic-Core project

    $> cd ./Elastic-Core
    
Start Elastic-Blog

    $> ./run Elastic-Blog
