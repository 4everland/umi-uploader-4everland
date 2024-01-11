import { UploaderInterface } from '@metaplex-foundation/umi';
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
}
export declare function create4everlandUploader(credentials: Credentials, bucketName: string): UploaderInterface;
