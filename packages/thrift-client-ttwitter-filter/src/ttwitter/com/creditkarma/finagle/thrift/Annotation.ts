/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.2
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as Endpoint from "./Endpoint";
export interface IAnnotation {
    timestamp?: thrift.Int64;
    value?: string;
    host?: Endpoint.IEndpoint;
}
export interface IAnnotationArgs {
    timestamp?: number | string | thrift.Int64;
    value?: string;
    host?: Endpoint.IEndpointArgs;
}
export const AnnotationCodec: thrift.IStructCodec<IAnnotationArgs, IAnnotation> = {
    encode(args: IAnnotationArgs, output: thrift.TProtocol): void {
        const obj = {
            timestamp: (typeof args.timestamp === "number" ? new thrift.Int64(args.timestamp) : typeof args.timestamp === "string" ? thrift.Int64.fromDecimalString(args.timestamp) : args.timestamp),
            value: args.value,
            host: args.host
        };
        output.writeStructBegin("Annotation");
        if (obj.timestamp != null) {
            output.writeFieldBegin("timestamp", thrift.TType.I64, 1);
            output.writeI64((typeof obj.timestamp === "number" ? new thrift.Int64(obj.timestamp) : typeof obj.timestamp === "string" ? thrift.Int64.fromDecimalString(obj.timestamp) : obj.timestamp));
            output.writeFieldEnd();
        }
        if (obj.value != null) {
            output.writeFieldBegin("value", thrift.TType.STRING, 2);
            output.writeString(obj.value);
            output.writeFieldEnd();
        }
        if (obj.host != null) {
            output.writeFieldBegin("host", thrift.TType.STRUCT, 3);
            Endpoint.EndpointCodec.encode(obj.host, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IAnnotation {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.I64) {
                        const value_1: thrift.Int64 = input.readI64();
                        _args.timestamp = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.value = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_3: Endpoint.IEndpoint = Endpoint.EndpointCodec.decode(input);
                        _args.host = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            timestamp: _args.timestamp,
            value: _args.value,
            host: _args.host
        };
    }
};
export class Annotation extends thrift.StructLike implements IAnnotation {
    public timestamp?: thrift.Int64;
    public value?: string;
    public host?: Endpoint.IEndpoint;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IAnnotationArgs = {}) {
        super();
        if (args.timestamp != null) {
            const value_4: thrift.Int64 = (typeof args.timestamp === "number" ? new thrift.Int64(args.timestamp) : typeof args.timestamp === "string" ? thrift.Int64.fromDecimalString(args.timestamp) : args.timestamp);
            this.timestamp = value_4;
        }
        if (args.value != null) {
            const value_5: string = args.value;
            this.value = value_5;
        }
        if (args.host != null) {
            const value_6: Endpoint.IEndpoint = new Endpoint.Endpoint(args.host);
            this.host = value_6;
        }
    }
    public static read(input: thrift.TProtocol): Annotation {
        return new Annotation(AnnotationCodec.decode(input));
    }
    public static write(args: IAnnotationArgs, output: thrift.TProtocol): void {
        return AnnotationCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return AnnotationCodec.encode(this, output);
    }
}