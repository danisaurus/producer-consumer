# Node.JS Producer/Consumer System

The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

#Requirements

At a minimum, the following should be implemented:

The Producer and Consumer as separate NodeJS services.
The Producer generating random addition expressions of two positive integers, e.g. "2+3="
The Consumer computing and returning the correct mathematical result for the each expression it receives
The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
The Consumer and Producer should log all messages they generate and receive.

The end product should:

Be built in strict JavaScript and run with NodeJS
NOT rely on any external services like Redis, ZeroMQ or similar technologies
NOT use Express (Connect is Ok)
Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
Include Unit tests

#UML Activity Diagram


#UML Sequence Diagram



#Directions

To Run:

git clone https://github.com/danisaurus/producer-consumer
cd into project
in a terminal window: node consumer.js
in a new terminal window: node producer.js
