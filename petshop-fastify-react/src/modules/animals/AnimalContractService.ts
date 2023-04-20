import {AnimalContractServiceInterface} from './interface/AnimalContractServiceInterface';
import {Animal} from './entity';
import {BlockchainServiceInterface} from '../fabric/interface/BlockchainServiceInterface';
import {getBlockchainService} from '../common/ServiceFactory';
import config from '../../config/Config';
import {TextDecoder} from 'util';

export class AnimalContractService implements AnimalContractServiceInterface {

	private blockchainService: BlockchainServiceInterface = getBlockchainService();
	private utf8Decoder = new TextDecoder();

	async creteAnimal(animal: Animal): Promise<string> {

		const gateway = await this.blockchainService.connect();
		const network = gateway.getNetwork(config.fabric.channel.name);
		const contract = network.getContract(config.fabric.chaincode.name);

		try {
			const commit = await contract.submitAsync('CreateAnimal',
				{arguments: [animal._id, animal.name, animal.type, animal.breed, animal.birthDate.toString(), animal.imgUrl, animal.description, String(animal.pedigree)]});

			const resultJson = this.utf8Decoder.decode(commit.getResult());
			console.log(resultJson);
			return commit.getTransactionId();
		} catch (error) {
			console.log('Error during the transaction with message: ', error);
			throw error;
		}
	}

	async updateAnimalName(id: string, name: string): Promise<string> {
		const gateway = await this.blockchainService.connect();
		const network = gateway.getNetwork(config.fabric.channel.name);
		const contract = network.getContract(config.fabric.chaincode.name);
		try {
			const commit = await contract.submitAsync('UpdateAnimalName',
				{arguments: [id, name]});
			const resultJson = this.utf8Decoder.decode(commit.getResult());

			return commit.getTransactionId();
		} catch (error) {
			console.log('Error during the animal name update with message: ', error);
			throw error;
		}
	}

	async updateAnimal(id: string, animal: Animal): Promise<string> {
		const gateway = await this.blockchainService.connect();
		const network = gateway.getNetwork(config.fabric.channel.name);
		const contract = network.getContract(config.fabric.chaincode.name);
		try {

			const commit = await contract.submitAsync('UpdateAnimal',
				{arguments: [id, animal.name, animal.breed, animal.birthDate.toString(), animal.imgUrl, animal.description, animal.type, String(animal.pedigree)]});
			const resultJson = this.utf8Decoder.decode(commit.getResult());

			return commit.getTransactionId();
		} catch (error) {
			console.log('Error during the animal name update with message: ', error);
			throw error;
		}
	}

	// TODO: Implement
	async getAllAnimals(): Promise<string> {
		throw new Error('Method not implemented.');
		//const gateway = await this.blockchainService.connect();
		//const network = gateway.getNetwork(config.fabric.channel.name);
		//const contract = network.getContract(config.fabric.chaincode.name);

	}
	
	/*
	async GetAnimalHistory(name: string): Promise<string> {
		const gateway = await this.blockchainService.connect();
		const network = gateway.getNetwork(config.fabric.channel.name);
		const contract = network.getContract(config.fabric.chaincode.name);
		try {

			const commit = await contract.submitAsync('GetAnimalHistory',
				{arguments: [name]});
			const resultJson = this.utf8Decoder.decode(commit.getResult());

			return commit.getTransactionId();
		} catch (error) {
			console.log("Error during the animal name update with message: ", error);
			throw error;
		}

	}
*/

	async getAnimalHistory(name: string): Promise<string> {
		throw new Error('Method not implemented.');
	}


}
