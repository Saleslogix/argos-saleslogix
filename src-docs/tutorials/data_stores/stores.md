#Data Stores

Data stores provide a common interface between the consumer (view) and the provider (SData). It allows the consumer to only talk to the data store and
only concern itself with retrieving items from the store and setting them back. The store handles creating requests, updates, creations, deletions and
everything that goes with connecting and recieving data from a provider.

##Flow

{@img data_store_flow.png Data Flow}

##Advantages:

* Clear cut division of logic;
* Easy to support multiple providers;
* Consumers never change;

####Scenario:

Views (A), (B) and (C) talk to provider (X) and each have functions for: creating requests, searches and parsing the returned data.

Switch to provider (Y). Now you need to recode all those functions for all three views.

Now take:

Views (A), (B) and (C) talk to a data store. The data store has functions for creating requests, searches and parsing returned data for provider (X).

Switch to provider (Y). Make a new data store that has those some functions for the new provider.
