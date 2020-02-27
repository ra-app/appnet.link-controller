# iwebpp.io-controller
iWebPP.IO controller serivices to support [iwebpp.io protocol](https://github.com/InstantWebP2P/iwebpp.io)


### [Discussion group](https://groups.google.com/d/forum/iwebpp)


### Install/Usage

* iwebpp.io-controller depends on node-httpp, please build it from repo [node-httpp](https://github.com/InstantWebP2P/node-httpp.git)
* clone this repo and npm install in root directory
* install Neo4j graphDB, then start Neo4j service. refer to [Running Neo4j](https://github.com/neo4j/neo4j)

` bin/neo4j start `

* start controller services

` ~/node-httpp/node ./bin/srv.js `

* now ready to serve [iwebpp.io client](https://github.com/InstantWebP2P/iwebpp.io)


### Code structure

* sdp.js                 - Session Desription implementation
* stun.js                - STUN protcol implementation
* turn.js                - TURN protocl implementation
* db/sdp.js.             - Session data model persistent in GraphDB
* vurl.js.               - Virtual URL implementation

* iwebpp.io-server.js    - iWebPP.io protocol controller implementation
* iwebpp.io-server-v2.js - iWebPP.io protocol controller V2 implementation using SecureWebsocket and NaclCert

* ssl.js                 - SSL/RSA certs generate utils
* demos/                 - demos
* ca-certs               - your own Root CA certs
* certs                  - dynamical generated SSL/RSA certs for connections
* routepath.js           - pure JS tracerouter implementation using UDP/TTL probe. TBD

    
### More demos:

    Look on demos/


### TODO:

* User authentication
* Domain authorization
* Improve documents, Protocol Spec, RFC draft


### Support us

* Welcome contributing on document, codes, tests and issues


### License

(The MIT License)

Copyright (c) 2012-present Tom Zhou(iwebpp@gmail.com)
