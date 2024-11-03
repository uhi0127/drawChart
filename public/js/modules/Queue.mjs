class Queue{
   constructor( id ){
      this.id = id;
      this._qList = [];
   }

   pushItem( item ){
      this._qList.push( item );
   }

   shiftItem(){
      return this._qList.shift();
   }

   get qList(){
      return this._qList;
   }

   initList(){
      this._qList = [];
   }
}

export { Queue };