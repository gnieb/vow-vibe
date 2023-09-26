// .d.ts extension lets typescript know that it is a declaration file.
declare module "*.png" {
    const value: any;
    export = value;
}

declare module "*.jpg" {
    const value: any;
    export = value;
}