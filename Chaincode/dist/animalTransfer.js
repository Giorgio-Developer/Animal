"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalTransferContract = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
let AnimalTransferContract = class AnimalTransferContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        const animals = [];
    }
    // CreateAsset issues a new asset to the world state with given details.
    async CreateAnimal(ctx, id, name, breed, birthDate, imgUrl, description, type, pedigree) {
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
        await ctx.stub.putState(id, Buffer.from(json_stringify_deterministic_1.default(sort_keys_recursive_1.default(animal))));
    }
    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAnimal(ctx, id) {
        const animalJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!animalJSON || animalJSON.length === 0) {
            throw new Error(`The animal with id:  ${id} already exists`);
        }
        return animalJSON.toString();
    }
    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAnimalName(ctx, id, name) {
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
        return ctx.stub.putState(id, Buffer.from(json_stringify_deterministic_1.default(sort_keys_recursive_1.default(updatedAnimalName))));
    }
    // AssetExists returns true when asset with given ID exists in world state.
    async AnimalExists(ctx, id) {
        const animalJSON = await ctx.stub.getState(id);
        return animalJSON && animalJSON.length > 0;
    }
};
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AnimalTransferContract.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], AnimalTransferContract.prototype, "CreateAnimal", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalTransferContract.prototype, "ReadAnimal", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], AnimalTransferContract.prototype, "UpdateAnimalName", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalTransferContract.prototype, "AnimalExists", null);
AnimalTransferContract = __decorate([
    fabric_contract_api_1.Info({ title: 'AnimalTransfer', description: 'Smart contract for manipulate animals' })
], AnimalTransferContract);
exports.AnimalTransferContract = AnimalTransferContract;
//# sourceMappingURL=animalTransfer.js.map