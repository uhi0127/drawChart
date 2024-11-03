class AddEvents{
   constructor( id ){
      this.id = id;
   }
   eventListener( selector, eventAction, callBack ){
      selector.addEventListener( eventAction, callBack );
   }
};

const addEvents = new AddEvents( 'addEvents' );

export { addEvents };