var TypingTime = (function (window, document) {
    'use strict';

    var currentLocation = 0,
        currentCharCode = -1,
        currentLine = 0,
        currentChar = '',
        codeContainer,
        outputContainer,
        colorOverlayContainer,
        codeLineList,
        codeLines,
        codeLine,
        rawLines = [],
        keyHintMap = {
            123: 'open curly bracket',
            125: 'closing curly bracket',
            91: 'open square bracket',
            93: 'closing square bracket',
            34: 'double quotes',
            39: 'single quotes',
            59: 'semicolon',
            58: 'colon'
        }


    function handleKeydown(e) {

        switch (e.keyCode) {
        case 8: // Prevent backspace key from going BACK in browser
            e.preventDefault();
            setPrevChar();
            break;
        case 13: // Handle ENTER key
        case 32: // Handle spacebar
            handleKeypress(e);
            e.preventDefault();
            break;
        }
    }

    function handleKeypress(e) {

        if (e.charCode == currentCharCode || e.keyCode == currentCharCode) {
            setNextChar();
        } else if (e.keyCode == 13) {
            if (codeLine.hasClass('enter')) {
                if ($(codeLineList[currentLine]).hasClass('milestone')) {
                    render();
                }
                currentLine++;
                setNextChar();
            }
        } else {
            setErrorChar();
        }
    }

    function init() {
        codeContainer = $('#code-container');
        outputContainer = $('#iframe-container iframe');
        colorOverlayContainer = $('#color-overlay');
        outputContainer = outputContainer[0];
        codeLineList = codeContainer.find('ol li.raw');

        $(document).on('keydown', handleKeydown);
        $(document).on('keypress', handleKeypress);

        for (var i = 0; i < codeLineList.length; i++) {
            var row = codeLineList[i];
            var text = row.innerText || row.textContent;
            
            text = text.replace('&gt;', '>');
            text = text.replace('&lt;', '<');
            rawLines.push(text);
            var newRow = $('<li>');
            for (var j = 0; j < text.length; j++) {
                var span = $('<span>')
                    .addClass('initial')
                    .html(text.charAt(j));

                span.appendTo(newRow);
            }

            var enter = $('<span>')
                .addClass('enter initial')
                .appendTo(newRow);
            codeLineList[i].innerHTML = newRow.html();
            
            if($(row).hasClass('milestone')) {
                var txt = $('<span>')
                            .addClass('milestone-text')
                            .html('milestone')
                
                $(row).append(txt);
            }
        }

        codeLines = codeContainer.find('span.initial');


        setCurrentChar();
    }

    function setCurrentChar() {
        $(codeLines[currentLocation]).addClass('char-active');
        
        if(codeLines[currentLocation].innerText) {
            currentCharCode = codeLines[currentLocation].innerText.charCodeAt(0);
            currentChar = codeLines[currentLocation].innerText.charAt(0);
        } else {
            currentCharCode = codeLines[currentLocation].textContent.charCodeAt(0);
            currentChar = codeLines[currentLocation].textContent.charAt(0);
        }
        
        codeLine = $(codeLines[currentLocation]);
    }

    function setPrevChar() {
        if (currentLocation === 0) {
            return; // Do nothing if at beginning already
        }

        codeLine
            .removeClass('char-error')
            .removeClass('char-active');

        codeLine.find('i.fa').remove();

        currentLocation--;
        setCurrentChar();
    }

    function setNextChar() {
        codeLine
            .removeClass('char-error')
            .removeClass('char-active');

        codeLine.find('i.fa').remove();

        if ((codeLines.length - 1) == currentLocation) {

            return;
        } else {
            currentLocation++;
        }

        setCurrentChar();
    }

    function setErrorChar() {
        codeLine
            .addClass('char-error');

        if (codeLine.find('i.fa').length === 0) {
            var hintText = getKeyHint(currentCharCode);
            var hint = $('<span>').addClass('error-hint').html(hintText);
            var key = $('<span>')
                .addClass('key')
                .html('<span>' + currentChar + '</span>');
            var arrow = $('<i>')
                .addClass('fa fa-arrow-circle-down')
                .append(hint);

            if (hintText !== '') {
                arrow.append(key);
            }
            codeLine.append(arrow);
        }
    }

    function getKeyHint(charCode) {
        if (keyHintMap[charCode] !== undefined) {
            return keyHintMap[charCode];
        } else {
            return '';
        }
    }

    function render() {
        var code = '';
        for (var i = 0; i <= currentLine; i++) {
            code += rawLines[i];
        }

        colorOverlayContainer.show();
        colorOverlayContainer.velocity({
            backgroundColorAlpha: 0
        }, 450, function () {
            colorOverlayContainer.attr('style', '');
            colorOverlayContainer.hide();
        });

        outputContainer.contentWindow.document.open('text/html', 'replace');
        outputContainer.contentWindow.document.write(code);
        outputContainer.contentWindow.document.close();


    }

    return {
        handleKeydown: handleKeydown,
        handleKeypress: handleKeypress,
        init: init,
        setCurrentChar: setCurrentChar,
        setPrevChar: setPrevChar,
        setNextChar: setNextChar,
        setErrorChar: setErrorChar,
        getKeyHint: getKeyHint
    }

}(window, document));