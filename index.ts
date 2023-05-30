import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

class Container extends pulumi.ComponentResource {
    vpc: awsx.ec2.Vpc;
    constructor(name: string, args: unknown, opts: pulumi.ComponentResourceOptions = {}) {
        super('example:Container', name, {}, opts);

        this.vpc = new awsx.ec2.Vpc(
            name,
            {
                numberOfAvailabilityZones: 1,
                natGateways: {
                    strategy: "None",
                },
                subnetSpecs: [{ type: "Isolated" }]
            },
            {
                aliases: [{
                    parent: pulumi.rootStackResource, // old parent
                }],
                parent: this, // new parent
            }
        );
    }
}

const container = new Container('example', {});

export const vpcId = container.vpc.vpcId;