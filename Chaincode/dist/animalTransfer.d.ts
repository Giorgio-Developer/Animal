import { Context, Contract } from 'fabric-contract-api';
export declare class AnimalTransferContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateAnimal(ctx: Context, id: string, name: string, breed: string, birthDate: string, imgUrl: string, description: string, type: string, pedigree: boolean): Promise<void>;
    ReadAnimal(ctx: Context, id: string): Promise<string>;
    UpdateAnimalName(ctx: Context, id: string, name: string): Promise<void>;
    AnimalExists(ctx: Context, id: string): Promise<boolean>;
}
