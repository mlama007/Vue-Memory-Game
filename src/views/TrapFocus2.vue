<template>
    <div>
        <main 
            class="main-trap-focus" 
            id="main" 
            tabindex="-1" 
            aria-labelledby="instructionsTitle">
            <h2>Tinkering around with trap focus.</h2>
            <p>Trap focus is an important part of getting modal dialogs right.</p>
            <button v-on:click="showAltDialog">Show</button>
            <button id="open-dialog" v-on:click="showRegularDialog">Show regular dialog</button>
            

            <!-- 
                tabindex so it can be focusable.
                hidden attrib is semantic for show/hide
                aria-labelledby to allow assistive technology to catalog the element.
                    - should be one or more IDs in the document.
                    - ESSENTIAL information about the object
                    - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
                    - the region that the label refers to does indeed contain the label
                        - IE, this label is a child of what it labels
                aria-describedby to 
                    - EXTENDED information about the object
                    - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute
                    - the region that the label refers to does indeed contain the label
                        - IE, this label is a child of what it labels
            -->
            <div 
                id="dialog" 
                role="dialog" 
                aria-labelledby="dialog-title" 
                aria-describedby="dialog-description"
                tabindex="-1" :hidden="hideTheNiceDialog">
                <!-- 
                    form element for better validation potential
                    - mobile browsers also require a form to show the "go" button on the screen keyboard
                 -->
                <form class="dialog-content">
                    <header>
                        <h1 id="dialog-title">Name Entry</h1>
                        <p id="dialog-description">Please enter your full name.</p>
                    </header>
                    <section>
                       <label for="dialog-user-name">Name</label>
                        <input id="dialog-user-name">
                    </section>
                    <footer>
                        <button type="button" id="close-dialog">close</button>
                        <button type="submit" id="save-dialog">save</button>
                    </footer>
                </form>
            </div>

            <!-- 
                alternative overlay 
                https://www.kerstner.at/2014/07/simple-modal-html-dialog-overlay/
            -->
            <div id="DialogOverlay">
                <div id="DialogOverlayContent">
                    <h3>A simple dialog</h3>
                    <p>It is not accessible for several reasons.</p>
                    <p>Sadness.</p>
                    <a href="#" v-on:click="closeAltDialog">Close</a>
                    
                </div>
            </div>

        </main>
    </div>
</template>

<script>


// alternative overlay 
// https://www.kerstner.at/2014/07/simple-modal-html-dialog-overlay/
function showFormDialog() {
    document.getElementById('DialogOverlay').style.display = 'block';    
}
function closeDialog() {        
    document.getElementById("DialogOverlay").style.display = 'none';
}

// https://allyjs.io/tutorials/accessible-dialog.html#trapping-focus-inside-the-dialog
// - unfortunately requires ally.js which I am not going to install
// https://medium.com/@islam.sayed8/trap-focus-inside-a-modal-aa5230326c1b
// - article states that ally.js defines 5 states for elements re:focus:
//    - inert: not interactive, not focusable (div)
//    - focusable: element can be focused. Element.focus(), mouse pointer, but NOT keyboard
//    - tabbable: element is keyboard focusable.
//      - elem is part of document sequential focus navigation order
//      - element is also focusable by script
//      - element is also focusable by mouse/pointer
//      - NOTE: this nav order is the same as the DOM order
//    - tabbable ONLY: element is only keyboard focusable
//      - possibly by mouse or pointer, but NOT script
//    - forward focusable: element will forward focus to another element
//      - insteaad of receiving focus itself 
// 
// NOTE: there is also an HTML autofocus attribute that should be accounted for when 
// working on trapping focus, etc.
// if we are programmatically setting focus, we should let this attribute win.
// this is an html5 attribute https://davidwalsh.name/autofocus
// 
// a gist with a basic impl:
// https://gist.github.com/steveosoule/e282a4069120eb440cf76bf830cc879f
export default {
    name: "TrapFocus2",
    data() {
        return {
            hideTheNiceDialog: true
        }
    },
    created() {         
        setTimeout((vueScope) => {
            console.log("show the thing?");
            vueScope.hideTheNiceDialog = false;
        }, 800, this)
    },
    // this is an easy place to put these event listeners, but its not "the vue way"
    // trap focus is an issue for both:
    // - tab & shift-tab
    // - users of spatial navigation https://blog.codinghorror.com/spatial-navigation-and-opera/
    // - assistive tools may list focusables that are behind the backdrop
    // browsers offer no API for "remove focus for everything outside the dialog"
    // 
    mounted() {
        // Grab the elements we need to interact with
        var openButton = document.getElementById('open-dialog');
        var dialog = document.getElementById('dialog');
        var closeButton = document.getElementById('close-dialog');
        var saveButton = document.getElementById('save-dialog');
        

        function openDialog() {
            // create or show the dialog
            dialog.hidden = false;
        }

        function closeDialog() {
            // hide or remove the dialog
            dialog.hidden = true;
        }

        // just to make sure its rendered
        setTimeout(() => {
            // wire up showing/hiding the dialog
            console.log('open button', openButton);
            console.log('close button', closeButton);
            openButton.addEventListener('click', openDialog, false);
            closeButton.addEventListener('click', closeDialog, false);
            saveButton.addEventListener('click', closeDialog, false);


            console.log('children?', dialog.children);
        }, 1000)        
    },
    methods: {
        showAltDialog() {
            console.log('show alt dialog...');
            showFormDialog();
        },
        closeAltDialog() {
            console.log('hide alt dialog...');
            closeDialog();
        },
        showRegularDialog() {
            console.log('show the dialog...');
            var dialog = document.getElementById('dialog');
            dialog.hidden = false;
        }
    }
}

