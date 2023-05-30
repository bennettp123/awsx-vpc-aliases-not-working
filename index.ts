import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

class Container extends pulumi.ComponentResource {
    vpc: awsx.ec2.Vpc;
    constructor(name: string, args: unknown, opts: pulumi.ComponentResourceOptions = {}) {
        super('example:Container', name, {}, opts);

        new aws.s3.Bucket(name, {}, {
            parent: this,
            aliases: [{ parent: pulumi.rootStackResource }]
        });

        this.vpc = new awsx.ec2.Vpc(
            name,
            {
                numberOfAvailabilityZones: 1,
                natGateways: {
                    strategy: "None",
                },
                subnetSpecs: [{ type: "Isolated" }]
            }, {
                parent: this,
                aliases: [{ name, parent: pulumi.rootStackResource }],
            }
        );
    }
}

const container = new Container('example', {});

export const vpcId = container.vpc.vpcId;