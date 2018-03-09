export default class PubSub{
	private hub : {
		[channel: string]: {
			callback: Function;
			id: number;
		}[]
	};
	private lastId;

	constructor(){
		this.hub = {};
		this.lastId = 0;
	}

	private nextId(): number{
		return ++this.lastId;
	}

	public subscribe(channel : string ,callback : Function): number{
		let id = this.nextId();
		let channelData = {
			callback: callback,
			id: id
		}

		if(this.hub[channel]){
			this.hub[channel].push(channelData);
		}else{
			this.hub[channel] = [channelData];
		}

		return id;
	}

	public async publish(channel : string ,data? : any){
		if(this.hub[channel]){
			for(var index in this.hub[channel])
				await this.hub[channel][index].callback(data);
		}else{
			this.hub[channel]=[];
		}
	}

	public remove(id: number){
		for(let channelName in this.hub){
			let newChannel = [];
			for(let listener of this.hub[channelName]){
				if(id != listener.id){
					newChannel.push(listener);
				}
			}
			this.hub[channelName] = newChannel;
		}
	}
} 
