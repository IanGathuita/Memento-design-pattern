/*AKA snapshot.  used to restore an object to its previous state.
originator - Actual owner of state. Creates a memento containing a snapshot of it's internal state
memento - Holds internal state of originator (holds snapshot of originator's state)
caretaker - keeping the mementos. Never examines / modifies contents of the memento
 */

class Tv{
    size:string
    price: string;
    usbSpport: boolean;

    constructor(size:string, price:string, usbSpport:boolean ){
        this.size = size;
        this.price = price;
        this.usbSpport = usbSpport;
    }

    getDetails():string{
        return `${this.size} ${ this.price } ${this.usbSpport }`;
    }
}

//memento
class Memento{
    tv:Tv;

    constructor(tv:Tv){
        this.tv = tv;
    }

    getDetails(){
        return `Memento: ${this.tv.getDetails()}`;
    }
}

//careTaker
class CareTaker{
    tvList:Memento[] =[];

    addMemento(memento:Memento):void{
        this.tvList.push(memento);
    }

    getMemento(index:number):Memento{
        return this.tvList[index];
    }
}

//originator
class Originator{
    tv:Tv;

    createMemento():Memento{
        return new Memento(this.tv);
    }

    setMemento(memento:Memento):void{
        this.tv = memento.tv;
    }

    getDetails(){
        return `Originator: ${this.tv.getDetails()}`;
    }
}

//client
let originator:Originator = new Originator();
originator.tv = new Tv('42 inch', '40000', false);

let careTaker: CareTaker = new CareTaker();
careTaker.addMemento(originator.createMemento());

originator.tv = new Tv('46 inch', '45000', true);
careTaker.addMemento(originator.createMemento());

originator.tv = new Tv('50 inch', '48000', true);
console.log(`Originator current state ${originator.getDetails()}`);

console.log(`Restoring to 42 inch...`);
originator.tv = careTaker.getMemento(0).tv;
console.log(`Originator current state ${originator.getDetails()}`);


