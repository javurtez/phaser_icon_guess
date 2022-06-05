/*
  Class is really for Ease-of-use. You can easily call ConstantsEvent.emitter amd do whatever normal event functionality you want there.
  This format just makes it quick an easy to interact with specific events. 
*/

import { EventManager } from "../Managers/EventManager";

export class TBEvent {
    name: string = "";

    constructor(pEventName: string) {
        this.name = pEventName;
    }

    /**********************************************************
    @description Removes All listeners to this event
    @param pContext Optional parameter, for only clearing listeners from the given context. 
    **********************************************************/
    clear(pContext = undefined) {
        EventManager.emitter.removeListener(this.name, undefined, pContext);
    }

    /**********************************************************
    @description Adds listeners to events already declared
    @param pCallback Function to call
    @param pContext Where to call the callback from
    **********************************************************/
    addListener(pCallback, pContext) {
        EventManager.emitter.addListener(this.name, pCallback, pContext);
    }

    /**********************************************************
    @description Remove listeners to events already declared
    @param pCallback Remove only this specific callback from the event
    @param pContext (optional) Remove the given callback only if it has this context
    @param pOnce (optional) Remove the given callback only if it is ti fire 'once'
    **********************************************************/
    removeListener(pCallback, pContext = undefined, pOnce = false) {
        EventManager.emitter.removeListener(this.name, pCallback, pContext, pOnce);
    }

    /**********************************************************
    @description Dispatch a decalred event
    @param pArgs Any number of arugments to pass to the emitted event
    **********************************************************/
    emit(...pArgs) {
        EventManager.emitter.emit(this.name, ...pArgs);
    }
}
