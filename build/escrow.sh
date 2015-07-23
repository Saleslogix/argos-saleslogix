#!/bin/bash

#
# escrow.sh - A script for creating an ISO of mobile source code. Requires the
# HDIUTIL command.
#

# Edit if your environment is different, ensure the mobile code is
# on the branch/commit/tag you want to create the escrow for.
ESCROW=~/code/escrow
MOBILE=~/code/mobile

# Cleanup any previous copies
rm -R $ESCROW/argos-sdk
rm -R $ESCROW/products

# Copy the mobile source code into the escrow folder
mkdir -p $ESCROW/products
copy -R $MOBILE/argos-sdk/ $ESCROW
copy -R $MOBILE/products/argos-saleslogix/ $ESCROW/products

# Remove files and folders we do not want in the ISO
rm -R $ESCROW/argos-sdk/node_modules/
rm -R $ESCROW/argos-sdk/deploy/
rm -R $ESCROW/products/argos-saleslogix/node_modules/
rm -R $ESCROW/products/argos-saleslogix/deploy/

# Create an ISO, in the $ESCROW folder, rename the escrow to whatever you want
hdiutil makehybrid -iso -joliet -o $ESCROW/escrow.iso $ESCROW
