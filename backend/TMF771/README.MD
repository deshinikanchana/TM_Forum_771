# Welcome to TMF Conformance Test Kit for V5.0.0 APIs

## Open API Conformance overview

Open API Conformance certification for suppliers verifies the successful implementation of Open APIs in commercial products and real-world deployments, and demonstrates to clients and partners your commitment to industry standards.

## How to Use the Conformance Test Kit (CTK)

- Do not change anything under **DO_NOT_CHANGE** folder
- Read the Conformance Profile for this API, stored on the conformance folder, this fil will explain which features will be tested from the API and what are the expected behaviour of those features.
- Change the config.json file:
  - url: what is the base URL of your API, for the TroubleTicket API if I can do a GET operation on TroubleTicket at: http://apis.example.com/tmf-api/troubleTicket/v5/TroubleTicket the value of the url will be: http://apis.example.com/tmf-api/troubleTicket/v5/
  - headers: Headers will accept Key value pairs that will be injected on the headers of the request to the API
  - payloads: here you can modify the payloads for each operation that has a body of each Resource
- Start the CTK with the following command:
  - Windows: You have 2 options 