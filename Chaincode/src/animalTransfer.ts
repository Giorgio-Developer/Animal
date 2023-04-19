/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Animal} from './animal';

@Info({title: 'AnimalTransfer', description: 'Smart contract for manipulate animals'})
export class AnimalTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const animals: Animal[] = [];
    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateAnimal(ctx: Context, id: string, name: string, breed: string, birthDate: string, imgUrl: string, description: string, type: string, pedigree: boolean): Promise<void> {
        const exists = await this.AnimalExists(ctx, id);
        if (exists) {
            throw new Error(`The animal with id:  ${id} already exists`);
        }

        const animal = {
            ID: id,
            name: name,
            breed: breed,
            birthDate: birthDate,
            imgUrl: imgUrl,
            description: description,
            type: type,
            pedigree: pedigree
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(animal))));
    }

    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadAnimal(ctx: Context, id: string): Promise<string> {
        const animalJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!animalJSON || animalJSON.length === 0) {
            throw new Error(`The animal with id:  ${id} already exists`);
        }
        return animalJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    @Transaction()
    public async UpdateAnimalName(ctx: Context, id: string, name: string): Promise<void> {
        const exists = await this.AnimalExists(ctx, id);
        if (!exists) {
            throw new Error(`The animal with id:  ${id} already exists`);
        }

        // overwriting original asset with new asset
        const updatedAnimalName = {
            ID: id,
            name: name
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAnimalName))));
    }

    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AnimalExists(ctx: Context, id: string): Promise<boolean> {
        const animalJSON = await ctx.stub.getState(id);
        return animalJSON && animalJSON.length > 0;
    }


}