</script>

<style lang="scss" scoped>
#dialog {
  // dialog should appear over the entire viewport, regardless of what it is nested within.
  // this is actually the wrapper, it is around the overlay.
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0);
  z-index: 999;
}
#dialog:before {  
  content: ""; // content matters.
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;

  /* fade in */
  transition: opacity 0.2s ease-in-out;
}

/* show the dialog in the center of the screen */
#dialog .dialog-content {
  box-sizing: border-box;
  /* maintain on screen even during scroll (potentially problematic on mobile) */
  position: fixed;
  /* when centering, try using FlexBox instead of this junk */
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  transform: translate3d(-50%,-50%,0);

  /* dialogs are usually boxy things that are on top of everything */
  padding: 20px;
  border: 1px solid #CCC;
  background: white;
  z-index: 1000;

  /* zoom in from the center */
  transition: transform 0.2s ease-in-out;
}

#dialog h1 {
  margin: 0;
}
#dialog footer {
  margin-top: 20px;
}
#dialog[hidden] {
  /*
    [hidden] usually sets display:none, which we
    need to revert in order to allow animations
  */
  display: block;
  /*
    actually hide the element,
    making its contents unaccessible
  */
  visibility: hidden;
  /*
    make sure the element is out of viewport
  */
  transform: translate3d(0px, -1px, 0px) scale(0);
  /*
    delay transform until animations are done
  */
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}

#dialog[hidden],
#dialog[hidden]:before,
#dialog[hidden] .dialog-content {
  display: block;
  visibility: hidden;
  transform: translate3d(0px, -1px, 0px) scale(0);
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
#dialog[hidden]:before {
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
#dialog[hidden] .dialog-content {
  transform: translate3d(0px, -1px, 0px) scale(0);
  transition:
    transform 0.2s ease-in-out,
    visibility 0s linear 0.2s;
}

// #dialog {
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   width: 400px;
//   height: 200px;
//   transform: translate3d(-50%,-50%,0); // this centers by altering the position point to center of box, not top left.
//   background: white;
//   border: 1px solid rgba(0, 0, 0, 2.5);
//   border-radius: 5px;
//   box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.2);
// }
// // this doesn't actually work. :(
// #dialog::before, #dialog::after {
//     content: "♥";
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 99999;
//     background: rgba(0, 0, 0, 0.5);
//     display: none;  
// }

// alternative overlay
// https://www.kerstner.at/2014/07/simple-modal-html-dialog-overlay/
#DialogOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
    display: none;
}
#DialogOverlayContent {
    position: absolute;
    top: 40%;
    left: 15%;
    color: #000;
    text-align: center;
    width: 70%;
    // height: 200px;
    z-index: 999999;
    background: rgba(255, 255, 255, 1);
    border: 2px solid;
    border-radius: 25px;
}
#DialogOverlayContent > p {
    color: #000;
    margin-top: 50px;
}
</style>