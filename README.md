# Elastic-Blog
A simple blog website using total.js and elastic-search.

## Releases

* [Version 2015.03](https://github.com/neonnds/Elastic-Blog/elastic-blog-2015-03.tar.gz)


## Getting Started

Get ElasticSearch from the offical site

    $> wget https://github.com/neonnds/Elastic-Blog/elastic-blog-2015-03.tar.gz
    
Extract ElasticSearch

    $> tar -zxf elastic-blog-2015-03.tar.gz
    
Enter the Elastic-Blog project

    $> cd ./Elastic-Blog

Start Elastic Search

    $> ./elasticsearch-1.5.0/bin/elasticsearch

Start Elastic-Blog

    $> ./run elastic-blog


## Development

### Requirements

* [Elastic-Core](https://github.com/neonnds/Elastic-Core)

### Linux Installation

Enter the Elastic-Core project sites directory

    $> cd ./Elastic-Core/sites

Get the Elastic-Blog project

    $> git clone https://github.com/neonnds/Elastic-Blog.git

Enter the Elastic-Blog project

    $> cd ./Elastic-Blog

Install the following node modules

    $> npm install bcrypt-nodejs --save
