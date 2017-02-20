# Elastic-Blog
A simple blog website using total.js and couchbase.

## Latest Release

* [Version 2017.02](https://github.com/neonnds/Elastic-Blog/elastic-blog-2017-02.tar.gz)

## Getting Started

Get Elastic Blog

    $> wget https://github.com/neonnds/Elastic-Blog/raw/master/elastic-blog-2017-02.tar.gz
    
Extract Elastic Blog

    $> tar -zxf elastic-blog-2017-02.tar.gz
    
Enter the Elastic-Blog project

    $> cd ./elastic-blog-2017-02
    
Install the following node modules from packages.json

    $> npm install

Get Couchbase from the offical site, install and run

    https://www.couchbase.com/
    
Start Elastic-Blog

    $> node index.js
    
Visit in a modern web browser:

    http://127.0.0.1:8000/


## Linux Development Installation

Get the Elastic-Core project

    $> git clone https://github.com/neonnds/Elastic-Core.git
    
Enter the Elastic-Core project

    $> cd ./Elastic-Core
    
Install the following node modules from packages.json

    $> npm install

Enter the Elastic-Core project sites directory

    $> cd ./Elastic-Core/sites

Get the Elastic-Blog project

    $> git clone https://github.com/neonnds/Elastic-Blog.git

Enter the Elastic-Blog project

    $> cd ./Elastic-Core/sites/Elastic-Blog

Install the following node modules from packages.json

    $> npm install

Enter the Elastic-Core project

    $> cd ./Elastic-Core
    
Start Elastic-Blog

    $> ./run Elastic-Blog
