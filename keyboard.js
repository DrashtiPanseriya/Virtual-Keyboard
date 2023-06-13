const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        numkeys: [],
        alphakeys1:[],
        alphakeys2:[],
        alphakeys3:[],
        space:[]
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },
  
    properties: {
        value: "|",
        capsLock: false
    },
    init(){
            this.elements.main=document.createElement("div");
            this.elements.keysContainer=document.createElement("div");

            this.elements.main.classList.add("keyboard","keyboard-hidden");
            this.elements.keysContainer.classList.add("keys");

            this.elements.keysContainer.appendChild(this._createkeys());
            this.elements.main.appendChild(this.elements.keysContainer);
            document.body.appendChild(this.elements.main);



            document.querySelectorAll(".keyboard-input").forEach(element => {
                element.addEventListener("focus", () => {
                    this.open(element.value, currentValue => {
                        element.value = currentValue;
                    });
                });
            });
            
    },

    _createkeys(){

        numkeys=["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "\u2716"];
        alphakeys1=["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",];
        alphakeys2=["\u21EA", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"];
        alphakeys3=["done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"];
        space=[" \u0020"];

        const fragment1 = document.createElement("div");
        fragment1.classList.add("num-key");
        numkeys.forEach(key => {
                const keyElement=document.createElement("button");
                keyElement.classList.add("key");
                keyElement.setAttribute("type", "button");
                keyElement.textContent=key;

                switch(key){
                    case "\u2716":
                        keyElement.classList.add("wider-key");
                        keyElement.addEventListener("click",()=>{
                            this.properties.value=this.properties.value.substring(0,this.properties.value.length-1);
                            this._triggerEvent("oninput");
                        });
                        break;
                     default:
                        keyElement.textContent = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this._triggerEvent("oninput");
                        });
    
                        break;
                }
                fragment1.appendChild(keyElement);
        });

        const fragment2 = document.createElement("div");
        fragment2.classList.add("alpha-key-1");
        alphakeys1.forEach(key => {
            const keyElement=document.createElement("button");
            keyElement.classList.add("key");
            keyElement.setAttribute("type", "button");
            keyElement.textContent=key;

            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
                this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                this._triggerEvent("oninput");
            });

            fragment2.appendChild(keyElement);
    });

    const fragment3 = document.createElement("div");
        fragment3.classList.add("alpha-key-2");
        alphakeys2.forEach(key => {
            const keyElement=document.createElement("button");
            keyElement.classList.add("key");
            keyElement.setAttribute("type", "button");
            keyElement.textContent=key;

            switch(key){
                case "\u21EA":
                    keyElement.classList.add("wider-key","key-activatable");
                    
                    keyElement.addEventListener("click",()=>{
                        this._toggleCapsLock();
                        keyElement.classList.toggle("key-active",this.properties.capsLock);
                    });
                    break;
                    
                case "enter":
                    keyElement.classList.add("wider-key");
                    keyElement.addEventListener("click",()=>{
                        this.properties.value+="\n";
                        this._triggerEvent("oninput");
                    });
                    
                    break;
                 default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }
            fragment3.appendChild(keyElement);
    });

    const fragment4 = document.createElement("div");
        fragment4.classList.add("alpha-keys-3");
        alphakeys3.forEach(key => {
            const keyElement=document.createElement("button");
            keyElement.classList.add("key");
            keyElement.setAttribute("type", "button");
            keyElement.textContent=key;

            switch(key){
                case "done":
                    keyElement.classList.add("wider-key");
                    keyElement.addEventListener("click",()=>{
                            this.close();
                            this._triggerEvent("onclose");    
                    });
                    break;
                    
                 default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment4.appendChild(keyElement);
    });

    const fragment5=document.createElement("div");
    fragment5.classList.add("spacebar");
    const keyElement=document.createElement("button");
    keyElement.classList.add("key","more-wider-key");
    keyElement.setAttribute("type", "button");
    keyElement.textContent=space[0];
    keyElement.addEventListener("click",()=>{
    this.properties.value+=" ";
    this._triggerEvent("oninput");
    });

    fragment5.appendChild(keyElement);

    const fragment=document.createDocumentFragment();
    fragment.appendChild(fragment1);
    fragment.appendChild(fragment2);
    fragment.appendChild(fragment3);
    fragment.appendChild(fragment4);
    fragment.appendChild(fragment5);

    return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.alphakeys1) {
            if (key!="&#x232B;" && key!="&#8682;" && key!="&#x2423;" && key!="done" && key!="enter") {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        for (const key of this.elements.alphakeys2) {
            if (key!="&#x232B;" && key!="&#8682;" && key!="&#x2423;" && key!="done" && key!="enter") {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
        for (const key of this.elements.alphakeys3) {
            if (key!="&#x232B;" && key!="&#8682;" && key!="&#x2423;" && key!="done" && key!="enter") {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }


}

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});