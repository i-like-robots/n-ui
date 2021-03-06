# Next n-ui

_NOTE_ n-ui has been now been replaced with [Page Kit](https://biz-ops.in.ft.com/Repository/github%3AFinancial-Times%2Fdotcom-page-kit) in ft.com applications.

Server, build and client side bootstrapping for ft.com’s user-facing applications. Most of the user-facing apps on ft.com currently rely on n-ui, it is a critical part of our infrastructure.

## Primary URL

https://www.npmjs.com/package/@financial-times/n-ui

## Service Tier

Bronze

## Lifecycle Stage

Decommissioned

## Delivered By

next

## Supported By

next

## Known About By

- rhys.evans
- dora.militaru
- matt.hinchliffe
- maggie.allen

## Dependencies

- next-hashedasset

## Contains Personal Data

false

## Contains Sensitive Data

false

## Host Platform

npm, Bower, S3

## Architecture

n-ui operates on both the server and the client and is installed as a module via both npm and Bower. Some of its main concerns are:

### server-side concerns
- exports n-express
- provides an application shell
- provides an application bootstrap

### client-side concerns
- initialises some origami modules
- integrates flags, tracking and ads for ft.com

## First Line Troubleshooting

Problems with n-ui are likely to manifest in the user-facing applications which depend on it. Please follow the troubleshooting guide for the affected application.

## Second Line Troubleshooting

### n-ui Parity issues

- n-ui release failures cause build issues for any user-facing app which depends on it. The CircleCI build will fail with the message: "Projects using n-ui must maintain parity between versions."
	- Attempt a rebuild of the failed CircleCI workflow.

### General tips for troubleshooting Customer Products systems

- [Out of hours runbook for FT.com (wiki)](https://customer-products.in.ft.com/wiki/https://customer-products.in.ft.com/wiki/Out-of-hours-troubleshooting-guide)
- [General tips for debugging FT.com (wiki)](https://customer-products.in.ft.com/wiki/Debugging-Tips)
- [General information about monitoring and troubleshooting FT.com systems (wiki)](https://customer-products.in.ft.com/wiki/Monitoring-and-Troubleshooting-systems)


## Monitoring

None

## Data Recovery Process Type

Not applicable

## Release Process Type

PartiallyAutomated

## Rollback Process Type

PartiallyAutomated

## Release Details

This app is released using Circle CI.

When you release an n-ui tag, 3 things happen:

- assets are built and deployed to s3, from where they are linked to/downloaded by apps
- the npm package is published
- during work hours (9am to 4pm), all user-facing apps are rebuilt to pick up the changes

https://github.com/Financial-Times/n-ui#releasing-n-ui


## Key Management Process Type

PartiallyAutomated

## Key Management Details

You can read about how to rotate an AWS key [over on the Customer Products Wiki](https://customer-products.in.ft.com/wiki/Rotating-AWS-Keys)
See the Customer Products [key management and troubleshooting wiki page](https://customer-products.in.ft.com/wiki/Key-Management-and-Troubleshooting)

## More Information

There are no monitoring services set up for n-ui. Services which depend on it are individually monitored.
