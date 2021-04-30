<template>
    <div>
        <main 
            class="main-trap-focus" 
            id="main" 
            tabindex="-1" 
            aria-labelledby="instructionsTitle">
            <h2>Tinkering around with trap focus.</h2>
            <p>Trap focus is an important part of getting modal dialogs right.</p>



            <!-- 
                trap focus:
                - tab goes to next focusable element, loop back around
                - shift+tab goes to previous focusable element, loop back around
            -->
            <div id="fake-modal">
                <h2>Fake Modal!</h2>
                <p>Some text and stuff.<a href="#">link 1</a></p>
                <ul>
                    <li>
                        <a href="#">link 2</a>                        
                    </li>
                    <li>
                        <a href="#">link 3</a>
                    </li>
                </ul>
                <form>
                    <input type="text" value="hi" />
                    <button>Submit</button>
                </form>
                <p>Other text.</p>
                
            </div>

        </main>
    </div>
</template>

<script>


// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableEl = focusableEls[0];  
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) { 
            return; 
        }

        if ( e.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }

    });
}

export default {
    name: "TrapFocus",
    data() {
        return {
            // nuthin'
        }
    },
    created() {
        setTimeout(() => {

            // const element = document.querySelector('#fake-modal');
            // console.log(element);
            // // yuck, there are lots of focusable elements...
            // // https://allyjs.io/data-tables/focusable.html
            // const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
            // console.log(focusableEls);

            // // first and last matter
            // const firstFocusableEl = focusableEls[0];  
            // const lastFocusableEl = focusableEls[focusableEls.length - 1];

            // // tab key
            // var KEYCODE_TAB = 9;

            // // the parent element can get hte listener
            // element.addEventListener('keydown', function(e) {
            //     if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
            //         if ( e.shiftKey ) /* shift + tab */ {
            //             if (document.activeElement === firstFocusableEl) {
            //                 lastFocusableEl.focus();
            //                 e.preventDefault();
            //             }
            //         } else /* tab */ {
            //             if (document.activeElement === lastFocusableEl) {
            //                 firstFocusableEl.focus();
            //                 e.preventDefault();
            //             }
            //         }
            //     }
            // });

            trapFocus(document.querySelector('#fake-modal'));

        }, 1000)        
    }
}

</script>

<style lang="scss" scoped>
#fake-modal {
    border: 1px solid black;
    background: white; 
    width: 400px;
    margin: auto;
    text-align:left;
    padding: 15px;

}

</style>